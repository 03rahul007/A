const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  dateNTime: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("newsletter", newsLetterSchema);
