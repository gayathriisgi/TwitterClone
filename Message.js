// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // Sender of the message
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Receiver of the message
  content: { type: String },  // Message content
  timestamp: { type: Date, default: Date.now },  // Timestamp of the message
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;