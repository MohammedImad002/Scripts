const mongoose = require("mongoose");
const {
  TEST_TYPES: { PRACTICE },
} = require("../constants/commonConstants");
const { questionV2Schema } = require("./QuestionV2");

const PracticeTestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    testName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    testType: {
      type: String,
      default: PRACTICE,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4", "5"],
    },
    duration: {
      type: Number,
      required: true,
    },
    singleQuestionMark: {
      type: Number,
      required: true,
    },
    negativeMark: {
      type: Number,
      required: true,
    },
    subjects: [
      {
        subjectId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        subjectName: {
          type: String,
          required: true,
        },
        unitId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        unitName: {
          type: String,
          required: true,
        },
        chapterId: {
          type: mongoose.Types.ObjectId,
        },
        chapterName: {
          type: String,
        },
        topics: [
          {
            topicId: {
              type: mongoose.Types.ObjectId,
            },
            topicName: {
              type: String,
            },
          },
        ],
      },
    ],
    questions: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    ],
    questionsList: [questionV2Schema],
    totalMarks: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PracticeTest = mongoose.model("PracticeTest", PracticeTestSchema);

module.exports = PracticeTest;
