const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
      required: true,
    },
    topicName: {
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
    hasMaterial: {
      // if this is true there are materials directly connected to the subtopic and can be published
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const LMSSubTopic = mongoose.model(
  "LMSSubTopic",
  subTopicSchema,
  "lms_subtopics"
);

module.exports = LMSSubTopic;
