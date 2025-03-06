const mongoose = require("mongoose");

const chapterV2Schema = new mongoose.Schema(
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
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitV2",
      required: true,
    },
    questionCount: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChapterV2 = mongoose.model("ChapterV2", chapterV2Schema, "chapters_v2");

module.exports = ChapterV2;
