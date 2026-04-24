import mongoose from "mongoose";

const circularSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    audience: { type: [String], default: [] },
    createdBy: { type: String, required: true, trim: true },
    createdOn: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Circular = mongoose.model("Circular", circularSchema);
