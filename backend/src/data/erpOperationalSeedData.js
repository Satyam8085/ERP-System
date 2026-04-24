export const seedFeeRecords = [
  {
    id: "fee-1001",
    studentId: "AIT2026001",
    term: "Semester VI",
    amount: 48500,
    status: "Pending",
    generatedOn: "2026-04-10",
    dueDate: "2026-05-10",
  },
  {
    id: "fee-1002",
    studentId: "AIT2026002",
    term: "Semester IV",
    amount: 47250,
    status: "Paid",
    generatedOn: "2026-04-05",
    dueDate: "2026-05-05",
  },
];

export const seedAttendanceRecords = [
  {
    id: "att-1001",
    studentId: "AIT2026001",
    subject: "DBMS",
    date: "2026-04-20",
    status: "Present",
    markedBy: "STF2026001",
  },
  {
    id: "att-1002",
    studentId: "AIT2026001",
    subject: "Operating Systems",
    date: "2026-04-21",
    status: "Present",
    markedBy: "STF2026001",
  },
  {
    id: "att-1003",
    studentId: "AIT2026002",
    subject: "Computer Networks",
    date: "2026-04-22",
    status: "Absent",
    markedBy: "STF2026001",
  },
];

export const seedGradeRecords = [
  {
    id: "gr-1001",
    studentId: "AIT2026001",
    subject: "DBMS",
    assessment: "Internal Assessment 2",
    score: 42,
    maxScore: 50,
    grade: "A",
    updatedBy: "STF2026001",
    updatedOn: "2026-04-23",
  },
  {
    id: "gr-1002",
    studentId: "AIT2026001",
    subject: "Operating Systems",
    assessment: "Lab Work",
    score: 18,
    maxScore: 20,
    grade: "A+",
    updatedBy: "STF2026001",
    updatedOn: "2026-04-23",
  },
  {
    id: "gr-1003",
    studentId: "AIT2026002",
    subject: "Computer Networks",
    assessment: "Mid Term",
    score: 31,
    maxScore: 40,
    grade: "B+",
    updatedBy: "STF2026001",
    updatedOn: "2026-04-22",
  },
];

export const seedCirculars = [
  {
    id: "cir-1001",
    title: "Semester Fee Reminder",
    message: "All pending semester fee dues should be cleared before the due date.",
    audience: ["student", "admin"],
    createdBy: "ADM2026001",
    createdOn: "2026-04-24",
  },
  {
    id: "cir-1002",
    title: "Faculty Meeting Schedule",
    message: "All faculty members are requested to join the monthly review meeting on Monday.",
    audience: ["staff", "admin"],
    createdBy: "ADM2026001",
    createdOn: "2026-04-24",
  },
  {
    id: "cir-1003",
    title: "ERP Maintenance Window",
    message: "The ERP will undergo a short maintenance window this Sunday from 6 PM to 7 PM.",
    audience: ["student", "staff", "admin"],
    createdBy: "ADM2026001",
    createdOn: "2026-04-25",
  },
];

export const seedSupportTickets = [
  {
    id: "sup-1001",
    studentId: "AIT2026001",
    category: "Document Request",
    description: "Need bonafide certificate for internship verification.",
    status: "Open",
    createdOn: "2026-04-24",
    assignedTo: "",
    resolutionNote: "",
    updatedOn: "2026-04-24",
    activity: [
      {
        actorRole: "student",
        actorId: "AIT2026001",
        message: "Ticket raised for bonafide certificate support.",
        date: "2026-04-24",
      },
    ],
  },
];

export const seedTimetables = {
  student: {
    "AIT2026001": [
      { day: "Monday", slot: "09:00 - 10:00", subject: "DBMS", room: "B-204" },
      { day: "Monday", slot: "10:15 - 11:15", subject: "Operating Systems", room: "B-204" },
      { day: "Tuesday", slot: "11:30 - 01:30", subject: "DBMS Lab", room: "Lab-3" },
    ],
    "AIT2026002": [
      { day: "Monday", slot: "09:00 - 10:00", subject: "Computer Networks", room: "C-106" },
      { day: "Wednesday", slot: "01:30 - 03:30", subject: "Network Lab", room: "Lab-5" },
    ],
  },
  staff: {
    STF2026001: [
      { day: "Monday", slot: "09:00 - 10:00", subject: "DBMS", room: "B-204" },
      { day: "Monday", slot: "10:15 - 11:15", subject: "Operating Systems", room: "B-204" },
      { day: "Tuesday", slot: "11:30 - 01:30", subject: "DBMS Lab", room: "Lab-3" },
      { day: "Friday", slot: "02:00 - 03:00", subject: "Mentoring Hour", room: "Faculty Room" },
    ],
  },
};
