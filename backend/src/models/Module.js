import mongoose from "mongoose";

const labelValueSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const moduleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true },
    label: { type: String, required: true },
    section: { type: String, required: true, trim: true },
    heading: { type: String, required: true },
    status: { type: String, required: true },
    primaryAction: { type: String, required: true },
    secondaryAction: { type: String, required: true },
    metrics: { type: [labelValueSchema], default: [] },
    tasks: { type: [String], default: [] },
    updates: { type: [String], default: [] },
    resources: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const Module = mongoose.model("Module", moduleSchema);
