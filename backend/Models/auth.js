const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Role can be "user" or "admin"
  role: { type: String, enum: ["user", "admin"], default: "user" },

  // Tracks account creation and update times
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  // For account verification after sign-up
  isUserVerified: { type: Boolean, default: false }, // To mark if the user has verified their email
  
  // For email verification and password reset functionality
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // Account status: active, locked after failed login attempts, etc.
  accountStatus: { type: String, enum: ["active", "locked", "pending"], default: "pending" },

  // For tracking failed login attempts and temporarily locking the account
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },

  // For password reset feature
  passwordResetToken: String,
  passwordResetExpires: Date,

  // Track the user's last login time
  lastLogin: { type: Date },

  // Two-Factor Authentication fields (optional)
  twoFactorCode: String,
  twoFactorExpires: Date,
  isTwoFactorEnabled: { type: Boolean, default: false }
});

// Method to check if the account is locked
authSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

module.exports = mongoose.model("auth", authSchema);
