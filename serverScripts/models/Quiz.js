const mongoose = require("mongoose");
const { QUESTION_TYPES, QUIZ_TYPES } = require("../constants");

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    courseDetails: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    instituteDetails: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    branchDetails: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    batchDetails: [
      {
        _id: false,
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        name: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    duration: {
      type: Number,
    },
    questionType: [
      {
        type: String,
        required: true,
        enum: Object.values(QUESTION_TYPES),
      },
    ],
    questions: [
      {
        _id: false,
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "LMSQuestion",
        },
        marks: {
          type: Number,
        },
        questionType: {
          type: String,
          required: true,
        },
      },
    ],
    totalMarks: {
      type: Number,
      required: function () {
        return this.quizType === QUIZ_TYPES.TEST;
      },
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    quizType: {
      type: String,
      required: true,
      enum: Object.values(QUIZ_TYPES),
    },
    endDate: {
      type: Date,
      required: function () {
        return this.quizType === QUIZ_TYPES.ASSIGNMENT;
      },
    },
    subjectDetails: {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      subjectName: {
        type: String,
        required: true,
      },
      chapterId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      chapterName: {
        type: String,
      },
      topicId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      topicName: {
        type: String,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
