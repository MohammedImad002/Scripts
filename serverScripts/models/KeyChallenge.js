const mongoose = require("mongoose");

const keyChallengeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    studentAnswer: {
      type: String,
      required: true,
    },
    answerDescription: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
    },
  },
  { timestamps: true }
);

const KeyChallenge = mongoose.model("KeyChallenge", keyChallengeSchema);

module.exports = KeyChallenge;
