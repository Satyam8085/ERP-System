const dashboardConfigs = {
  admin: {
    sections: [
      {
        id: "overview",
        icon: "🏠",
        label: "Overview",
        title: "Admin ERP Dashboard",
        description: "Manage institute-wide ERP operations, records, and controls.",
      },
      {
        id: "administration",
        icon: "🗂️",
        label: "Administration",
        title: "Administration Control",
        description: "Manage students, staff, and institutional operations.",
      },
      {
        id: "finance",
        icon: "💳",
        label: "Finance",
        title: "Finance Desk",
        description: "Generate and monitor student fee activity.",
      },
      {
        id: "communication",
        icon: "📢",
        label: "Communication",
        title: "Communication Hub",
        description: "Publish circulars and administrative notices.",
      },
      {
        id: "reports",
        icon: "📊",
        label: "Reports",
        title: "ERP Reports",
        description: "Review ERP health, usage, and academic summaries.",
      },
      {
        id: "support",
        icon: "🛟",
        label: "Support",
        title: "Support Desk",
        description: "Track and resolve ERP support tickets raised by students.",
      },
    ],
    modules: [
      { id: "admin-student-management", icon: "🧑‍🎓", label: "Student Management", section: "administration" },
      { id: "admin-staff-management", icon: "🧑‍🏫", label: "Staff Management", section: "administration" },
      { id: "admin-fee-management", icon: "💰", label: "Fee Generation", section: "finance" },
      { id: "admin-circulars", icon: "📣", label: "Circular Desk", section: "communication" },
      { id: "admin-erp-reports", icon: "📈", label: "ERP Reports", section: "reports" },
      { id: "admin-support-desk", icon: "🎫", label: "Support Desk", section: "support" },
    ],
  },
  staff: {
    sections: [
      {
        id: "overview",
        icon: "🏠",
        label: "Overview",
        title: "Staff ERP Dashboard",
        description: "Manage class activity, students, and staff-facing work.",
      },
      {
        id: "teaching",
        icon: "🎓",
        label: "Teaching",
        title: "Teaching Workspace",
        description: "Handle attendance, grades, and teaching schedules.",
      },
      {
        id: "students",
        icon: "👥",
        label: "Students",
        title: "Student Success",
        description: "Review student directories and academic support data.",
      },
      {
        id: "communication",
        icon: "📢",
        label: "Communication",
        title: "Notice Board",
        description: "Review institute and department notices.",
      },
      {
        id: "support",
        icon: "🛟",
        label: "Support",
        title: "Support Queue",
        description: "Review student tickets and update support status.",
      },
    ],
    modules: [
      { id: "staff-attendance", icon: "📝", label: "Attendance Desk", section: "teaching" },
      { id: "staff-gradebook", icon: "📒", label: "Gradebook", section: "teaching" },
      { id: "staff-student-directory", icon: "🗃️", label: "Student Directory", section: "students" },
      { id: "staff-timetable", icon: "🗓️", label: "Teaching Timetable", section: "teaching" },
      { id: "staff-communication", icon: "📨", label: "Notice Board", section: "communication" },
      { id: "staff-support-desk", icon: "🛠️", label: "Support Queue", section: "support" },
    ],
  },
  student: {
    sections: [
      {
        id: "overview",
        icon: "🏠",
        label: "Overview",
        title: "Student ERP Dashboard",
        description: "Track your academics, fees, support, and campus updates.",
      },
      {
        id: "academics",
        icon: "📚",
        label: "Academics",
        title: "Academic Services",
        description: "Check attendance, grades, and class schedule.",
      },
      {
        id: "finance",
        icon: "💳",
        label: "Finance",
        title: "Finance Desk",
        description: "Review and pay fee records issued in the ERP.",
      },
      {
        id: "communication",
        icon: "📢",
        label: "Communication",
        title: "Campus Circulars",
        description: "Read official ERP notices and campus circulars.",
      },
      {
        id: "support",
        icon: "🛟",
        label: "Support",
        title: "Student Support",
        description: "Raise ERP-related requests and track their status.",
      },
    ],
    modules: [
      { id: "student-attendance", icon: "✅", label: "My Attendance", section: "academics" },
      { id: "student-grades", icon: "🏅", label: "My Grades", section: "academics" },
      { id: "student-timetable", icon: "🕒", label: "My Timetable", section: "academics" },
      { id: "student-fees", icon: "🏦", label: "My Fees", section: "finance" },
      { id: "student-support", icon: "🎫", label: "Support Tickets", section: "support" },
      { id: "student-circulars", icon: "🔔", label: "Campus Circulars", section: "communication" },
    ],
  },
};

export function getDashboardConfig(role) {
  return dashboardConfigs[role] || dashboardConfigs.student;
}

export function getDefaultSection(role) {
  return getDashboardConfig(role).sections[0];
}
