const mongoose = require('mongoose');

// 1. Separate Sub-Schema for Addresses
const addressSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

// 2. Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImage: { type: String, default: '' },
    
    // Address Array
    addresses: [addressSchema],

    // Account Status & Block Controls
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

    // Single Sign-On (SSO) IDs
    googleId: { type: String, default: null },
    facebookId: { type: String, default: null },

    // OTP verification & Forgot Password fields
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);