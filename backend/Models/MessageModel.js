const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateNTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("message", messageSchema);
