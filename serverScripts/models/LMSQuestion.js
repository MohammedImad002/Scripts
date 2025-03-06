const mongoose = require("mongoose");
const { QUESTION_TYPES } = require("../constants");

const subQuestionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(QUESTION_TYPES),
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: { type: mongoose.Schema.Types.Mixed },
    answer: { type: mongoose.Schema.Types.Mixed },
    solution: { type: String },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(QUESTION_TYPES),
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
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
    },
    chapterName: {
      type: String,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
    },
    topicName: {
      type: String,
    },
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubTopic",
    },
    subTopicName: {
      type: String,
    },
    question: {
      type: String,
      required: true,
    },
    options: { type: mongoose.Schema.Types.Mixed },
    answer: { type: mongoose.Schema.Types.Mixed },
    solution: { type: String },
    deleted: { type: Boolean, default: false },
    processingId: String,
    difficulty: Number,
    subQuestions: [subQuestionSchema],
  },
  {
    timestamps: true,
  }
);

const LMSQuestion = mongoose.model(
  "LMSQuestion",
  questionSchema,
  "questions_QR"
);

module.exports = { LMSQuestion, questionSchema };
