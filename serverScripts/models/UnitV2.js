const mongoose = require("mongoose");

const unitV2Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseV2",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectV2",
      required: true,
    },
    questionCount: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UnitV2 = mongoose.model("UnitV2", unitV2Schema, "units_v2");

module.exports = UnitV2;
