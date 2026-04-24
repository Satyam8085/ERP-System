import { Router } from "express";
import {
  createCircularController,
  createStaffController,
  createStudentController,
  createSupportTicketController,
  generateFeeController,
  listAttendanceController,
  listCircularsController,
  listFeesController,
  listGradesController,
  listStaffController,
  listStudentsController,
  listSupportTicketsController,
  markAttendanceController,
  payFeeController,
  saveGradeController,
  summaryController,
  timetableController,
  updateSupportTicketController,
} from "../controllers/erpController.js";

const erpRoutes = Router();

erpRoutes.get("/summary", summaryController);
erpRoutes.get("/students", listStudentsController);
erpRoutes.post("/students", createStudentController);
erpRoutes.get("/staff", listStaffController);
erpRoutes.post("/staff", createStaffController);
erpRoutes.get("/fees", listFeesController);
erpRoutes.post("/fees", generateFeeController);
erpRoutes.post("/fees/:feeId/pay", payFeeController);
erpRoutes.get("/attendance", listAttendanceController);
erpRoutes.post("/attendance", markAttendanceController);
erpRoutes.get("/grades", listGradesController);
erpRoutes.post("/grades", saveGradeController);
erpRoutes.get("/timetable", timetableController);
erpRoutes.get("/circulars", listCircularsController);
erpRoutes.post("/circulars", createCircularController);
erpRoutes.get("/support-tickets", listSupportTicketsController);
erpRoutes.post("/support-tickets", createSupportTicketController);
erpRoutes.patch("/support-tickets/:ticketId", updateSupportTicketController);

export default erpRoutes;
