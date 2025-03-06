const mongoose = require("mongoose");

const socketConnectionSchema = new mongoose.Schema(
  {
    connectionId: {
      type: String,
      required: true,
    },
    processingId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SocketConnection = mongoose.model(
  "SocketConnection",
  socketConnectionSchema,
  "socket_connections"
);

module.exports = SocketConnection;
