// models/Follow.js
const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // User following
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User being followed
  createdAt: { type: Date, default: Date.now },
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;