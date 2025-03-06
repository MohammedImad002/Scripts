const mongoose = require("mongoose");
const { questionSchema } = require("./LMSQuestion");
const { SCORE_FORMAT, ASSIGNMENT_TYPES } = require("../constants");

const batchesSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    batchName: {
      type: String,
      required: true,
    },
    reviewedCount: {
      type: Number,
      default: 0,
    },
    studentCount: {
      type: Number,
      required: true,
    },
    submittedCount: {
      type: Number,
      default: 0,
    },
    totalMarks: {
      type: Number,
    },
  },
  { _id: false }
);

const assignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: [ASSIGNMENT_TYPES.PROJECT, ASSIGNMENT_TYPES.ASSIGNMENT_TEST],
    },
    description: { type: String },
    deadLine: { type: Date },
    scoreFormat: {
      type: String,
      enum: [SCORE_FORMAT.MARKS, SCORE_FORMAT.GRADE],
      required: true,
    },
    totalMarks: { type: Number },
    attachment: { type: String },
    attachmentType: { type: String },
    batches: { type: [batchesSchema] },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
      required: true,
    },
    subjectName: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
    instituteName: String,
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    branchName: String,
    grade: {
      String,
      enum: ["A", "B", "C"],
    },
    questions: [questionSchema],
    totalQuestions: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
