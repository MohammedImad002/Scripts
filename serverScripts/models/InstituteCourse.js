const mongoose = require("mongoose");

const instituteCourseSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    instituteName: { type: String, required: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: { type: String, required: true },
  },
  { timestamps: true }
);

const InstituteCourse = mongoose.model(
  "InstituteCourse",
  instituteCourseSchema,
  "institute_courses"
);

module.exports = InstituteCourse;
