const mongoose = require("mongoose");

const subjectsSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
    },
    subjectName: {
      type: String,
    },
    subjectIcon: {
      type: String,
    },
    subjectSequence: {
      type: Number,
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sequence: Number,
    subjects: { type: [subjectsSchema], default: [] },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    subjectCount: {
      type: Number,
      default: 0,
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

const LMSCourse = mongoose.model("LMSCourse", courseSchema, "lms_courses");

module.exports = LMSCourse;
