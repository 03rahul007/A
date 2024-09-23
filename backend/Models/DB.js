require("dotenv").config();
const mongoose = require("mongoose");

const env = process.env;

try {
mongoose
  .connect(`${env.DB}/FullMERN`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
} catch (error) {
  console.log("DB Error: " + error);
}

module.exports = mongoose;
