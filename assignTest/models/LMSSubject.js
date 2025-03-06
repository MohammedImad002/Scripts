const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sequence: Number,
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseSequence: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    chapterCount: {
      type: Number,
      default: 0,
    },
    materialCount: {
      type: Number,
      default: 0,
    },
    isLab: {
      type: Boolean,
      default: false,
    },
    hasMaterial: {
      // if this is true there are materials directly connected to the subject and can be published Eg. for lab videos
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

const LMSSubject = mongoose.model("LMSSubject", subjectSchema, "lms_subjects");

module.exports = LMSSubject;
