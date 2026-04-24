import mongoose from "mongoose";

const supportActivitySchema = new mongoose.Schema(
  {
    actorRole: { type: String, required: true, trim: true },
    actorId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const supportTicketSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, index: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    createdOn: { type: String, required: true, trim: true },
    updatedOn: { type: String, required: true, trim: true },
    assignedTo: { type: String, trim: true, default: "" },
    resolutionNote: { type: String, trim: true, default: "" },
    lastUpdatedBy: { type: String, trim: true },
    activity: { type: [supportActivitySchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);
