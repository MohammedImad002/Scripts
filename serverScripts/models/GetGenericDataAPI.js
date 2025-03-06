const mongoose = require("mongoose");
const durationSchema = new mongoose.Schema(
  {
    hours: Number,
    minutes: Number,
    seconds: Number,
  },
  { _id: false }
);
const getGameDataAPISchema = new mongoose.Schema({
  type: Number,
  qrCodeId: String, //IGJ001
  modelName: String,
  mainInstruction: String,
  mainDescription: String,
  gameType: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LMSCourse",
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LMSSubject",
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LMSChapter",
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LMSTopic",
  },
  subTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LMSSubTopic",
  },
  duration: durationSchema,
  fileName: String,
  // published: {
  //   type: Boolean,
  //   default: false, // Set a default value if needed
  //   // Add other necessary configuration if needed
  // },
  publishedInstitutes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
  ],
});
module.exports = mongoose.model("getGameData", getGameDataAPISchema);
