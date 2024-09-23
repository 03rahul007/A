const express = require("express");
const AuthModel = require("../Models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// console.log(jwt);
// console.log(bcrypt);

const router = express.Router();

router.post("/create", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    // Hash the password before saving it in the database
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error generating salt", error: err });
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error hashing password", error: err });
        try {
          const createUser = await AuthModel.create({
            username,
            email,
            password: hash,
            role,
          });
          // Generate JWT token
          const token = jwt.sign(
            { email: createUser.email }, // Payload
            process.env.JWT_SECRET, // Secret key (ensure this is set in your .env file)
            { expiresIn: "1h" } // Options (e.g., token expiration time)
          );

          // Set token as an HTTP-only cookie
          res.cookie("token", token, { maxAge: 900000, httpOnly: true });

          // Send response with the created user and token
          res.status(201).json({
            message: "User created successfully",
            user: createUser,
            token: token,
          });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error saving user to database", error });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
