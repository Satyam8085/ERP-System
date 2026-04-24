import mongoose from "mongoose";

const gradeRecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, index: true, trim: true },
    subject: { type: String, required: true, trim: true },
    assessment: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    maxScore: { type: Number, required: true, min: 0 },
    grade: { type: String, required: true, trim: true },
    updatedBy: { type: String, required: true, trim: true },
    updatedOn: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const GradeRecord = mongoose.model("GradeRecord", gradeRecordSchema);
