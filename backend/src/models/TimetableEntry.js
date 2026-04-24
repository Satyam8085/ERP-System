import mongoose from "mongoose";

const timetableEntrySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    ownerRole: {
      type: String,
      required: true,
      enum: ["student", "staff"],
      trim: true,
    },
    ownerId: { type: String, required: true, index: true, trim: true },
    day: { type: String, required: true, trim: true },
    slot: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    room: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const TimetableEntry = mongoose.model("TimetableEntry", timetableEntrySchema);
