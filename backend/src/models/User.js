import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    initials: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ["student", "staff", "admin"],
      trim: true,
    },
    studentId: { type: String, unique: true, sparse: true, trim: true },
    employeeId: { type: String, unique: true, sparse: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    course: { type: String, trim: true },
    semester: { type: String, trim: true },
    department: { type: String, trim: true },
    designation: { type: String, trim: true },
    collegeName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
