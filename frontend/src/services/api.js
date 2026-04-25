import { getStoredUser } from "./authStorage";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://erp-system-miao.onrender.com/api";

async function request(path, options = {}) {
  const currentUser = getStoredUser();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(currentUser?.id ? { "x-erp-user-id": currentUser.id } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({
    success: false,
    message: "Invalid server response.",
  }));

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload.data;
}

export const authApi = {
  login(identifier, password, role) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password, role }),
    });
  },
  me(userId) {
    return request(`/auth/me/${userId}`);
  },
};

export const dashboardApi = {
  bootstrap(section) {
    const query = section ? `?section=${encodeURIComponent(section)}` : "";
    return request(`/dashboard/bootstrap${query}`);
  },
};

export const erpApi = {
  summary() {
    return request("/erp/summary");
  },
  students() {
    return request("/erp/students");
  },
  createStudent(payload) {
    return request("/erp/students", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  staff() {
    return request("/erp/staff");
  },
  createStaff(payload) {
    return request("/erp/staff", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  fees() {
    return request("/erp/fees");
  },
  generateFee(payload) {
    return request("/erp/fees", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  payFee(feeId) {
    return request(`/erp/fees/${feeId}/pay`, {
      method: "POST",
    });
  },
  attendance(studentId) {
    const query = studentId ? `?studentId=${encodeURIComponent(studentId)}` : "";
    return request(`/erp/attendance${query}`);
  },
  markAttendance(payload) {
    return request("/erp/attendance", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  grades(studentId) {
    const query = studentId ? `?studentId=${encodeURIComponent(studentId)}` : "";
    return request(`/erp/grades${query}`);
  },
  saveGrade(payload) {
    return request("/erp/grades", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  timetable() {
    return request("/erp/timetable");
  },
  circulars() {
    return request("/erp/circulars");
  },
  createCircular(payload) {
    return request("/erp/circulars", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  supportTickets() {
    return request("/erp/support-tickets");
  },
  createSupportTicket(payload) {
    return request("/erp/support-tickets", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  updateSupportTicket(ticketId, payload) {
    return request(`/erp/support-tickets/${ticketId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
