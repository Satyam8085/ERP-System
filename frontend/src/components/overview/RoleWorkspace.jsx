import { useEffect, useState } from "react";
import { erpApi } from "../../services/api";

const ui = {
  stack: { display: "grid", gap: 20 },
  banner: {
    borderRadius: 16,
    padding: "12px 14px",
    background: "#eef6ff",
    color: "#1d4f7a",
    fontSize: 13,
    border: "1px solid #c9def4",
  },
  error: {
    borderRadius: 16,
    padding: "12px 14px",
    background: "#fff1f2",
    color: "#b42318",
    fontSize: 13,
    border: "1px solid #fecdd3",
  },
  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 14,
  },
  metric: {
    borderRadius: 18,
    padding: 16,
    background: "#f8fbff",
    border: "1px solid #d6e5f5",
    display: "grid",
    gap: 6,
  },
  metricLabel: { fontSize: 12, color: "#60758d", fontWeight: 700 },
  metricValue: { fontSize: 24, color: "#17304f", fontWeight: 800 },
  card: {
    borderRadius: 22,
    padding: 20,
    background: "#ffffff",
    border: "1px solid #d8e3f0",
    display: "grid",
    gap: 16,
  },
  cardTitle: { margin: 0, fontSize: 20, color: "#17304f" },
  cardText: { margin: 0, color: "#5f7289", fontSize: 14, lineHeight: 1.6 },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  fieldWrap: { display: "grid", gap: 6 },
  label: { fontSize: 12, fontWeight: 700, color: "#47617d" },
  input: {
    borderRadius: 12,
    border: "1px solid #c7d7ea",
    padding: "11px 12px",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    background: "#fff",
  },
  textarea: {
    borderRadius: 12,
    border: "1px solid #c7d7ea",
    padding: "11px 12px",
    fontSize: 14,
    outline: "none",
    minHeight: 92,
    resize: "vertical",
    fontFamily: "inherit",
    background: "#fff",
  },
  row: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  primaryButton: {
    border: "none",
    borderRadius: 14,
    padding: "12px 16px",
    background: "linear-gradient(135deg, #0b57a3 0%, #0f6cbd 100%)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid #c7d7ea",
    borderRadius: 14,
    padding: "11px 15px",
    background: "#fff",
    color: "#234160",
    fontWeight: 700,
    cursor: "pointer",
  },
  chipRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  chip: {
    borderRadius: 999,
    padding: "7px 12px",
    background: "#eef6ff",
    color: "#18527d",
    fontSize: 12,
    fontWeight: 700,
  },
  tableWrap: {
    overflowX: "auto",
    border: "1px solid #d8e3f0",
    borderRadius: 18,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 640,
  },
  th: {
    textAlign: "left",
    padding: "12px 14px",
    background: "#f5f9ff",
    color: "#49627d",
    fontSize: 12,
    fontWeight: 800,
    borderBottom: "1px solid #d8e3f0",
  },
  td: {
    padding: "12px 14px",
    color: "#234160",
    fontSize: 13,
    borderBottom: "1px solid #eef2f7",
    verticalAlign: "top",
  },
  list: { display: "grid", gap: 12 },
  listItem: {
    borderRadius: 16,
    border: "1px solid #d8e3f0",
    padding: 16,
    background: "#fbfdff",
    display: "grid",
    gap: 8,
  },
  itemTitle: { margin: 0, fontSize: 16, color: "#17304f" },
  itemMeta: { color: "#5f7289", fontSize: 13, lineHeight: 1.5 },
  statusPending: { color: "#9a6700", fontWeight: 700 },
  statusPaid: { color: "#067647", fontWeight: 700 },
  statusOpen: { color: "#b54708", fontWeight: 700 },
  statusInProgress: { color: "#175cd3", fontWeight: 700 },
  statusResolved: { color: "#067647", fontWeight: 700 },
  statusClosed: { color: "#344054", fontWeight: 700 },
  empty: {
    borderRadius: 16,
    padding: "18px 16px",
    background: "#f8fbff",
    border: "1px dashed #c7d7ea",
    color: "#5f7289",
    fontSize: 14,
  },
  divider: {
    height: 1,
    background: "#e5edf6",
    margin: "4px 0",
  },
  activityWrap: {
    display: "grid",
    gap: 10,
    marginTop: 8,
  },
  activityItem: {
    borderRadius: 14,
    padding: "12px 14px",
    background: "#f6faff",
    border: "1px solid #dbe7f3",
    display: "grid",
    gap: 4,
  },
  activityMeta: {
    color: "#49627d",
    fontSize: 12,
    fontWeight: 700,
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function getTicketStatusStyle(status) {
  switch (status) {
    case "Resolved":
      return ui.statusResolved;
    case "Closed":
      return ui.statusClosed;
    case "In Progress":
      return ui.statusInProgress;
    default:
      return ui.statusOpen;
  }
}

function MetricGrid({ items }) {
  return (
    <div style={ui.metrics}>
      {items.map((item) => (
        <div key={item.label} style={ui.metric}>
          <span style={ui.metricLabel}>{item.label}</span>
          <span style={ui.metricValue}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function DataTable({ columns, rows, emptyMessage }) {
  if (!rows.length) {
    return <div style={ui.empty}>{emptyMessage}</div>;
  }

  return (
    <div style={ui.tableWrap}>
      <table style={ui.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={ui.th}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key} style={ui.td}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListCards({ items, renderItem, emptyMessage }) {
  if (!items.length) {
    return <div style={ui.empty}>{emptyMessage}</div>;
  }

  return <div style={ui.list}>{items.map(renderItem)}</div>;
}

function SupportActivity({ activity = [] }) {
  if (!activity.length) {
    return <div style={ui.empty}>No activity has been recorded yet.</div>;
  }

  return (
    <div style={ui.activityWrap}>
      {activity.map((entry, index) => (
        <div key={`${entry.date}-${entry.actorId}-${index}`} style={ui.activityItem}>
          <span style={ui.activityMeta}>
            {entry.actorRole} • {entry.actorId} • {entry.date}
          </span>
          <span style={ui.itemMeta}>{entry.message}</span>
        </div>
      ))}
    </div>
  );
}

function AdminStudentManagement({ students, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    course: "",
    semester: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdStudent = await erpApi.createStudent(form);
    setForm({
      fullName: "",
      studentId: "",
      email: "",
      course: "",
      semester: "",
      password: "",
    });
    onMessage(`Student profile created for ${createdStudent.fullName}.`);
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Total Students", value: students.length },
          {
            label: "Courses Covered",
            value: new Set(students.map((student) => student.course)).size,
          },
        ]}
      />

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Add Student</h3>
        <p style={ui.cardText}>
          Create a new student login and academic profile. Username is generated
          automatically from the email if you leave it blank.
        </p>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <div style={ui.formGrid}>
            {[
              ["fullName", "Full Name"],
              ["studentId", "Student ID"],
              ["email", "Email"],
              ["course", "Course"],
              ["semester", "Semester"],
              ["password", "Password (optional)"],
            ].map(([key, label]) => (
              <label key={key} style={ui.fieldWrap}>
                <span style={ui.label}>{label}</span>
                <input
                  style={ui.input}
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                />
              </label>
            ))}
          </div>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Create Student
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Student Directory</h3>
        <DataTable
          columns={[
            { key: "fullName", label: "Student" },
            { key: "studentId", label: "ID" },
            { key: "course", label: "Course" },
            { key: "semester", label: "Semester" },
            { key: "email", label: "Email" },
          ]}
          rows={students}
          emptyMessage="No students are available yet."
        />
      </section>
    </div>
  );
}

function AdminStaffManagement({ staff, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    department: "",
    designation: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdStaff = await erpApi.createStaff(form);
    setForm({
      fullName: "",
      employeeId: "",
      email: "",
      department: "",
      designation: "",
      password: "",
    });
    onMessage(`Staff profile created for ${createdStaff.fullName}.`);
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Total Staff", value: staff.length },
          {
            label: "Departments",
            value: new Set(staff.map((member) => member.department)).size,
          },
        ]}
      />

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Add Staff Member</h3>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <div style={ui.formGrid}>
            {[
              ["fullName", "Full Name"],
              ["employeeId", "Employee ID"],
              ["email", "Email"],
              ["department", "Department"],
              ["designation", "Designation"],
              ["password", "Password (optional)"],
            ].map(([key, label]) => (
              <label key={key} style={ui.fieldWrap}>
                <span style={ui.label}>{label}</span>
                <input
                  style={ui.input}
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                />
              </label>
            ))}
          </div>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Create Staff Profile
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Staff Directory</h3>
        <DataTable
          columns={[
            { key: "fullName", label: "Staff" },
            { key: "employeeId", label: "Employee ID" },
            { key: "department", label: "Department" },
            { key: "designation", label: "Designation" },
            { key: "email", label: "Email" },
          ]}
          rows={staff}
          emptyMessage="No staff members are available yet."
        />
      </section>
    </div>
  );
}

function AdminFeeManagement({ students, fees, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    studentId: students[0]?.studentId || "",
    term: "",
    amount: "",
    dueDate: "",
  });

  useEffect(() => {
    if (students[0]?.studentId && !form.studentId) {
      setForm((current) => ({ ...current, studentId: students[0].studentId }));
    }
  }, [students, form.studentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const feeRecord = await erpApi.generateFee(form);
    setForm({
      studentId: students[0]?.studentId || "",
      term: "",
      amount: "",
      dueDate: "",
    });
    onMessage(`Fee generated for ${feeRecord.studentId}.`);
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Pending Fees", value: fees.filter((fee) => fee.status === "Pending").length },
          { label: "Paid Fees", value: fees.filter((fee) => fee.status === "Paid").length },
          {
            label: "Amount Raised",
            value: formatCurrency(
              fees.reduce((total, fee) => total + Number(fee.amount || 0), 0)
            ),
          },
        ]}
      />

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Generate Fee</h3>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <div style={ui.formGrid}>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Student</span>
              <select
                style={ui.input}
                value={form.studentId}
                onChange={(event) =>
                  setForm((current) => ({ ...current, studentId: event.target.value }))
                }
              >
                {students.map((student) => (
                  <option key={student.id} value={student.studentId}>
                    {student.fullName} ({student.studentId})
                  </option>
                ))}
              </select>
            </label>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Term</span>
              <input
                style={ui.input}
                value={form.term}
                onChange={(event) =>
                  setForm((current) => ({ ...current, term: event.target.value }))
                }
              />
            </label>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Amount</span>
              <input
                style={ui.input}
                type="number"
                value={form.amount}
                onChange={(event) =>
                  setForm((current) => ({ ...current, amount: event.target.value }))
                }
              />
            </label>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Due Date</span>
              <input
                style={ui.input}
                type="date"
                value={form.dueDate}
                onChange={(event) =>
                  setForm((current) => ({ ...current, dueDate: event.target.value }))
                }
              />
            </label>
          </div>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Generate Fee Record
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Recent Fee Records</h3>
        <DataTable
          columns={[
            { key: "studentId", label: "Student ID" },
            { key: "term", label: "Term" },
            { key: "amount", label: "Amount", render: (row) => formatCurrency(row.amount) },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span style={row.status === "Paid" ? ui.statusPaid : ui.statusPending}>
                  {row.status}
                </span>
              ),
            },
            { key: "dueDate", label: "Due Date" },
          ]}
          rows={fees}
          emptyMessage="No fee records are available yet."
        />
      </section>
    </div>
  );
}

function AdminCirculars({ circulars, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    audienceStudent: true,
    audienceStaff: true,
    audienceAdmin: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const audience = ["student", "staff", "admin"].filter((role) =>
      form[`audience${role[0].toUpperCase()}${role.slice(1)}`]
    );
    const circular = await erpApi.createCircular({
      title: form.title,
      message: form.message,
      audience,
    });
    setForm({
      title: "",
      message: "",
      audienceStudent: true,
      audienceStaff: true,
      audienceAdmin: true,
    });
    onMessage(`Circular published: ${circular.title}`);
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Publish Circular</h3>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <label style={ui.fieldWrap}>
            <span style={ui.label}>Title</span>
            <input
              style={ui.input}
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
            />
          </label>
          <label style={ui.fieldWrap}>
            <span style={ui.label}>Message</span>
            <textarea
              style={ui.textarea}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
            />
          </label>
          <div style={ui.row}>
            {[
              ["audienceStudent", "Students"],
              ["audienceStaff", "Staff"],
              ["audienceAdmin", "Admins"],
            ].map(([key, label]) => (
              <label key={key} style={{ ...ui.label, display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.checked }))
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Publish Circular
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Circulars</h3>
        <ListCards
          items={circulars}
          emptyMessage="No circulars are available yet."
          renderItem={(circular) => (
            <div key={circular.id} style={ui.listItem}>
              <h4 style={ui.itemTitle}>{circular.title}</h4>
              <div style={ui.itemMeta}>{circular.message}</div>
              <div style={ui.chipRow}>
                {circular.audience.map((role) => (
                  <span key={role} style={ui.chip}>
                    {role}
                  </span>
                ))}
                <span style={ui.chip}>{circular.createdOn}</span>
              </div>
            </div>
          )}
        />
      </section>
    </div>
  );
}

function AdminReports({ summary }) {
  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Students", value: summary.totalStudents || 0 },
          { label: "Staff", value: summary.totalStaff || 0 },
          { label: "Pending Fees", value: summary.pendingFees || 0 },
          { label: "Paid Fees", value: summary.paidFees || 0 },
          { label: "Attendance Entries", value: summary.attendanceEntries || 0 },
          { label: "Grade Entries", value: summary.gradeEntries || 0 },
          { label: "Circulars", value: summary.circularsPublished || 0 },
          { label: "Open Tickets", value: summary.openSupportTickets || 0 },
        ]}
      />
    </div>
  );
}

function StaffAttendance({ students, attendance, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    studentId: students[0]?.studentId || "",
    subject: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    if (students[0]?.studentId && !form.studentId) {
      setForm((current) => ({ ...current, studentId: students[0].studentId }));
    }
  }, [students, form.studentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await erpApi.markAttendance(form);
    setForm({
      studentId: students[0]?.studentId || "",
      subject: "",
      date: "",
      status: "Present",
    });
    onMessage("Attendance entry saved.");
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Mark Attendance</h3>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <div style={ui.formGrid}>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Student</span>
              <select
                style={ui.input}
                value={form.studentId}
                onChange={(event) =>
                  setForm((current) => ({ ...current, studentId: event.target.value }))
                }
              >
                {students.map((student) => (
                  <option key={student.id} value={student.studentId}>
                    {student.fullName} ({student.studentId})
                  </option>
                ))}
              </select>
            </label>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Subject</span>
              <input
                style={ui.input}
                value={form.subject}
                onChange={(event) =>
                  setForm((current) => ({ ...current, subject: event.target.value }))
                }
              />
            </label>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Date</span>
              <input
                style={ui.input}
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((current) => ({ ...current, date: event.target.value }))
                }
              />
            </label>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Status</span>
              <select
                style={ui.input}
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({ ...current, status: event.target.value }))
                }
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
              </select>
            </label>
          </div>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Save Attendance
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Recent Attendance</h3>
        <DataTable
          columns={[
            { key: "studentId", label: "Student ID" },
            { key: "subject", label: "Subject" },
            { key: "date", label: "Date" },
            { key: "status", label: "Status" },
          ]}
          rows={attendance}
          emptyMessage="No attendance records are available yet."
        />
      </section>
    </div>
  );
}

function StaffGradebook({ students, grades, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    studentId: students[0]?.studentId || "",
    subject: "",
    assessment: "",
    score: "",
    maxScore: "",
    grade: "",
  });

  useEffect(() => {
    if (students[0]?.studentId && !form.studentId) {
      setForm((current) => ({ ...current, studentId: students[0].studentId }));
    }
  }, [students, form.studentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await erpApi.saveGrade(form);
    setForm({
      studentId: students[0]?.studentId || "",
      subject: "",
      assessment: "",
      score: "",
      maxScore: "",
      grade: "",
    });
    onMessage("Grade entry saved.");
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Publish Grade</h3>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <div style={ui.formGrid}>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Student</span>
              <select
                style={ui.input}
                value={form.studentId}
                onChange={(event) =>
                  setForm((current) => ({ ...current, studentId: event.target.value }))
                }
              >
                {students.map((student) => (
                  <option key={student.id} value={student.studentId}>
                    {student.fullName} ({student.studentId})
                  </option>
                ))}
              </select>
            </label>
            {[
              ["subject", "Subject"],
              ["assessment", "Assessment"],
              ["score", "Score"],
              ["maxScore", "Max Score"],
              ["grade", "Grade"],
            ].map(([key, label]) => (
              <label key={key} style={ui.fieldWrap}>
                <span style={ui.label}>{label}</span>
                <input
                  style={ui.input}
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                />
              </label>
            ))}
          </div>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Save Grade
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Recent Gradebook Entries</h3>
        <DataTable
          columns={[
            { key: "studentId", label: "Student ID" },
            { key: "subject", label: "Subject" },
            { key: "assessment", label: "Assessment" },
            {
              key: "score",
              label: "Score",
              render: (row) => `${row.score} / ${row.maxScore}`,
            },
            { key: "grade", label: "Grade" },
          ]}
          rows={grades}
          emptyMessage="No grade records are available yet."
        />
      </section>
    </div>
  );
}

function StaffStudentDirectory({ students }) {
  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Students", value: students.length },
          {
            label: "Semesters",
            value: new Set(students.map((student) => student.semester)).size,
          },
        ]}
      />
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Student Directory</h3>
        <DataTable
          columns={[
            { key: "fullName", label: "Student" },
            { key: "studentId", label: "Student ID" },
            { key: "course", label: "Course" },
            { key: "semester", label: "Semester" },
            { key: "email", label: "Email" },
          ]}
          rows={students}
          emptyMessage="No students are available."
        />
      </section>
    </div>
  );
}

function TimetablePanel({ timetable, heading }) {
  return (
    <section style={ui.card}>
      <h3 style={ui.cardTitle}>{heading}</h3>
      <ListCards
        items={timetable}
        emptyMessage="No timetable entries are available."
        renderItem={(entry, index) => (
          <div key={`${entry.day}-${entry.slot}-${index}`} style={ui.listItem}>
            <h4 style={ui.itemTitle}>
              {entry.day} - {entry.subject}
            </h4>
            <div style={ui.itemMeta}>
              {entry.slot} | {entry.room}
            </div>
          </div>
        )}
      />
    </section>
  );
}

function CircularsPanel({ circulars }) {
  return (
    <section style={ui.card}>
      <h3 style={ui.cardTitle}>Circular Feed</h3>
      <ListCards
        items={circulars}
        emptyMessage="No circulars are available right now."
        renderItem={(circular) => (
          <div key={circular.id} style={ui.listItem}>
            <h4 style={ui.itemTitle}>{circular.title}</h4>
            <div style={ui.itemMeta}>{circular.message}</div>
            <div style={ui.chipRow}>
              {circular.audience.map((role) => (
                <span key={role} style={ui.chip}>
                  {role}
                </span>
              ))}
              <span style={ui.chip}>{circular.createdOn}</span>
            </div>
          </div>
        )}
      />
    </section>
  );
}

function SupportDesk({ tickets, currentUser, onRefresh, onMessage }) {
  const [drafts, setDrafts] = useState({});

  const getDraft = (ticket) =>
    drafts[ticket.id] || {
      status: ticket.status || "Open",
      assignedTo: ticket.assignedTo || "",
      resolutionNote: ticket.resolutionNote || "",
      message: "",
    };

  const updateDraft = (ticketId, key, value) => {
    setDrafts((current) => ({
      ...current,
      [ticketId]: {
        ...(current[ticketId] || {}),
        [key]: value,
      },
    }));
  };

  const handleSave = async (ticket) => {
    const draft = getDraft(ticket);
    await erpApi.updateSupportTicket(ticket.id, draft);
    setDrafts((current) => ({
      ...current,
      [ticket.id]: {
        ...draft,
        message: "",
      },
    }));
    onMessage(`Support ticket ${ticket.id} updated by ${currentUser.role}.`);
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Open", value: tickets.filter((ticket) => ticket.status === "Open").length },
          {
            label: "In Progress",
            value: tickets.filter((ticket) => ticket.status === "In Progress").length,
          },
          {
            label: "Resolved",
            value: tickets.filter((ticket) => ticket.status === "Resolved").length,
          },
          { label: "Closed", value: tickets.filter((ticket) => ticket.status === "Closed").length },
        ]}
      />

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Support Queue</h3>
        <p style={ui.cardText}>
          Student tickets show up here for admin and staff. You can update the
          status, assign the ticket, and add notes.
        </p>
        <ListCards
          items={tickets}
          emptyMessage="No support tickets are in the queue."
          renderItem={(ticket) => {
            const draft = getDraft(ticket);

            return (
              <div key={ticket.id} style={ui.listItem}>
                <div style={ui.row}>
                  <h4 style={ui.itemTitle}>
                    {ticket.category} • {ticket.id}
                  </h4>
                  <span style={getTicketStatusStyle(ticket.status)}>{ticket.status}</span>
                </div>
                <div style={ui.itemMeta}>
                  Student ID: {ticket.studentId}
                  <br />
                  Raised On: {ticket.createdOn}
                  <br />
                  Description: {ticket.description}
                  {ticket.assignedTo ? (
                    <>
                      <br />
                      Assigned To: {ticket.assignedTo}
                    </>
                  ) : null}
                  {ticket.resolutionNote ? (
                    <>
                      <br />
                      Resolution Note: {ticket.resolutionNote}
                    </>
                  ) : null}
                </div>

                <div style={ui.formGrid}>
                  <label style={ui.fieldWrap}>
                    <span style={ui.label}>Status</span>
                    <select
                      style={ui.input}
                      value={draft.status}
                      onChange={(event) =>
                        updateDraft(ticket.id, "status", event.target.value)
                      }
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </label>
                  <label style={ui.fieldWrap}>
                    <span style={ui.label}>Assigned To</span>
                    <input
                      style={ui.input}
                      value={draft.assignedTo}
                      onChange={(event) =>
                        updateDraft(ticket.id, "assignedTo", event.target.value)
                      }
                      placeholder="Staff/Admin name or employee ID"
                    />
                  </label>
                </div>

                <label style={ui.fieldWrap}>
                  <span style={ui.label}>Resolution Note</span>
                  <textarea
                    style={ui.textarea}
                    value={draft.resolutionNote}
                    onChange={(event) =>
                      updateDraft(ticket.id, "resolutionNote", event.target.value)
                    }
                    placeholder="Add final resolution or working notes"
                  />
                </label>

                <label style={ui.fieldWrap}>
                  <span style={ui.label}>Activity Message</span>
                  <textarea
                    style={ui.textarea}
                    value={draft.message}
                    onChange={(event) =>
                      updateDraft(ticket.id, "message", event.target.value)
                    }
                    placeholder="Add an update that will appear in ticket activity"
                  />
                </label>

                <div style={ui.row}>
                  <button
                    type="button"
                    style={ui.primaryButton}
                    onClick={() => handleSave(ticket)}
                  >
                    Save Ticket Update
                  </button>
                  <button
                    type="button"
                    style={ui.secondaryButton}
                    onClick={() =>
                      updateDraft(ticket.id, "assignedTo", currentUser.employeeId || currentUser.id)
                    }
                  >
                    Assign To Me
                  </button>
                </div>

                <div style={ui.divider} />
                <SupportActivity activity={ticket.activity || []} />
              </div>
            );
          }}
        />
      </section>
    </div>
  );
}

function StudentAttendance({ attendance }) {
  const presentCount = attendance.filter((record) => record.status === "Present").length;
  const totalCount = attendance.length;

  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Entries", value: totalCount },
          {
            label: "Present %",
            value: totalCount ? `${Math.round((presentCount / totalCount) * 100)}%` : "0%",
          },
        ]}
      />
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Attendance Log</h3>
        <DataTable
          columns={[
            { key: "subject", label: "Subject" },
            { key: "date", label: "Date" },
            { key: "status", label: "Status" },
          ]}
          rows={attendance}
          emptyMessage="No attendance data is available yet."
        />
      </section>
    </div>
  );
}

function StudentGrades({ grades }) {
  return (
    <section style={ui.card}>
      <h3 style={ui.cardTitle}>Published Grades</h3>
      <DataTable
        columns={[
          { key: "subject", label: "Subject" },
          { key: "assessment", label: "Assessment" },
          {
            key: "score",
            label: "Score",
            render: (row) => `${row.score} / ${row.maxScore}`,
          },
          { key: "grade", label: "Grade" },
          { key: "updatedOn", label: "Updated On" },
        ]}
        rows={grades}
        emptyMessage="No grades have been published yet."
      />
    </section>
  );
}

function StudentFees({ fees, onRefresh, onMessage }) {
  const handlePay = async (feeId) => {
    await erpApi.payFee(feeId);
    onMessage("Fee payment status updated to paid.");
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <MetricGrid
        items={[
          { label: "Outstanding", value: fees.filter((fee) => fee.status !== "Paid").length },
          {
            label: "Due Amount",
            value: formatCurrency(
              fees
                .filter((fee) => fee.status !== "Paid")
                .reduce((total, fee) => total + Number(fee.amount || 0), 0)
            ),
          },
        ]}
      />
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>My Fee Records</h3>
        <DataTable
          columns={[
            { key: "term", label: "Term" },
            { key: "amount", label: "Amount", render: (row) => formatCurrency(row.amount) },
            { key: "generatedOn", label: "Generated On" },
            { key: "dueDate", label: "Due Date" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <div style={ui.row}>
                  <span style={row.status === "Paid" ? ui.statusPaid : ui.statusPending}>
                    {row.status}
                  </span>
                  {row.status !== "Paid" ? (
                    <button
                      type="button"
                      style={ui.secondaryButton}
                      onClick={() => handlePay(row.id)}
                    >
                      Pay Now
                    </button>
                  ) : null}
                </div>
              ),
            },
          ]}
          rows={fees}
          emptyMessage="No fee records are available."
        />
      </section>
    </div>
  );
}

function StudentSupport({ tickets, onRefresh, onMessage }) {
  const [form, setForm] = useState({
    category: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ticket = await erpApi.createSupportTicket(form);
    setForm({ category: "", description: "" });
    onMessage(`Support ticket created: ${ticket.id}`);
    onRefresh();
  };

  return (
    <div style={ui.stack}>
      <section style={ui.card}>
        <h3 style={ui.cardTitle}>Raise Support Ticket</h3>
        <form style={ui.stack} onSubmit={handleSubmit}>
          <div style={ui.formGrid}>
            <label style={ui.fieldWrap}>
              <span style={ui.label}>Category</span>
              <input
                style={ui.input}
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({ ...current, category: event.target.value }))
                }
              />
            </label>
          </div>
          <label style={ui.fieldWrap}>
            <span style={ui.label}>Description</span>
            <textarea
              style={ui.textarea}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </label>
          <div style={ui.row}>
            <button type="submit" style={ui.primaryButton}>
              Submit Ticket
            </button>
          </div>
        </form>
      </section>

      <section style={ui.card}>
        <h3 style={ui.cardTitle}>My Ticket History</h3>
        <ListCards
          items={tickets}
          emptyMessage="No support tickets have been raised yet."
          renderItem={(ticket) => (
            <div key={ticket.id} style={ui.listItem}>
              <div style={ui.row}>
                <h4 style={ui.itemTitle}>{ticket.category}</h4>
                <span style={getTicketStatusStyle(ticket.status)}>{ticket.status}</span>
              </div>
              <div style={ui.itemMeta}>
                {ticket.description}
                <br />
                Raised On: {ticket.createdOn}
                {ticket.assignedTo ? (
                  <>
                    <br />
                    Assigned To: {ticket.assignedTo}
                  </>
                ) : null}
                {ticket.resolutionNote ? (
                  <>
                    <br />
                    Resolution Note: {ticket.resolutionNote}
                  </>
                ) : null}
              </div>
              <SupportActivity activity={ticket.activity || []} />
            </div>
          )}
        />
      </section>
    </div>
  );
}

function moduleDescription(item, currentUser) {
  return `${item.label} module for ${currentUser.role}.`;
}

async function fetchWorkspaceData(moduleId) {
  switch (moduleId) {
    case "admin-student-management":
      return { students: await erpApi.students() };
    case "admin-staff-management":
      return { staff: await erpApi.staff() };
    case "admin-fee-management":
      return {
        students: await erpApi.students(),
        fees: await erpApi.fees(),
      };
    case "admin-circulars":
      return { circulars: await erpApi.circulars() };
    case "admin-erp-reports":
      return { summary: await erpApi.summary() };
    case "admin-support-desk":
      return { tickets: await erpApi.supportTickets() };
    case "staff-attendance":
      return {
        students: await erpApi.students(),
        attendance: await erpApi.attendance(),
      };
    case "staff-gradebook":
      return {
        students: await erpApi.students(),
        grades: await erpApi.grades(),
      };
    case "staff-student-directory":
      return { students: await erpApi.students() };
    case "staff-timetable":
      return { timetable: await erpApi.timetable() };
    case "staff-communication":
      return { circulars: await erpApi.circulars() };
    case "staff-support-desk":
      return { tickets: await erpApi.supportTickets() };
    case "student-attendance":
      return { attendance: await erpApi.attendance() };
    case "student-grades":
      return { grades: await erpApi.grades() };
    case "student-timetable":
      return { timetable: await erpApi.timetable() };
    case "student-fees":
      return { fees: await erpApi.fees() };
    case "student-support":
      return { tickets: await erpApi.supportTickets() };
    case "student-circulars":
      return { circulars: await erpApi.circulars() };
    default:
      return {};
  }
}

export default function RoleWorkspace({ item, currentUser }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});

  const loadModuleData = async () => {
    setLoading(true);
    setError("");

    try {
      const nextData = await fetchWorkspaceData(item.id);
      setData(nextData);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMessage("");
    loadModuleData();
  }, [item.id]);

  const renderContent = () => {
    switch (item.id) {
      case "admin-student-management":
        return (
          <AdminStudentManagement
            students={data.students || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "admin-staff-management":
        return (
          <AdminStaffManagement
            staff={data.staff || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "admin-fee-management":
        return (
          <AdminFeeManagement
            students={data.students || []}
            fees={data.fees || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "admin-circulars":
        return (
          <AdminCirculars
            circulars={data.circulars || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "admin-erp-reports":
        return <AdminReports summary={data.summary || {}} />;
      case "admin-support-desk":
      case "staff-support-desk":
        return (
          <SupportDesk
            tickets={data.tickets || []}
            currentUser={currentUser}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "staff-attendance":
        return (
          <StaffAttendance
            students={data.students || []}
            attendance={data.attendance || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "staff-gradebook":
        return (
          <StaffGradebook
            students={data.students || []}
            grades={data.grades || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "staff-student-directory":
        return <StaffStudentDirectory students={data.students || []} />;
      case "staff-timetable":
        return <TimetablePanel timetable={data.timetable || []} heading="Teaching Timetable" />;
      case "staff-communication":
        return <CircularsPanel circulars={data.circulars || []} />;
      case "student-attendance":
        return <StudentAttendance attendance={data.attendance || []} />;
      case "student-grades":
        return <StudentGrades grades={data.grades || []} />;
      case "student-timetable":
        return <TimetablePanel timetable={data.timetable || []} heading="My Timetable" />;
      case "student-fees":
        return (
          <StudentFees
            fees={data.fees || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "student-support":
        return (
          <StudentSupport
            tickets={data.tickets || []}
            onRefresh={loadModuleData}
            onMessage={setMessage}
          />
        );
      case "student-circulars":
        return <CircularsPanel circulars={data.circulars || []} />;
      default:
        return <div style={ui.empty}>This ERP workspace is not available yet.</div>;
    }
  };

  return (
    <section style={ui.stack}>
      <section style={ui.card}>
        <h2 style={ui.cardTitle}>{item.label}</h2>
        <p style={ui.cardText}>{moduleDescription(item, currentUser)}</p>
        <div style={ui.chipRow}>
          <span style={ui.chip}>Role: {currentUser.role}</span>
          <span style={ui.chip}>User: {currentUser.fullName}</span>
        </div>
      </section>

      {message ? <div style={ui.banner}>{message}</div> : null}
      {error ? <div style={ui.error}>{error}</div> : null}
      {loading ? <div style={ui.banner}>Loading...</div> : renderContent()}
    </section>
  );
}
