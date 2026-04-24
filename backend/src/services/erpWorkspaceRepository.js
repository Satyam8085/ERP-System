import mongoose from "mongoose";
import { AttendanceRecord } from "../models/AttendanceRecord.js";
import { Circular } from "../models/Circular.js";
import { FeeRecord } from "../models/FeeRecord.js";
import { GradeRecord } from "../models/GradeRecord.js";
import { SupportTicket } from "../models/SupportTicket.js";
import { TimetableEntry } from "../models/TimetableEntry.js";
import {
  seedAttendanceRecords,
  seedCirculars,
  seedFeeRecords,
  seedGradeRecords,
  seedSupportTickets,
  seedTimetables,
} from "../data/erpOperationalSeedData.js";
import { createUserRecord, getUserById, listUsersByRole } from "./erpRepository.js";

function buildSeedTimetableEntries() {
  const entries = [];

  Object.entries(seedTimetables.student).forEach(([studentId, studentEntries]) => {
    studentEntries.forEach((entry, index) => {
      entries.push({
        id: `tt-student-${studentId}-${index + 1}`,
        ownerRole: "student",
        ownerId: studentId,
        ...entry,
      });
    });
  });

  Object.entries(seedTimetables.staff).forEach(([employeeId, staffEntries]) => {
    staffEntries.forEach((entry, index) => {
      entries.push({
        id: `tt-staff-${employeeId}-${index + 1}`,
        ownerRole: "staff",
        ownerId: employeeId,
        ...entry,
      });
    });
  });

  return entries;
}

const seedTimetableEntries = buildSeedTimetableEntries();

const workspaceStore = {
  feeRecords: structuredClone(seedFeeRecords),
  attendanceRecords: structuredClone(seedAttendanceRecords),
  gradeRecords: structuredClone(seedGradeRecords),
  circulars: structuredClone(seedCirculars),
  supportTickets: structuredClone(seedSupportTickets),
  timetableEntries: structuredClone(seedTimetableEntries),
};

function useMongo() {
  return mongoose.connection.readyState === 1;
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function sortNewestFirst(left, right, key) {
  return String(right[key] || "").localeCompare(String(left[key] || ""));
}

function sortOldestFirst(left, right, key) {
  return String(left[key] || "").localeCompare(String(right[key] || ""));
}

function sanitizeDocument(record) {
  if (!record) {
    return null;
  }

  return record.toObject ? record.toObject() : record;
}

async function upsertSeedRecords(Model, records) {
  await Model.syncIndexes();

  await Model.bulkWrite(
    records.map((record) => ({
      updateOne: {
        filter: { id: record.id },
        update: { $setOnInsert: record },
        upsert: true,
      },
    }))
  );
}

export async function seedWorkspaceDataIfNeeded() {
  if (!useMongo()) {
    return;
  }

  await Promise.all([
    upsertSeedRecords(FeeRecord, seedFeeRecords),
    upsertSeedRecords(AttendanceRecord, seedAttendanceRecords),
    upsertSeedRecords(GradeRecord, seedGradeRecords),
    upsertSeedRecords(Circular, seedCirculars),
    upsertSeedRecords(SupportTicket, seedSupportTickets),
    upsertSeedRecords(TimetableEntry, seedTimetableEntries),
  ]);
}

export async function getWorkspaceSummary() {
  const [students, staff] = await Promise.all([
    listUsersByRole("student"),
    listUsersByRole("staff"),
  ]);

  const [fees, attendance, grades, circulars, tickets] = useMongo()
    ? await Promise.all([
        FeeRecord.find().lean(),
        AttendanceRecord.find().lean(),
        GradeRecord.find().lean(),
        Circular.find().lean(),
        SupportTicket.find().lean(),
      ])
    : [
        workspaceStore.feeRecords,
        workspaceStore.attendanceRecords,
        workspaceStore.gradeRecords,
        workspaceStore.circulars,
        workspaceStore.supportTickets,
      ];

  return {
    totalStudents: students.length,
    totalStaff: staff.length,
    pendingFees: fees.filter((record) => record.status !== "Paid").length,
    paidFees: fees.filter((record) => record.status === "Paid").length,
    attendanceEntries: attendance.length,
    gradeEntries: grades.length,
    circularsPublished: circulars.length,
    openSupportTickets: tickets.filter((ticket) => ticket.status !== "Closed").length,
  };
}

export async function getStudentsDirectory() {
  return listUsersByRole("student");
}

export async function createStudent(payload) {
  return createUserRecord({
    ...payload,
    role: "student",
  });
}

export async function getStaffDirectory() {
  return listUsersByRole("staff");
}

export async function createStaff(payload) {
  return createUserRecord({
    ...payload,
    role: "staff",
  });
}

export async function getFeeRecordsForUser(user) {
  if (useMongo()) {
    const filter = user.role === "student" ? { studentId: user.studentId } : {};
    const records = await FeeRecord.find(filter).lean();
    return records.sort((left, right) => sortNewestFirst(left, right, "generatedOn"));
  }

  if (user.role === "student") {
    return workspaceStore.feeRecords
      .filter((record) => record.studentId === user.studentId)
      .sort((left, right) => sortNewestFirst(left, right, "generatedOn"));
  }

  return [...workspaceStore.feeRecords].sort((left, right) =>
    sortNewestFirst(left, right, "generatedOn")
  );
}

export async function generateFeeRecord(payload) {
  if (!payload.studentId || !payload.term || !payload.amount || !payload.dueDate) {
    throw new Error("Student, term, amount, and due date are required.");
  }

  const record = {
    id: createId("fee"),
    studentId: payload.studentId,
    term: payload.term,
    amount: Number(payload.amount),
    status: "Pending",
    generatedOn: payload.generatedOn || new Date().toISOString().slice(0, 10),
    dueDate: payload.dueDate,
  };

  if (useMongo()) {
    const createdRecord = await FeeRecord.create(record);
    return sanitizeDocument(createdRecord);
  }

  workspaceStore.feeRecords.unshift(record);
  return record;
}

export async function payFeeRecord(feeId, user) {
  if (useMongo()) {
    const feeRecord = await FeeRecord.findOne({ id: feeId });

    if (!feeRecord) {
      throw new Error("Fee record not found.");
    }

    if (user.role === "student" && feeRecord.studentId !== user.studentId) {
      throw new Error("You can only pay your own fee record.");
    }

    feeRecord.status = "Paid";
    feeRecord.paidOn = new Date().toISOString().slice(0, 10);
    await feeRecord.save();

    return sanitizeDocument(feeRecord);
  }

  const feeRecord = workspaceStore.feeRecords.find((record) => record.id === feeId);

  if (!feeRecord) {
    throw new Error("Fee record not found.");
  }

  if (user.role === "student" && feeRecord.studentId !== user.studentId) {
    throw new Error("You can only pay your own fee record.");
  }

  feeRecord.status = "Paid";
  feeRecord.paidOn = new Date().toISOString().slice(0, 10);

  return feeRecord;
}

export async function getAttendanceRecordsForUser(user, studentId) {
  const targetStudentId = user.role === "student" ? user.studentId : studentId;

  if (useMongo()) {
    const filter = targetStudentId ? { studentId: targetStudentId } : {};
    const records = await AttendanceRecord.find(filter).lean();
    return records.sort((left, right) => sortNewestFirst(left, right, "date"));
  }

  if (!targetStudentId) {
    return [...workspaceStore.attendanceRecords].sort((left, right) =>
      sortNewestFirst(left, right, "date")
    );
  }

  return workspaceStore.attendanceRecords
    .filter((record) => record.studentId === targetStudentId)
    .sort((left, right) => sortNewestFirst(left, right, "date"));
}

export async function markAttendance(payload, user) {
  if (!payload.studentId || !payload.subject || !payload.date || !payload.status) {
    throw new Error("Student, subject, date, and attendance status are required.");
  }

  const record = {
    id: createId("att"),
    studentId: payload.studentId,
    subject: payload.subject,
    date: payload.date,
    status: payload.status,
    markedBy: user.employeeId || user.id,
  };

  if (useMongo()) {
    const createdRecord = await AttendanceRecord.create(record);
    return sanitizeDocument(createdRecord);
  }

  workspaceStore.attendanceRecords.unshift(record);
  return record;
}

export async function getGradeRecordsForUser(user, studentId) {
  const targetStudentId = user.role === "student" ? user.studentId : studentId;

  if (useMongo()) {
    const filter = targetStudentId ? { studentId: targetStudentId } : {};
    const records = await GradeRecord.find(filter).lean();
    return records.sort((left, right) => sortNewestFirst(left, right, "updatedOn"));
  }

  if (!targetStudentId) {
    return [...workspaceStore.gradeRecords].sort((left, right) =>
      sortNewestFirst(left, right, "updatedOn")
    );
  }

  return workspaceStore.gradeRecords
    .filter((record) => record.studentId === targetStudentId)
    .sort((left, right) => sortNewestFirst(left, right, "updatedOn"));
}

export async function saveGradeRecord(payload, user) {
  if (
    !payload.studentId ||
    !payload.subject ||
    !payload.assessment ||
    !payload.score ||
    !payload.maxScore ||
    !payload.grade
  ) {
    throw new Error("Student, subject, assessment, score, max score, and grade are required.");
  }

  const record = {
    id: createId("gr"),
    studentId: payload.studentId,
    subject: payload.subject,
    assessment: payload.assessment,
    score: Number(payload.score),
    maxScore: Number(payload.maxScore),
    grade: payload.grade,
    updatedBy: user.employeeId || user.id,
    updatedOn: new Date().toISOString().slice(0, 10),
  };

  if (useMongo()) {
    const createdRecord = await GradeRecord.create(record);
    return sanitizeDocument(createdRecord);
  }

  workspaceStore.gradeRecords.unshift(record);
  return record;
}

export async function getTimetableForUser(user) {
  const ownerRole = user.role === "student" ? "student" : user.role === "staff" ? "staff" : null;
  const ownerId = user.role === "student" ? user.studentId : user.employeeId;

  if (!ownerRole || !ownerId) {
    return [];
  }

  if (useMongo()) {
    const entries = await TimetableEntry.find({ ownerRole, ownerId }).lean();
    return entries.sort((left, right) => sortOldestFirst(left, right, "day"));
  }

  return workspaceStore.timetableEntries
    .filter((entry) => entry.ownerRole === ownerRole && entry.ownerId === ownerId)
    .sort((left, right) => sortOldestFirst(left, right, "day"));
}

export async function getCircularsForUser(user) {
  if (useMongo()) {
    const records = await Circular.find({
      $or: [{ audience: user.role }, { audience: "all" }],
    }).lean();

    return records.sort((left, right) => sortNewestFirst(left, right, "createdOn"));
  }

  return workspaceStore.circulars
    .filter(
      (circular) =>
        circular.audience.includes(user.role) || circular.audience.includes("all")
    )
    .sort((left, right) => sortNewestFirst(left, right, "createdOn"));
}

export async function createCircular(payload, user) {
  if (!payload.title || !payload.message) {
    throw new Error("Circular title and message are required.");
  }

  const record = {
    id: createId("cir"),
    title: payload.title,
    message: payload.message,
    audience: payload.audience?.length ? payload.audience : ["student", "staff", "admin"],
    createdBy: user.employeeId || user.id,
    createdOn: new Date().toISOString().slice(0, 10),
  };

  if (useMongo()) {
    const createdRecord = await Circular.create(record);
    return sanitizeDocument(createdRecord);
  }

  workspaceStore.circulars.unshift(record);
  return record;
}

export async function getSupportTicketsForUser(user) {
  if (useMongo()) {
    const filter = user.role === "student" ? { studentId: user.studentId } : {};
    const records = await SupportTicket.find(filter).lean();
    return records.sort((left, right) => sortNewestFirst(left, right, "updatedOn"));
  }

  if (user.role === "student") {
    return workspaceStore.supportTickets
      .filter((ticket) => ticket.studentId === user.studentId)
      .sort((left, right) => sortNewestFirst(left, right, "updatedOn"));
  }

  return [...workspaceStore.supportTickets].sort((left, right) =>
    sortNewestFirst(left, right, "updatedOn")
  );
}

export async function createSupportTicket(payload, user) {
  if (!payload.category || !payload.description) {
    throw new Error("Category and description are required for support tickets.");
  }

  const today = new Date().toISOString().slice(0, 10);
  const ticket = {
    id: createId("sup"),
    studentId: user.studentId,
    category: payload.category,
    description: payload.description,
    status: "Open",
    createdOn: today,
    updatedOn: today,
    assignedTo: "",
    resolutionNote: "",
    activity: [
      {
        actorRole: user.role,
        actorId: user.studentId || user.id,
        message: payload.description,
        date: today,
      },
    ],
  };

  if (useMongo()) {
    const createdRecord = await SupportTicket.create(ticket);
    return sanitizeDocument(createdRecord);
  }

  workspaceStore.supportTickets.unshift(ticket);
  return ticket;
}

export async function updateSupportTicket(ticketId, payload, user) {
  if (!payload.status && !payload.assignedTo && !payload.resolutionNote && !payload.message) {
    throw new Error("Please provide an update for the support ticket.");
  }

  if (useMongo()) {
    const ticket = await SupportTicket.findOne({ id: ticketId });

    if (!ticket) {
      throw new Error("Support ticket not found.");
    }

    if (payload.status) {
      ticket.status = payload.status;
    }

    if (payload.assignedTo !== undefined) {
      ticket.assignedTo = payload.assignedTo;
    }

    if (payload.resolutionNote !== undefined) {
      ticket.resolutionNote = payload.resolutionNote;
    }

    ticket.updatedOn = new Date().toISOString().slice(0, 10);
    ticket.lastUpdatedBy = user.employeeId || user.id;

    if (!Array.isArray(ticket.activity)) {
      ticket.activity = [];
    }

    const activityParts = [];

    if (payload.message) {
      activityParts.push(payload.message);
    }

    if (payload.status) {
      activityParts.push(`Status changed to ${payload.status}`);
    }

    if (payload.assignedTo) {
      activityParts.push(`Assigned to ${payload.assignedTo}`);
    }

    if (payload.resolutionNote) {
      activityParts.push(`Resolution: ${payload.resolutionNote}`);
    }

    if (activityParts.length) {
      ticket.activity.unshift({
        actorRole: user.role,
        actorId: user.employeeId || user.id,
        message: activityParts.join(". "),
        date: ticket.updatedOn,
      });
    }

    await ticket.save();
    return sanitizeDocument(ticket);
  }

  const ticket = workspaceStore.supportTickets.find((entry) => entry.id === ticketId);

  if (!ticket) {
    throw new Error("Support ticket not found.");
  }

  if (payload.status) {
    ticket.status = payload.status;
  }

  if (payload.assignedTo !== undefined) {
    ticket.assignedTo = payload.assignedTo;
  }

  if (payload.resolutionNote !== undefined) {
    ticket.resolutionNote = payload.resolutionNote;
  }

  ticket.updatedOn = new Date().toISOString().slice(0, 10);
  ticket.lastUpdatedBy = user.employeeId || user.id;

  if (!Array.isArray(ticket.activity)) {
    ticket.activity = [];
  }

  const activityParts = [];

  if (payload.message) {
    activityParts.push(payload.message);
  }

  if (payload.status) {
    activityParts.push(`Status changed to ${payload.status}`);
  }

  if (payload.assignedTo) {
    activityParts.push(`Assigned to ${payload.assignedTo}`);
  }

  if (payload.resolutionNote) {
    activityParts.push(`Resolution: ${payload.resolutionNote}`);
  }

  if (activityParts.length) {
    ticket.activity.unshift({
      actorRole: user.role,
      actorId: user.employeeId || user.id,
      message: activityParts.join(". "),
      date: ticket.updatedOn,
    });
  }

  return ticket;
}

export async function getStudentSnapshot(studentId) {
  const [student] = await Promise.all([getUserById(studentId)]);
  return student;
}
