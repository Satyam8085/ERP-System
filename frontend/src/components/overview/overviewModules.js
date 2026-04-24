const moduleDetails = {
  "admit-card": {
    heading: "Download your latest exam admit card and hall details.",
    status: "Ready",
    primaryAction: "Download PDF",
    secondaryAction: "View Exam Schedule",
    metrics: [
      { label: "Term", value: "Semester VI" },
      { label: "Center", value: "Block B-204" },
      { label: "Slot", value: "09:30 AM" },
    ],
    tasks: [
      "Verify your course and enrollment number before download.",
      "Use the printed admit card during every examination.",
      "Contact the exam cell if any subject is missing.",
    ],
  },
  attendance: {
    heading: "Track present percentage, shortage alerts, and subject-wise records.",
    status: "Live",
    primaryAction: "View Daily Report",
    secondaryAction: "Check Subject Shortage",
    metrics: [
      { label: "Overall", value: "91%" },
      { label: "Classes", value: "148 / 162" },
      { label: "Alert", value: "Clear" },
    ],
    tasks: [
      "Review attendance by subject before internal exams.",
      "Resolve mismatch entries with faculty if needed.",
      "Maintain minimum attendance for all practical sessions.",
    ],
  },
  "alumni-portal": {
    heading: "Stay connected with alumni updates, mentoring, and events.",
    status: "Open",
    primaryAction: "Open Alumni Feed",
    secondaryAction: "Explore Mentors",
    metrics: [
      { label: "Events", value: "04 Live" },
      { label: "Mentors", value: "28 Active" },
      { label: "Network", value: "Growing" },
    ],
    tasks: [
      "Join alumni networking sessions.",
      "Browse available mentors by domain.",
      "Update your profile before placement season.",
    ],
  },
  "central-communication": {
    heading: "Monitor official circulars, notices, and announcements in one place.",
    status: "Updated",
    primaryAction: "Open Messages",
    secondaryAction: "Mark as Read",
    metrics: [
      { label: "Unread", value: "07" },
      { label: "Priority", value: "02 High" },
      { label: "Source", value: "Admin Desk" },
    ],
    tasks: [
      "Read all urgent notices from the institute.",
      "Track department-level communication updates.",
      "Stay aligned with academic and finance deadlines.",
    ],
  },
  circular: {
    heading: "Review institute circulars, policy changes, and administrative updates.",
    status: "Published",
    primaryAction: "Read Circulars",
    secondaryAction: "Download Archive",
    metrics: [
      { label: "Latest", value: "Today" },
      { label: "Archive", value: "18 Files" },
      { label: "Access", value: "Faculty + Student" },
    ],
    tasks: [
      "Read the latest policy changes.",
      "Keep a downloaded copy of important circulars.",
      "Share department circulars with classmates if needed.",
    ],
  },
  "college-info": {
    heading: "Explore institute departments, facilities, contacts, and academic offices.",
    status: "Available",
    primaryAction: "Open Directory",
    secondaryAction: "View Departments",
    metrics: [
      { label: "Blocks", value: "06" },
      { label: "Labs", value: "18" },
      { label: "Support", value: "Campus Helpdesk" },
    ],
    tasks: [
      "Use the directory to find office contacts.",
      "Check department and lab availability.",
      "Keep emergency campus numbers accessible.",
    ],
  },
  "convocation-form": {
    heading: "Complete your convocation registration and verification process.",
    status: "Form Window",
    primaryAction: "Open Form",
    secondaryAction: "Check Eligibility",
    metrics: [
      { label: "Fee", value: "Pending Check" },
      { label: "Documents", value: "03 Required" },
      { label: "Window", value: "This Month" },
    ],
    tasks: [
      "Complete all required student profile details.",
      "Upload final verification documents before deadline.",
      "Review payment and approval confirmation.",
    ],
  },
  courses: {
    heading: "Browse enrolled subjects, curriculum, and semester course structure.",
    status: "Active",
    primaryAction: "View Subjects",
    secondaryAction: "Download Syllabus",
    metrics: [
      { label: "Semester", value: "06 Subjects" },
      { label: "Labs", value: "02" },
      { label: "Credits", value: "24" },
    ],
    tasks: [
      "Check subject-wise syllabus coverage.",
      "Compare curriculum with class schedule.",
      "Track elective and lab components together.",
    ],
  },
  "fee-undertaking": {
    heading: "Manage fee undertaking requests and approval requirements.",
    status: "Pending Review",
    primaryAction: "Open Undertaking",
    secondaryAction: "View Conditions",
    metrics: [
      { label: "Deadline", value: "15 Apr" },
      { label: "Approval", value: "Accounts Office" },
      { label: "Mode", value: "Online" },
    ],
    tasks: [
      "Review institute undertaking policy carefully.",
      "Submit justification and payment commitment.",
      "Track approval status from accounts section.",
    ],
  },
  feedback: {
    heading: "Submit feedback for classes, facilities, and support services.",
    status: "Open",
    primaryAction: "Give Feedback",
    secondaryAction: "View Submitted",
    metrics: [
      { label: "Forms", value: "03 Active" },
      { label: "Scope", value: "Faculty + Campus" },
      { label: "Privacy", value: "Protected" },
    ],
    tasks: [
      "Share accurate feedback for better service quality.",
      "Complete all active surveys on time.",
      "Use support section for critical complaints.",
    ],
  },
  fees: {
    heading: "Review fee balance, receipts, and installment activity.",
    status: "Available",
    primaryAction: "View Ledger",
    secondaryAction: "Download Receipt",
    metrics: [
      { label: "Balance", value: "INR 0 / Clear" },
      { label: "Receipts", value: "05" },
      { label: "Method", value: "Online + NEFT" },
    ],
    tasks: [
      "Verify all paid installments in the ledger.",
      "Download receipts for personal records.",
      "Resolve fee mismatch before the due date.",
    ],
  },
  "grievance-complaint": {
    heading: "Raise complaints and follow grievance resolution updates.",
    status: "Support Open",
    primaryAction: "Raise Ticket",
    secondaryAction: "Track Complaint",
    metrics: [
      { label: "Channel", value: "Student Desk" },
      { label: "Priority", value: "Escalation Ready" },
      { label: "Response", value: "Monitored" },
    ],
    tasks: [
      "Use clear details while submitting complaints.",
      "Track status after escalation updates.",
      "Attach proof for faster resolution.",
    ],
  },
  lms: {
    heading: "Access learning materials, assignments, and class resources.",
    status: "Connected",
    primaryAction: "Open LMS",
    secondaryAction: "View Assignments",
    metrics: [
      { label: "Courses", value: "06 Joined" },
      { label: "Pending", value: "02 Tasks" },
      { label: "Access", value: "Single Sign-On" },
    ],
    tasks: [
      "Review all pending assignments weekly.",
      "Download lecture notes and class resources.",
      "Stay synced with faculty announcements.",
    ],
  },
  "my-report-card": {
    heading: "Check grades, SGPA details, and performance summaries.",
    status: "Published",
    primaryAction: "Open Report Card",
    secondaryAction: "Compare Results",
    metrics: [
      { label: "SGPA", value: "8.62" },
      { label: "Backlogs", value: "0" },
      { label: "Trend", value: "Improving" },
    ],
    tasks: [
      "Review grade breakdown carefully.",
      "Compare results with previous semester.",
      "Connect with faculty if marks need clarification.",
    ],
  },
  "neft-form": {
    heading: "Manage NEFT form details for fee and bank verification.",
    status: "Ready",
    primaryAction: "Open NEFT Form",
    secondaryAction: "Check Bank Info",
    metrics: [
      { label: "Verification", value: "Required" },
      { label: "Format", value: "PDF" },
      { label: "Bank Desk", value: "Accounts" },
    ],
    tasks: [
      "Verify account and transaction details carefully.",
      "Attach the required proof for submission.",
      "Confirm approval with the accounts desk.",
    ],
  },
  performances: {
    heading: "Track semester performance, outcomes, and academic trends.",
    status: "Live",
    primaryAction: "View Analytics",
    secondaryAction: "See Semester Trend",
    metrics: [
      { label: "Performance", value: "Above Avg" },
      { label: "Trend", value: "Positive" },
      { label: "Review", value: "Updated Weekly" },
    ],
    tasks: [
      "Compare practical and theory performance.",
      "Watch improvement trends across semesters.",
      "Use report insights before exam planning.",
    ],
  },
  "placement-management": {
    heading: "Stay updated with drives, training, and placement activity.",
    status: "Drive Season",
    primaryAction: "Open Placement Desk",
    secondaryAction: "View Applied Jobs",
    metrics: [
      { label: "Drives", value: "05 Open" },
      { label: "Training", value: "02 Scheduled" },
      { label: "Profile", value: "Needs Review" },
    ],
    tasks: [
      "Keep your placement profile updated.",
      "Track drive eligibility before applying.",
      "Attend mock and training sessions regularly.",
    ],
  },
  "student-request-service": {
    heading: "Submit service requests for documents and student support needs.",
    status: "Open",
    primaryAction: "Create Request",
    secondaryAction: "Track Service Status",
    metrics: [
      { label: "Requests", value: "04 Types" },
      { label: "Turnaround", value: "2-3 Days" },
      { label: "Desk", value: "Student Support" },
    ],
    tasks: [
      "Select the right service category before submission.",
      "Attach supporting documents where necessary.",
      "Track request completion from the portal.",
    ],
  },
  survey: {
    heading: "Participate in surveys and submit institute improvement inputs.",
    status: "Open",
    primaryAction: "Open Survey",
    secondaryAction: "View Responses",
    metrics: [
      { label: "Active", value: "02 Surveys" },
      { label: "Topic", value: "Academic + Support" },
      { label: "Window", value: "This Week" },
    ],
    tasks: [
      "Complete current student surveys before closing date.",
      "Use honest responses for better institute planning.",
      "Track upcoming survey windows in updates section.",
    ],
  },
  "time-table": {
    heading: "View weekly classes, lab sessions, and timetable changes.",
    status: "Scheduled",
    primaryAction: "Open Time Table",
    secondaryAction: "Check Lab Slots",
    metrics: [
      { label: "Week", value: "Mon-Sat" },
      { label: "Labs", value: "02 Sessions" },
      { label: "Updates", value: "Realtime" },
    ],
    tasks: [
      "Review timetable every day for slot updates.",
      "Track lab and tutorial periods separately.",
      "Use the schedule before planning attendance.",
    ],
  },
};

export function getOverviewModule(item) {
  if (!item) {
    return null;
  }

  const details = moduleDetails[item.id];

  return {
    ...item,
    heading: details?.heading || "Open this workspace to manage the selected service.",
    status: details?.status || "Available",
    primaryAction: details?.primaryAction || "Open Module",
    secondaryAction: details?.secondaryAction || "View Details",
    metrics: details?.metrics || [],
    tasks: details?.tasks || [],
    updates: [
      `${item.label} workspace synced successfully.`,
      `${details?.status || "Current"} status is visible in the student portal.`,
      `Use "${details?.primaryAction || "Open Module"}" to continue with this module.`,
    ],
    resources: [
      `${item.label} guidelines`,
      `${item.label} support desk`,
      `${item.label} recent activity`,
    ],
  };
}
