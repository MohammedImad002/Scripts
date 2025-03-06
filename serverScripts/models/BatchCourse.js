const mongoose = require("mongoose");

const subjectsSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
      required: true,
    },
    subjectName: { type: String, required: true },
  },
  { _id: false }
);

const batchCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: { type: String, required: true },
    subjects: [subjectsSchema],
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    batchName: { type: String, required: true },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    branchName: { type: String, required: true },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    instituteName: { type: String, required: true },
  },
  { timestamps: true }
);

const BatchCourse = mongoose.model(
  "BatchCourse",
  batchCourseSchema,
  "batch_courses"
);

module.exports = BatchCourse;
