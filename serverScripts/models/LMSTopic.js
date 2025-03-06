const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
      required: true,
    },
    chapterName: {
      type: String,
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    sequence: {
      type: Number,
      required: true,
    },
    subTopicCount: {
      type: Number,
      default: 0,
    },
    materialCount: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    isLMS: {
      type: Boolean,
      default: true,
    },
    hasMaterial: {
      // if this is true there are materials directly connected to the topic and can be published
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const LMSTopic = mongoose.model("LMSTopic", topicSchema, "lms_topics");

module.exports = LMSTopic;
