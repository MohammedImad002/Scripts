const mongoose = require("mongoose");
const { questionSchema } = require("./Question");

const favQuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: questionSchema,
      required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const FavQuestion = mongoose.model(
  "FavQuestion",
  favQuestionSchema,
  "favourite_questions"
);

module.exports = FavQuestion;
