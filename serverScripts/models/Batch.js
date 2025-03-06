const mongoose = require("mongoose");

const questionBankCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseV2",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sequence: { type: Number },
    startDate: { type: Date },
    startTime: { type: String },
    endDate: { type: Date },
    endTime: { type: String },
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
    isActive: { type: Boolean, default: true },
    teacherCount: {
      type: Number,
      default: 0,
    },
    studentCount: {
      type: Number,
      default: 0,
    },
    questionBankCourses: [questionBankCourseSchema],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
