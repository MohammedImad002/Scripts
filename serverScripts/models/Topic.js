const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    parentTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;
