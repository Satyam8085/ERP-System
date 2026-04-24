import { useState } from "react";
import { authApi } from "../services/api";

const demoAccounts = {
  student: {
    title: "Student ERP Login",
    subtitle:
      "Sign in to access academic services, finance, communication, and your personalized dashboard.",
    identifierLabel: "Student ID / Email / Username",
    identifier: "AIT2026001",
    password: "student123",
  },
  staff: {
    title: "Staff ERP Login",
    subtitle:
      "Sign in to manage academic workflows, student support tasks, and institute updates.",
    identifierLabel: "Employee ID / Email / Username",
    identifier: "STF2026001",
    password: "staff123",
  },
  admin: {
    title: "Admin ERP Login",
    subtitle:
      "Sign in to oversee ERP operations, communication channels, and institutional administration.",
    identifierLabel: "Admin ID / Email / Username",
    identifier: "ADM2026001",
    password: "admin123",
  },
};

const loginStyles = {
  shell: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at top right, rgba(15,108,189,0.18), transparent 24%), linear-gradient(180deg, #f5faff 0%, #e8f1fb 100%)",
    padding: "24px",
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 460,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(199, 216, 236, 0.95)",
    borderRadius: 28,
    boxShadow: "0 24px 48px rgba(30, 82, 135, 0.14)",
    padding: "30px",
    backdropFilter: "blur(14px)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(15,108,189,0.1)",
    color: "#0f6cbd",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 14,
  },
  title: {
    margin: 0,
    fontSize: 32,
    color: "#17304f",
  },
  subtitle: {
    margin: "10px 0 24px",
    color: "#526d8e",
    lineHeight: 1.6,
    fontSize: 14,
  },
  demoBox: {
    background: "#eff6ff",
    borderRadius: 18,
    padding: "14px 16px",
    color: "#325273",
    fontSize: 13,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  roleTabs: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
    marginBottom: 20,
  },
  roleTab: {
    border: "1px solid #c7d7ea",
    background: "#f7fbff",
    borderRadius: 14,
    padding: "12px 10px",
    fontSize: 13,
    fontWeight: 700,
    color: "#35506f",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  roleTabActive: {
    background: "linear-gradient(135deg, #0b57a3 0%, #0f6cbd 100%)",
    color: "#ffffff",
    border: "1px solid transparent",
    boxShadow: "0 12px 24px rgba(15,108,189,0.18)",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: 700,
    color: "#35506f",
  },
  input: {
    border: "1px solid #c7d7ea",
    borderRadius: 14,
    padding: "13px 14px",
    fontSize: 14,
    outline: "none",
  },
  error: {
    borderRadius: 14,
    background: "#fff1f2",
    color: "#b42318",
    padding: "12px 14px",
    fontSize: 13,
    marginBottom: 16,
  },
  submit: {
    width: "100%",
    border: "none",
    borderRadius: 16,
    padding: "14px 18px",
    background: "linear-gradient(135deg, #0b57a3 0%, #0f6cbd 100%)",
    color: "#ffffff",
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
};

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState(demoAccounts.student.identifier);
  const [password, setPassword] = useState(demoAccounts.student.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedDemo = demoAccounts[role];

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setIdentifier(demoAccounts[nextRole].identifier);
    setPassword(demoAccounts[nextRole].password);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await authApi.login(identifier, password, role);
      onLogin(user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.shell}>
      <form style={loginStyles.card} onSubmit={handleSubmit}>
        <span style={loginStyles.badge}>Apex Institute of Technology</span>
        <h1 style={loginStyles.title}>{selectedDemo.title}</h1>
        <p style={loginStyles.subtitle}>{selectedDemo.subtitle}</p>

        <div style={loginStyles.roleTabs}>
          {Object.keys(demoAccounts).map((accountRole) => (
            <button
              key={accountRole}
              type="button"
              style={{
                ...loginStyles.roleTab,
                ...(accountRole === role ? loginStyles.roleTabActive : {}),
              }}
              onClick={() => handleRoleChange(accountRole)}
            >
              {accountRole[0].toUpperCase() + accountRole.slice(1)}
            </button>
          ))}
        </div>

        <div style={loginStyles.demoBox}>
          Demo account:
          <br />
          Role: {role}
          <br />
          ID: {selectedDemo.identifier}
          <br />
          Password: {selectedDemo.password}
        </div>

        {error ? <div style={loginStyles.error}>{error}</div> : null}

        <div style={loginStyles.fieldWrap}>
          <label htmlFor="identifier" style={loginStyles.label}>
            {selectedDemo.identifierLabel}
          </label>
          <input
            id="identifier"
            style={loginStyles.input}
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder={`Enter your ${role} login identifier`}
          />
        </div>

        <div style={loginStyles.fieldWrap}>
          <label htmlFor="password" style={loginStyles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            style={loginStyles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" style={loginStyles.submit} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
