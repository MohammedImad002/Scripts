const mongoose = require("mongoose");
const { TEST_TYPES } = require("../constants/commonConstants");
const { QUESTION_TYPES } = require("../constants");

const SubmitPracticeTestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    testId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "PracticeTest",
    },
    testName: {
      type: String,
      required: true,
    },
    testType: {
      type: String,
      default: TEST_TYPES.PRACTICE,
    },
    courseDetails: {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    instituteDetails: {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    branchDetails: {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    batchDetails: {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    testStartTime: {
      type: Date,
      required: true,
    },
    testEndTime: {
      type: Date,
      required: true,
    },
    totalScoredMarks: {
      type: Number,
      required: true,
    },
    totalTestMarks: {
      type: Number,
      required: true,
    },
    totalCorrectAnswers: {
      type: Number,
    },
    totalIncorrectAnswers: {
      type: Number,
    },
    totalSkippedAnswers: {
      type: Number,
    },
    percentageScore: {
      type: Number,
    },
    averageTimeForSingleQuestion: {
      type: Number,
    },
    potentialScore: {
      type: Number,
    },
    testDetails: {
      questionsList: [
        {
          _id: false,
          questionId: {
            type: mongoose.Types.ObjectId,
            required: true,
          },
          answer: {
            type: mongoose.Schema.Types.Mixed,
          },
          // Total time taken by the student to complete the question (in seconds)
          timeTakenForQuestion: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            enum: Object.values(QUESTION_TYPES),
            required: true,
          },
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
          correctAnswer: mongoose.Schema.Types.Mixed,
          solution: {
            text: String,
          },
          skipped: {
            type: Boolean,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: function () {
              return this.skipped === false;
            },
          },
        },
      ],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

SubmitPracticeTestSchema.pre("save", async function (next) {
  const totalAnswersDetails = this.testDetails.questionsList.reduce(
    (accum, current) => {
      if (current.answer) {
        accum.totalTimeTaken += current.timeTakenForQuestion || 0;
        accum.totalQuestionsWithAnswer++;
      }
      return accum;
    },
    {
      totalTimeTaken: 0,
      totalQuestionsWithAnswer: 0,
    }
  );

  // Get percentage scored
  const percentageScore = +(
    (this.totalScoredMarks / this.totalTestMarks) *
    100
  ).toFixed(2);

  const avgTimeForSingleQuestion = +(
    totalAnswersDetails.totalTimeTaken /
    totalAnswersDetails.totalQuestionsWithAnswer
  ).toFixed(2);

  // This value will be populated using AI score in the future
  const potentialScore =
    percentageScore > 90 ? percentageScore : percentageScore + 10;

  this.potentialScore = potentialScore;
  this.percentageScore = percentageScore;
  this.averageTimeForSingleQuestion = avgTimeForSingleQuestion;

  next();
});

const SubmitPracticeTest = mongoose.model(
  "SubmitPracticeTest",
  SubmitPracticeTestSchema
);

module.exports = SubmitPracticeTest;
