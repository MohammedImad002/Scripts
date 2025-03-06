const mongoose = require("mongoose");

const subjectV2Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseV2",
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SubjectV2 = mongoose.model("SubjectV2", subjectV2Schema, "subjects_v2");

module.exports = SubjectV2;
