import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true },
    label: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Section = mongoose.model("Section", sectionSchema);
