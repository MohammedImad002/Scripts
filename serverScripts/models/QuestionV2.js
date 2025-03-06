const mongoose = require("mongoose");

const questionV2Schema = new mongoose.Schema(
  {
    matrixSize: {
      rows: Number,
      columns: Number,
    },
    tags: [String],
    difficulty: String,
    assets: [String],
    type: String,
    partialMarking: Boolean,
    hasRelatedQuestions: Boolean,
    childQuestions: [String],
    question: {
      text: String,
    },
    options: [
      {
        d: {
          text: String,
        },
        v: Number,
      },
    ],
    answer: mongoose.Schema.Types.Mixed,
    solution: {
      text: String,
    },
    comprehension: String,
    stored_topic_name: String,
    llm_chapter_response: {
      topic_name: String,
      confidence_score: Number,
      explanation: String,
      prompt: String,
    },
    llm_topic_response: {
      topic_name: String,
      confidence_score: Number,
      explanation: String,
      prompt: String,
    },
    chapterId: mongoose.Schema.Types.ObjectId,
    unitId: mongoose.Schema.Types.ObjectId,
    topicId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId,
    subjectId: mongoose.Schema.Types.ObjectId,
    disabled: { type: Boolean, default: false },
    processingId: String,
    author: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    external: {
      type: Boolean,
      default: false,
    },
    sharable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const QuestionV2 = mongoose.model(
  "QuestionV2",
  questionV2Schema,
  `questions_v2`
);

module.exports = { QuestionV2, questionV2Schema };
