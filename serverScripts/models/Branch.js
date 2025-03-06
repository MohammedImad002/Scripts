const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    boardName: { type: String },
    logo: { type: String },
    branchImage: { type: String },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    instituteName: { type: String, required: true },
    address: { type: String },
    area: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date },
    studentLimit: { type: Number },
    teacherLimit: { type: Number },
    teacherCount: {
      type: Number,
      default: 0,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
