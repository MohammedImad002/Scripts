const mongoose = require("mongoose");
const { QUESTION_TYPES, QUIZ_TYPES } = require("../constants");

const SubmitQuizSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quizCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
    quizDetails: {
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
    batchDetails: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
    questionType: [
      {
        type: String,
        required: true,
        enum: Object.values(QUESTION_TYPES),
      },
    ],
    totalMarks: {
      type: Number,
      required: function () {
        return this.quizType === QUIZ_TYPES.TEST;
      },
    },
    scoredMarks: {
      type: Number,
      required: true,
    },
    isReviewed: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviewDate: {
      type: Date,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    inCorrectAnswers: {
      type: Number,
      required: true,
    },
    scoredPercentage: {
      type: Number,
    },
    duration: {
      type: Number,
      required: function () {
        return this.quizType === QUIZ_TYPES.TEST;
      },
    },
    totalTimeTaken: {
      type: Number,
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
    totalAttemptedQuestionsCount: {
      type: Number,
      default: 0,
    },
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
        teacherMarks: {
          type: Number,
          default: 0,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
        answer: {
          _id: false,
          studentAnswer: {
            type: Array,
          },
          attachments: [
            {
              type: String,
            },
          ],
        },
      },
    ],
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

SubmitQuizSchema.pre("save", async function (next) {
  const attemptedQuestionsCount = this.questions.reduce(
    (acc, curr) => {
      if (curr.answer?.studentAnswer.length > 0) {
        acc.count += 1;
      }
      return acc;
    },
    {
      count: 0,
    }
  );

  this.totalAttemptedQuestionsCount = attemptedQuestionsCount.count;

  next();
});

SubmitQuizSchema.post("findOneAndUpdate", async function () {
  const doc = await this.model.find(this.getQuery());

  doc[0].scoredPercentage = +(
    (doc[0].scoredMarks / doc[0].totalMarks) *
    100
  ).toFixed(2);

  await doc[0].save();
});

const SubmitQuiz = mongoose.model("SubmitQuiz", SubmitQuizSchema);

module.exports = SubmitQuiz;
