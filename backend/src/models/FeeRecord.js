import mongoose from "mongoose";

const feeRecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, index: true, trim: true },
    term: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    generatedOn: { type: String, required: true, trim: true },
    dueDate: { type: String, required: true, trim: true },
    paidOn: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const FeeRecord = mongoose.model("FeeRecord", feeRecordSchema);
