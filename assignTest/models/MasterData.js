const mongoose = require("mongoose");

const masterDataSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const MasterData = mongoose.model(
  "MasterData",
  masterDataSchema,
  "master_data"
);

module.exports = MasterData;
