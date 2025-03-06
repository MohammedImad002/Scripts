const mongoose = require("mongoose");
const { BULK_UPLOAD_TYPES } = require("../constants/index");

const bulkUploadFileSchema = new mongoose.Schema(
  {
    processingId: {
      type: String,
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.USER;
      },
    },
    instituteName: {
      type: String,
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.USER;
      },
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.USER;
      },
    },
    branchName: {
      type: String,
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.USER;
      },
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
    batchName: {
      type: String,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return (
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION_CORNER ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUIZ ||
          this.uploadedType == BULK_UPLOAD_TYPES.CHAPTER ||
          this.uploadedType == BULK_UPLOAD_TYPES.TOPIC ||
          this.uploadedType == BULK_UPLOAD_TYPES.SUB_TOPIC
        );
      },
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return (
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUIZ ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION_CORNER ||
          this.uploadedType == BULK_UPLOAD_TYPES.CHAPTER ||
          this.uploadedType == BULK_UPLOAD_TYPES.TOPIC ||
          this.uploadedType == BULK_UPLOAD_TYPES.SUB_TOPIC
        );
      },
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.QUESTION;
      },
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return (
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUIZ ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION_CORNER ||
          this.uploadedType == BULK_UPLOAD_TYPES.TOPIC ||
          this.uploadedType == BULK_UPLOAD_TYPES.SUB_TOPIC
        );
      },
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return (
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUIZ ||
          this.uploadedType === BULK_UPLOAD_TYPES.QUESTION_CORNER ||
          this.uploadedType == BULK_UPLOAD_TYPES.SUB_TOPIC
        );
      },
    },
    uploadedType: {
      type: String,
      enum: Object.values(BULK_UPLOAD_TYPES),
      required: true,
    },
    qrCodeId: {
      type: String,
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.QUIZ;
      },
    },
    mainInstruction: {
      type: String,
    },
    mainDescription: {
      type: String,
    },
    sharable: {
      type: Boolean,
      required: function () {
        return this.uploadedType === BULK_UPLOAD_TYPES.QUESTION;
      },
    },
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    errorFilePath: {
      type: String,
    },
    uploaded: {
      type: Boolean,
      default: false,
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

const BulkUploadFile = mongoose.model(
  "BulkUploadFile",
  bulkUploadFileSchema,
  "bulk_upload_files"
);

module.exports = BulkUploadFile;
