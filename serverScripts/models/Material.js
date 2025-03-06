const mongoose = require("mongoose");
const {
  MATERIAL_TYPES,
  MATERIAL_FILE_TYPES,
  MATERIAL_LEVELS,
} = require("../constants");

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    thumbnail: { type: String },
    fileType: {
      type: String,
      enum: MATERIAL_FILE_TYPES,
      required: true,
    },
    materialType: {
      type: String,
      enum: MATERIAL_TYPES,
      required: true,
    },
    materialLevel: {
      type: String,
      enum: MATERIAL_LEVELS,
      required: true,
    },
    sequence: { type: String, required: true },
    deleted: { type: Boolean, default: false },
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
      required: function () {
        return [
          MATERIAL_LEVELS.CHAPTER,
          MATERIAL_LEVELS.TOPIC,
          MATERIAL_LEVELS.SUB_TOPIC,
        ].includes(this.materialLevel);
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
    },
    chapterName: {
      required: function () {
        return [
          MATERIAL_LEVELS.CHAPTER,
          MATERIAL_LEVELS.TOPIC,
          MATERIAL_LEVELS.SUB_TOPIC,
        ].includes(this.materialLevel);
      },
      type: String,
    },
    topicId: {
      required: function () {
        return [MATERIAL_LEVELS.TOPIC, MATERIAL_LEVELS.SUB_TOPIC].includes(
          this.materialLevel
        );
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
    },
    topicName: {
      required: function () {
        return [MATERIAL_LEVELS.TOPIC, MATERIAL_LEVELS.SUB_TOPIC].includes(
          this.materialLevel
        );
      },
      type: String,
    },
    subTopicId: {
      required: function () {
        return [MATERIAL_LEVELS.SUB_TOPIC].includes(this.materialLevel);
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubTopic",
    },
    subTopicName: {
      required: function () {
        return [MATERIAL_LEVELS.SUB_TOPIC].includes(this.materialLevel);
      },
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
