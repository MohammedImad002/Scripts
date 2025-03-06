const mongoose = require("mongoose");

const subTopicV2Schema = new mongoose.Schema(
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
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TopicV2",
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SubTopicV2 = mongoose.model(
  "SubTopicV2",
  subTopicV2Schema,
  "sub_topics_v2"
);

module.exports = SubTopicV2;
