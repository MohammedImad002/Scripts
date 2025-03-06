const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const matrixSizeSchema = new mongoose.Schema(
  {
    rows: Number,
    columns: Number,
  },
  { _id: false }
);

const optionSchema = new mongoose.Schema(
  {
    d: { type: textSchema, required: true },
    v: { type: Number, required: true },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    createdBy: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseV2",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectV2",
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TopicV2",
      required: true,
    },
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TopicV2",
    },
    external: {
      type: Boolean,
      required: true,
    },
    sharable: {
      type: Boolean,
      required: true,
      default: false,
    },
    matrixSize: matrixSizeSchema,
    tags: [String],
    difficulty: String,
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],
    type: {
      type: String,
      required: true,
    },
    partialMarking: { type: Boolean, default: false },
    hasRelatedQuestions: { type: Boolean, default: false },
    childQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    question: {
      type: textSchema,
      required: true,
    },
    options: [optionSchema],
    answer: mongoose.Schema.Types.Mixed,
    solution: textSchema,
    comprehension: String,
    disabled: { type: Boolean, default: false },
    processingId: String,
    author: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const getModelWithCollection = (collectionName) => {
  return mongoose.model(
    "DocQuestion",
    questionSchema,
    `questions_${collectionName}`
  );
};

module.exports = { getModelWithCollection };
