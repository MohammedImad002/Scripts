const mongoose = require("mongoose");
const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});
const NoteSchema = new mongoose.Schema({
  qrCodeLink: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  allOption: {
    type: [String],
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  mainInstruction: {
    type: String,
    required: true,
  },
  mainDescription: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false, // Set a default value if needed
    // Add other necessary configuration if needed
  },
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
});
module.exports = mongoose.model("mcq2Option", NoteSchema);
