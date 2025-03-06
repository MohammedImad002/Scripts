const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const assignBatchSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    batchName: { type: String, required: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: { type: String, required: true },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

const AssignBatch = mongoose.model(
  "AssignBatch",
  assignBatchSchema,
  "batch_assignments"
);

module.exports = AssignBatch;
