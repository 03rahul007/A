const express = require("express");
const AuthModel = require("../Models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

// Use cookie-parser middleware to access cookies in the request
router.use(cookieParser());

// Route to handle login
router.post("/login", async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Find user by email in the database
    const checkUser = await AuthModel.findOne({ email });

    // If no user is found, send a response indicating the user needs to register
    if (!checkUser) {
      return res.status(409).json({ message: "Please register first." });
    }

    // Compare provided password with the hashed password stored in the database
    bcrypt.compare(password, checkUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords", error: err });
      }

      // If passwords do not match, send a response indicating wrong credentials
      if (!result) {
        return res.status(401).json({ message: "Wrong credentials" });
      }

      // Log the result of the password comparison
      console.log("Password match result:", result);

      // If passwords match, generate JWT token
      const token = jwt.sign(
        { email: checkUser.email }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiration time
      );

      // Set token as an HTTP-only cookie
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });

      // Send success response with token
      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
      });
    });
  } catch (error) {
    // Handle server errors
    return res.status(500).json({ message: "Server error", error });
  }
});

// Route to check cookies (optional)
router.get("/check-cookie", (req, res) => {
  // Log cookies from the request object
  res.json({ cookies: req.cookies });
});

module.exports = router;
