const mongoose = require("mongoose");
const { MATERIAL_LEVELS } = require("../constants");

const batchesSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    batchName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const publishMaterialSchema = new mongoose.Schema(
  {
    batches: {
      type: [batchesSchema],
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "LMSCourse",
    },
    courseName: {
      type: String,
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "LMSSubject",
    },
    subjectName: {
      type: String,
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
    },
    chapterName: {
      type: String,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
    },
    topicName: {
      type: String,
    },
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubTopic",
    },
    subTopicName: {
      type: String,
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    materialLevel: {
      type: String,
      enum: MATERIAL_LEVELS,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PublishMaterial = mongoose.model(
  "PublishMaterial",
  publishMaterialSchema,
  "published_materials"
);

module.exports = PublishMaterial;
