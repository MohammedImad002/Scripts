const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  qrCodeLink: String,
  question: String,
  answer: Boolean,
  mainInstruction: String,
  mainDescription: String,
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
  published: {
    type: Boolean,
    default: false, // Set a default value if needed
    // Add other necessary configuration if needed
  },
});
module.exports = mongoose.model("truefalse", NoteSchema);
