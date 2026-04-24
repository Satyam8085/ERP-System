import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, index: true, trim: true },
    subject: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["Present", "Absent", "Late"],
      default: "Present",
    },
    markedBy: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const AttendanceRecord = mongoose.model(
  "AttendanceRecord",
  attendanceRecordSchema
);
