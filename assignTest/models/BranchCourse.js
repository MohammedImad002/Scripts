const mongoose = require("mongoose");

const branchCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: { type: String, required: true },
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

const BranchCourse = mongoose.model(
  "BranchCourse",
  branchCourseSchema,
  "branch_courses"
);

module.exports = BranchCourse;
