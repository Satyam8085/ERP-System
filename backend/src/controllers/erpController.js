import { getUserById } from "../services/erpRepository.js";
import {
  createCircular,
  createStaff,
  createStudent,
  createSupportTicket,
  generateFeeRecord,
  getAttendanceRecordsForUser,
  getCircularsForUser,
  getFeeRecordsForUser,
  getGradeRecordsForUser,
  getStaffDirectory,
  getStudentsDirectory,
  getSupportTicketsForUser,
  getTimetableForUser,
  getWorkspaceSummary,
  markAttendance,
  payFeeRecord,
  saveGradeRecord,
  updateSupportTicket,
} from "../services/erpWorkspaceRepository.js";

async function requireRequestUser(request, response, allowedRoles = []) {
  const userId = request.header("x-erp-user-id");

  if (!userId) {
    response.status(401).json({
      success: false,
      message: "Login required.",
    });
    return null;
  }

  const user = await getUserById(userId);

  if (!user) {
    response.status(401).json({
      success: false,
      message: "User session is invalid.",
    });
    return null;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    response.status(403).json({
      success: false,
      message: "You do not have access to this ERP action.",
    });
    return null;
  }

  return user;
}

function respondSuccess(response, data) {
  return response.json({
    success: true,
    data,
  });
}

function handleControllerError(response, error) {
  return response.status(400).json({
    success: false,
    message: error.message || "Request failed.",
  });
}

export async function summaryController(request, response) {
  const user = await requireRequestUser(request, response, ["admin"]);

  if (!user) {
    return null;
  }

  const summary = await getWorkspaceSummary();
  return respondSuccess(response, summary);
}

export async function listStudentsController(request, response) {
  const user = await requireRequestUser(request, response, ["admin", "staff"]);

  if (!user) {
    return null;
  }

  return respondSuccess(response, await getStudentsDirectory());
}

export async function createStudentController(request, response) {
  const user = await requireRequestUser(request, response, ["admin"]);

  if (!user) {
    return null;
  }

  try {
    const createdStudent = await createStudent(request.body);
    return respondSuccess(response, createdStudent);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function listStaffController(request, response) {
  const user = await requireRequestUser(request, response, ["admin"]);

  if (!user) {
    return null;
  }

  return respondSuccess(response, await getStaffDirectory());
}

export async function createStaffController(request, response) {
  const user = await requireRequestUser(request, response, ["admin"]);

  if (!user) {
    return null;
  }

  try {
    const createdStaff = await createStaff(request.body);
    return respondSuccess(response, createdStaff);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function listFeesController(request, response) {
  const user = await requireRequestUser(request, response, ["admin", "student"]);

  if (!user) {
    return null;
  }

  return respondSuccess(response, await getFeeRecordsForUser(user));
}

export async function generateFeeController(request, response) {
  const user = await requireRequestUser(request, response, ["admin"]);

  if (!user) {
    return null;
  }

  try {
    const feeRecord = await generateFeeRecord(request.body);
    return respondSuccess(response, feeRecord);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function payFeeController(request, response) {
  const user = await requireRequestUser(request, response, ["student"]);

  if (!user) {
    return null;
  }

  try {
    const feeRecord = await payFeeRecord(request.params.feeId, user);
    return respondSuccess(response, feeRecord);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function listAttendanceController(request, response) {
  const user = await requireRequestUser(request, response, ["staff", "student"]);

  if (!user) {
    return null;
  }

  return respondSuccess(
    response,
    await getAttendanceRecordsForUser(user, request.query.studentId)
  );
}

export async function markAttendanceController(request, response) {
  const user = await requireRequestUser(request, response, ["staff"]);

  if (!user) {
    return null;
  }

  try {
    const record = await markAttendance(request.body, user);
    return respondSuccess(response, record);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function listGradesController(request, response) {
  const user = await requireRequestUser(request, response, ["staff", "student"]);

  if (!user) {
    return null;
  }

  return respondSuccess(
    response,
    await getGradeRecordsForUser(user, request.query.studentId)
  );
}

export async function saveGradeController(request, response) {
  const user = await requireRequestUser(request, response, ["staff"]);

  if (!user) {
    return null;
  }

  try {
    const record = await saveGradeRecord(request.body, user);
    return respondSuccess(response, record);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function timetableController(request, response) {
  const user = await requireRequestUser(request, response, ["staff", "student"]);

  if (!user) {
    return null;
  }

  return respondSuccess(response, await getTimetableForUser(user));
}

export async function listCircularsController(request, response) {
  const user = await requireRequestUser(request, response, ["admin", "staff", "student"]);

  if (!user) {
    return null;
  }

  return respondSuccess(response, await getCircularsForUser(user));
}

export async function createCircularController(request, response) {
  const user = await requireRequestUser(request, response, ["admin"]);

  if (!user) {
    return null;
  }

  try {
    const record = await createCircular(request.body, user);
    return respondSuccess(response, record);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function listSupportTicketsController(request, response) {
  const user = await requireRequestUser(request, response, ["student", "staff", "admin"]);

  if (!user) {
    return null;
  }

  return respondSuccess(response, await getSupportTicketsForUser(user));
}

export async function createSupportTicketController(request, response) {
  const user = await requireRequestUser(request, response, ["student"]);

  if (!user) {
    return null;
  }

  try {
    const ticket = await createSupportTicket(request.body, user);
    return respondSuccess(response, ticket);
  } catch (error) {
    return handleControllerError(response, error);
  }
}

export async function updateSupportTicketController(request, response) {
  const user = await requireRequestUser(request, response, ["staff", "admin"]);

  if (!user) {
    return null;
  }

  try {
    const ticket = await updateSupportTicket(request.params.ticketId, request.body, user);
    return respondSuccess(response, ticket);
  } catch (error) {
    return handleControllerError(response, error);
  }
}
