const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sequence: {
      type: Number,
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
    topicCount: {
      type: Number,
      default: 0,
    },
    hasMaterial: {
      // if this is true there are materials directly connected to the chapter and can be published
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

const LMSChapter = mongoose.model("LMSChapter", chapterSchema, "lms_chapters");

module.exports = LMSChapter;
