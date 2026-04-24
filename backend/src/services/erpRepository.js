import mongoose from "mongoose";
import { dashboardModules, dashboardSections } from "../data/dashboardSeedData.js";
import { seedUsers } from "../data/seedData.js";
import { User } from "../models/User.js";

const memoryStore = {
  users: structuredClone(seedUsers),
};

function useMongo() {
  return mongoose.connection.readyState === 1;
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const source = user.toObject ? user.toObject() : user;

  return {
    id:
      source._id?.toString?.() ||
      source.id ||
      source.studentId ||
      source.employeeId,
    role: source.role,
    fullName: source.fullName,
    initials: source.initials,
    studentId: source.studentId,
    employeeId: source.employeeId,
    username: source.username,
    email: source.email,
    course: source.course,
    semester: source.semester,
    department: source.department,
    designation: source.designation,
    collegeName: source.collegeName,
  };
}

function normalizeIdentifier(identifier) {
  return String(identifier || "").trim();
}

function normalizeRole(role) {
  return String(role || "").trim().toLowerCase();
}

function buildInitials(fullName) {
  return String(fullName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase?.() || "")
    .join("");
}

function slugifyName(fullName) {
  return String(fullName || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

function matchesIdentifier(entry, identifier) {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const normalizedLowerIdentifier = normalizedIdentifier.toLowerCase();

  return [
    entry.studentId,
    entry.employeeId,
    entry.username?.toLowerCase?.(),
    entry.email?.toLowerCase?.(),
  ].some((value) => value === normalizedIdentifier || value === normalizedLowerIdentifier);
}

export async function seedDatabaseIfNeeded() {
  if (!useMongo()) {
    return;
  }

  await User.syncIndexes();

  await User.bulkWrite(
    seedUsers.map((user) => {
      const setFields = {
        role: user.role,
        collegeName: user.collegeName,
      };
      const unsetFields = {};

      [
        "studentId",
        "employeeId",
        "course",
        "semester",
        "department",
        "designation",
      ].forEach((field) => {
        if (user[field]) {
          setFields[field] = user[field];
        } else {
          unsetFields[field] = 1;
        }
      });

      const update = {
        $setOnInsert: {
          fullName: user.fullName,
          initials: user.initials,
          username: user.username,
          email: user.email,
          password: user.password,
        },
        $set: setFields,
      };

      if (Object.keys(unsetFields).length) {
        update.$unset = unsetFields;
      }

      return {
        updateOne: {
          filter: { username: user.username },
          update,
          upsert: true,
        },
      };
    })
  );
}

export async function listSections(role) {
  const normalizedRole = normalizeRole(role);

  return dashboardSections
    .filter((section) => !normalizedRole || section.roles.includes(normalizedRole))
    .sort((left, right) => left.order - right.order);
}

export async function listModules(sectionId, role) {
  const normalizedRole = normalizeRole(role);

  return dashboardModules.filter(
    (module) =>
      (!normalizedRole || module.roles.includes(normalizedRole)) &&
      (!sectionId || sectionId === "overview" || module.section === sectionId)
  );
}

export async function getModuleById(moduleId, role) {
  const normalizedRole = normalizeRole(role);
  const module =
    dashboardModules.find(
      (entry) =>
        entry.id === moduleId &&
        (!normalizedRole || entry.roles.includes(normalizedRole))
    ) || null;

  return module;
}

export async function authenticateUser(identifier, password, role) {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const normalizedRole = normalizeRole(role);

  if (useMongo()) {
    const query = {
      $or: [
        { studentId: normalizedIdentifier },
        { employeeId: normalizedIdentifier },
        { email: normalizedIdentifier.toLowerCase() },
        { username: normalizedIdentifier.toLowerCase() },
      ],
    };

    if (normalizedRole) {
      query.role = normalizedRole;
    }

    const user = await User.findOne(query);

    if (!user || user.password !== password) {
      return null;
    }

    return sanitizeUser(user);
  }

  const user = memoryStore.users.find(
    (entry) =>
      (!normalizedRole || entry.role === normalizedRole) &&
      matchesIdentifier(entry, normalizedIdentifier) &&
      entry.password === password
  );

  return sanitizeUser(user);
}

export async function getUserById(userId) {
  if (useMongo()) {
    const lookupConditions = [{ studentId: userId }, { employeeId: userId }];

    if (mongoose.Types.ObjectId.isValid(userId)) {
      lookupConditions.unshift({ _id: userId });
    }

    const user = await User.findOne({
      $or: lookupConditions,
    });
    return sanitizeUser(user);
  }

  const user = memoryStore.users.find(
    (entry) =>
      entry.studentId === userId ||
      entry.employeeId === userId ||
      entry.id === userId
  );

  return sanitizeUser(user);
}

export async function listUsersByRole(role) {
  const normalizedRole = normalizeRole(role);

  if (useMongo()) {
    const users = normalizedRole
      ? await User.find({ role: normalizedRole }).sort({ fullName: 1 })
      : await User.find().sort({ fullName: 1 });

    return users.map((user) => sanitizeUser(user));
  }

  return memoryStore.users
    .filter((entry) => !normalizedRole || entry.role === normalizedRole)
    .sort((left, right) => left.fullName.localeCompare(right.fullName))
    .map((entry) => sanitizeUser(entry));
}

export async function createUserRecord(userData) {
  const normalizedRole = normalizeRole(userData.role);
  const fullName = String(userData.fullName || "").trim();
  const email = String(userData.email || "").trim().toLowerCase();
  const username =
    String(userData.username || "").trim().toLowerCase() ||
    email.split("@")[0] ||
    slugifyName(fullName);
  const payload = {
    fullName,
    initials: buildInitials(fullName),
    role: normalizedRole,
    studentId: userData.studentId ? String(userData.studentId).trim() : undefined,
    employeeId: userData.employeeId ? String(userData.employeeId).trim() : undefined,
    username,
    email,
    password: String(userData.password || "").trim() || "welcome123",
    course: userData.course ? String(userData.course).trim() : undefined,
    semester: userData.semester ? String(userData.semester).trim() : undefined,
    department: userData.department ? String(userData.department).trim() : undefined,
    designation: userData.designation ? String(userData.designation).trim() : undefined,
    collegeName:
      String(userData.collegeName || "").trim() || "Apex Institute of Technology",
  };

  if (!payload.fullName || !payload.email || !payload.username || !payload.role) {
    throw new Error("Full name, email, username, and role are required.");
  }

  if (payload.role === "student" && (!payload.studentId || !payload.course || !payload.semester)) {
    throw new Error("Student ID, course, and semester are required for students.");
  }

  if (
    ["staff", "admin"].includes(payload.role) &&
    (!payload.employeeId || !payload.department || !payload.designation)
  ) {
    throw new Error("Employee ID, department, and designation are required.");
  }

  if (useMongo()) {
    const user = await User.create(payload);
    return sanitizeUser(user);
  }

  const duplicateUser = memoryStore.users.find(
    (entry) =>
      entry.username === payload.username ||
      entry.email === payload.email ||
      (payload.studentId && entry.studentId === payload.studentId) ||
      (payload.employeeId && entry.employeeId === payload.employeeId)
  );

  if (duplicateUser) {
    throw new Error("A user with the same identifier already exists.");
  }

  const storedUser = {
    ...payload,
    id: payload.studentId || payload.employeeId || payload.username,
  };

  memoryStore.users.push(storedUser);

  return sanitizeUser(storedUser);
}
