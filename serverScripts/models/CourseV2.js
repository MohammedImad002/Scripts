const mongoose = require("mongoose");

const courseV2Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructionText: {
      type: String,
      default: "",
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CourseV2 = mongoose.model("CourseV2", courseV2Schema, "courses_v2");

module.exports = CourseV2;
