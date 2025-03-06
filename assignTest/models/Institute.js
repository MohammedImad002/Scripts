const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String },
    instituteImage: { type: String },
    address: { type: String },
    boards: [
      {
        _id: false,
        boardId: { type: mongoose.Schema.Types.ObjectId },
        boardName: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date },
    branchStudentLimit: { type: Number },
    branchTeacherLimit: { type: Number },
    teacherCount: {
      type: Number,
      default: 0,
    },
    branchCount: {
      type: Number,
      default: 0,
    },
    batchCount: {
      type: Number,
      default: 0,
    },
    publishAllMaterial: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;
