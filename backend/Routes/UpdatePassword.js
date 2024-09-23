const express = require("express");
const AuthModel = require("../Models/auth");
const bcrypt = require("bcrypt");

const router = express.Router();

router.patch("/updatepassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await AuthModel.findOne({ email });
    if (!existingUser) {
      return res.status(409).json({ message: "User doesn't exist" });
    }

    // Compare the provided password with the existing hashed password
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      // If passwords match, don't allow setting the same password
      if (result) {
        return res.status(409).json({ message: "Don't reuse the old password" });
      }

      // Hash the new password before saving it in the database
      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return res.status(500).json({ message: "Error generating salt", error: err });

        bcrypt.hash(password, salt, async (err, hash) => {
          if (err)
            return res.status(500).json({ message: "Error hashing password", error: err });

          try {
            // Update the user's password in the database
            const updateUser = await AuthModel.findOneAndUpdate(
              { email }, // Filter
              { password: hash }, // Update
              { new: true } // Return the updated document
            );

            res.status(201).json({
              message: "Password changed successfully",
              user: updateUser,
            });
          } catch (error) {
            res.status(500).json({ message: "Error saving user to database", error });
          }
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
