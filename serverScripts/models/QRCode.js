const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema(
  {
    qrCodeId: {
      type: String,
      required: true,
    },
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubTopic",
    },
    subTopicName: {
      type: String,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
      required: true,
    },
    topicName: {
      type: String,
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
      required: true,
    },
    chapterName: {
      type: String,
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    qrCodePath: {
      type: String,
      required: true,
    },
    videoPath: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const QRCode = mongoose.model("QRCode", qrCodeSchema, "qr_codes");

module.exports = QRCode;
