const mongoose = require("mongoose");
const { TEST_TYPES } = require("../constants/commonConstants");
const { QUESTION_TYPES, SUBMIT_TEST_STATUS } = require("../constants");
// eslint-disable-next-line no-unused-vars
const User = require("./User");

const SubmitTestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentName: { type: String, required: true },
    // CHANGE THIS FIELD NAME TO PARENT TEST ID AS IT REPRESENTS THE PARENT TEST TEACHER CREATED
    testId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "InstituteTestV2",
    },
    testName: {
      type: String,
      required: true,
    },
    testPatternId: {
      type: mongoose.Types.ObjectId,
      ref: "SuperAdminTestTemplate",
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    testPatternName: {
      type: String,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    courseDetails: {
      _id: false,
      courseId: {
        type: String,
        required: function () {
          return this.status === SUBMIT_TEST_STATUS.COMPLETED;
        },
      },
      courseName: {
        type: String,
        required: function () {
          return this.status === SUBMIT_TEST_STATUS.COMPLETED;
        },
      },
    },
    batchName: {
      type: String,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    testCreatedBy: {
      type: mongoose.Types.ObjectId,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
      ref: "User",
    },
    testType: {
      type: String,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
      enum: [
        TEST_TYPES.SUPERADMIN,
        TEST_TYPES.TEACHER,
        TEST_TYPES.INSTITUTE_ADMIN,
        TEST_TYPES.BRANCH_ADMIN,
        TEST_TYPES.PRACTICE,
      ],
    },
    instituteId: {
      type: mongoose.Types.ObjectId,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    branchId: {
      type: mongoose.Types.ObjectId,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    batchId: {
      type: mongoose.Types.ObjectId,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    totalTestDuration: {
      type: Number,
      // required: true,
    },
    // Total time taken by the student to complete the test (in minutes)
    totalDuration: {
      type: Number,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    testStartTime: {
      type: Date,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    testEndTime: {
      type: Date,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    testStartedAt: {
      type: Date,
    },
    testEndedAt: {
      type: Date,
    },
    // in snake case as insitute test model uses it , and needed it in same way to get all active submitted tests
    is_active: {
      type: Boolean,
      default: true,
    },
    totalScoredMarks: {
      type: Number,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    totalTestMarks: {
      type: Number,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    totalQuestions: {
      type: Number,
    },
    questionsToAttempt: {
      type: Number,
      required: function () {
        return this.status === SUBMIT_TEST_STATUS.COMPLETED;
      },
    },
    highestMarkSubjectDetails: {
      _id: false,
      subjectId: {
        type: mongoose.Types.ObjectId,
        // required: true,
      },
      subjectName: {
        type: String,
      },
      totalMarks: {
        type: Number,
      },
      scoredMarks: {
        type: Number,
      },
      correctAnswers: {
        type: Number,
      },
      incorrectAnswers: {
        type: Number,
      },
      skippedAnswers: {
        type: Number,
      },
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
    forReview: { type: Boolean, default: false },
    testDetails: {
      subjectDetails: [
        {
          _id: false,
          subjectId: {
            type: mongoose.Types.ObjectId,
            required: true,
          },
          subjectName: {
            type: String,
            required: true,
          },
          teacherId: {
            type: mongoose.Types.ObjectId,
            required: false,
          },
          totalQuestions: {
            type: Number,
          },
          questionsToAttempt: {
            type: Number,
            required: true,
          },
          totalMarks: {
            type: Number,
            required: true,
          },
          scoredMarks: {
            type: Number,
            required: true,
          },
          correctAnswers: {
            type: Number,
            required: true,
          },
          incorrectAnswers: {
            type: Number,
            required: true,
          },
          skippedAnswers: {
            type: Number,
            required: true,
          },
          forReview: { type: Boolean, default: false },
          sections: [
            {
              // _id: false,
              sectionName: {
                type: String,
                required: true,
              },
              questionType: [
                {
                  type: String,
                  enum: Object.values(QUESTION_TYPES),
                },
              ],
              totalQuestions: {
                type: Number,
              },
              questionsToAttempt: {
                type: Number,
                required: true,
              },
              totalMarks: {
                type: Number,
                required: true,
              },
              scoredMarks: {
                type: Number,
                required: true,
              },
              correctAnswers: {
                type: Number,
                required: true,
              },
              incorrectAnswers: {
                type: Number,
                required: true,
              },
              skippedAnswers: {
                type: Number,
                required: true,
              },
              forReview: { type: Boolean, default: false },
              questionsList: [
                {
                  _id: false,
                  questionId: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                  },
                  type: {
                    type: String,
                    enum: Object.values(QUESTION_TYPES),
                    required: true,
                  },
                  answer: {
                    type: mongoose.Schema.Types.Mixed,
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
                  forReview: { type: Boolean, default: false },
                  correctAnswer: mongoose.Schema.Types.Mixed,
                  solution: {
                    text: String,
                  },
                  // Total time taken by the student to complete the question (in seconds)
                  timeTakenForQuestion: {
                    type: Number,
                    required: function () {
                      return this.skipped === false;
                    },
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
                  mark: {
                    type: Number,
                    required: function () {
                      return this.skipped === false;
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    result_announce: {
      type: String,
      enum: ["IMMEDIATE", "LATER"],
      default: "IMMEDIATE",
    },
    result_announce_time: {
      type: Date,
      default: new Date().toISOString(),
    },
    status: {
      type: String,
      enum: Object.values(SUBMIT_TEST_STATUS),
      required: true,
    },
  },
  { timestamps: true }
);

SubmitTestSchema.pre("save", async function (next) {
  if (this.status !== SUBMIT_TEST_STATUS.COMPLETED) {
    return next();
  }
  // Get subject with highest marks
  const highestMarkSubject = this.testDetails.subjectDetails.reduce(
    (prev, curr) => (prev && prev.scoredMarks > curr.scoredMarks ? prev : curr)
  );

  // Get the total correct, incorrect and skipped answers of complete test
  const totalAnswersDetails = this.testDetails.subjectDetails.reduce(
    (accum, current) => {
      accum.correctAnswers += current.correctAnswers || 0;
      accum.incorrectAnswers += current.incorrectAnswers || 0;
      accum.skippedAnswers += current.skippedAnswers || 0;
      accum.totalScoredMarks += current.scoredMarks || 0;
      current.sections.forEach((section) => {
        section.questionsList.forEach((question) => {
          if (question.answer) {
            accum.totalTimeTaken += question.timeTakenForQuestion || 0;
            accum.totalQuestionsWithAnswer++;
          }
        });
      });
      return accum;
    },
    {
      correctAnswers: 0,
      incorrectAnswers: 0,
      skippedAnswers: 0,
      totalScoredMarks: 0,
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
    (totalAnswersDetails.totalTimeTaken ?? 0) /
      (totalAnswersDetails.totalQuestionsWithAnswer ?? 0) || 0
  ).toFixed(2);

  // This value will be populated using AI score in the future
  const potentialScore =
    percentageScore > 90 ? percentageScore : percentageScore + 10;

  this.potentialScore = potentialScore;
  this.percentageScore = percentageScore;
  this.averageTimeForSingleQuestion = avgTimeForSingleQuestion;
  this.totalSkippedAnswers = totalAnswersDetails.skippedAnswers;
  this.totalIncorrectAnswers = totalAnswersDetails.incorrectAnswers;
  this.totalCorrectAnswers = totalAnswersDetails.correctAnswers;
  this.highestMarkSubjectDetails = {
    subjectId: highestMarkSubject.subjectId,
    subjectName: highestMarkSubject.subjectName,
    scoredMarks: highestMarkSubject.scoredMarks,
    totalMarks: highestMarkSubject.totalMarks,
    correctAnswers: highestMarkSubject.correctAnswers,
    incorrectAnswers: highestMarkSubject.incorrectAnswers,
    skippedAnswers: highestMarkSubject.skippedAnswers,
    marksPercentage: (
      (highestMarkSubject.scoredMarks / highestMarkSubject.totalMarks) *
      100
    ).toFixed(2),
  };

  next();
});
SubmitTestSchema.post("updateMany", async function (next) {
  if (this.status !== SUBMIT_TEST_STATUS.COMPLETED) {
    return next();
  }
  const docs = await this.model.find(this.getQuery());

  await Promise.all(
    docs.map(async (doc) => {
      const highestMarkSubject = doc.testDetails.subjectDetails.reduce(
        (prev, curr) =>
          prev && prev.scoredMarks > curr.scoredMarks ? prev : curr
      );

      const totalAnswersDetails = doc.testDetails.subjectDetails.reduce(
        (accum, current) => {
          Object.entries(current).forEach(([key, value]) => {
            if (
              ["correctAnswers", "incorrectAnswers", "skippedAnswers"].includes(
                key
              )
            ) {
              accum[key] = accum[key] + value || value;
            } else if (key === "sections") {
              value.forEach((section) => {
                section.questionsList.forEach((question) => {
                  if (question.answer) {
                    accum.totalTimeTaken =
                      (accum.totalTimeTaken || 0) +
                      question.timeTakenForQuestion;
                    accum.totalQuestionsWithAnswer =
                      (accum.totalQuestionsWithAnswer || 0) + 1;
                  }
                });
              });
            }
          });
          return {
            ...accum,
          };
        },
        {}
      );

      const percentageScore = +(
        (doc.totalScoredMarks / doc.totalTestMarks) *
        100
      ).toFixed(2);

      const avgTimeForSingleQuestion = +(
        (totalAnswersDetails.totalTimeTaken ?? 0) /
          (totalAnswersDetails.totalQuestionsWithAnswer ?? 0) || 0
      ).toFixed(2);

      const potentialScore =
        percentageScore > 90 ? percentageScore : percentageScore + 10;

      doc.potentialScore = potentialScore;
      doc.percentageScore = percentageScore;
      doc.averageTimeForSingleQuestion = avgTimeForSingleQuestion;
      doc.totalSkippedAnswers = totalAnswersDetails.skippedAnswers;
      doc.totalIncorrectAnswers = totalAnswersDetails.incorrectAnswers;
      doc.totalCorrectAnswers = totalAnswersDetails.correctAnswers;
      doc.highestMarkSubjectDetails = {
        subjectId: highestMarkSubject.subjectId,
        subjectName: highestMarkSubject.subjectName,
        totalMarks: highestMarkSubject.totalMarks,
        marks: highestMarkSubject.scoredMarks,
        correctAnswers: highestMarkSubject.correctAnswers,
        incorrectAnswers: highestMarkSubject.incorrectAnswers,
        skippedAnswers: highestMarkSubject.skippedAnswers,
        marksPercentage: (
          (highestMarkSubject.scoredMarks / highestMarkSubject.totalMarks) *
          100
        ).toFixed(2),
      };
      await doc.save();
    })
  );
});

const SubmitTest = mongoose.model("SubmitTest", SubmitTestSchema);

module.exports = SubmitTest;
