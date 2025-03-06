const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
