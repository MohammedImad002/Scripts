const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema(
  {
    attachment: { type: String, required: true },
    attachmentType: { type: String, required: true },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    attachments: { type: [AttachmentSchema], required: true },
    reviewAttachments: { type: [AttachmentSchema] },
    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted",
    },
    submissionComment: { type: String },
    submittedOn: { type: Date, default: new Date() },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedOn: { type: Date },
    review: { type: String, enum: ["good", "bad", "veryBad"] },
    reviewComment: { type: String },
    totalMarks: { type: Number },
    scoredMarks: { type: Number },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    assignmentName: {
      type: String,
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AssignmentSubmission = mongoose.model(
  "AssignmentSubmission",
  submissionSchema,
  "assignment_submissions"
);

module.exports = AssignmentSubmission;
