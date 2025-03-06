const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    path: { type: String, required: true },
    thumbnail: { type: String },
    fileType: {
      type: String,
      validate: {
        validator: function () {
          return (
            (this.materialType === "teaching" &&
              ["pdf", "pptx"].includes(this.fileType)) ||
            (["experiment", "study"].includes(this.materialType) &&
              this.fileType === "video")
          );
        },
        message: "Invalid fileType for the given materialType",
      },
      required: true,
    },
    materialType: {
      type: String,
      enum: ["experiment", "teaching", "study"],
      required: true,
    },
    sequence: { type: Number, required: true },
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
        return ["teaching", "study"].includes(this.materialType);
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
    },
    chapterName: {
      required: function () {
        return ["teaching", "study"].includes(this.materialType);
      },
      type: String,
    },
    topicId: {
      required: function () {
        return ["teaching", "study"].includes(this.materialType);
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
    },
    topicName: {
      required: function () {
        return ["teaching", "study"].includes(this.materialType);
      },
      type: String,
    },
    subTopicId: {
      required: function () {
        return ["study"].includes(this.materialType);
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubTopic",
    },
    subTopicName: {
      required: function () {
        return ["study"].includes(this.materialType);
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
