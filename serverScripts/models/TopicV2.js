const mongoose = require("mongoose");

const topicV2Schema = new mongoose.Schema(
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
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChapterV2",
      required: true,
    },
    questionCount: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TopicV2 = mongoose.model("TopicV2", topicV2Schema, "topics_v2");

module.exports = TopicV2;
