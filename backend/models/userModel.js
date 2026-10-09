const mongoose = require('mongoose');

// 1. Separate Sub-Schema for Addresses
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
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
    phone: { type: String, default: '' },
    password: { type: String },
    profileImage: { type: String, default: '' },
    referralCode: { type: String, unique: true, sparse: true, trim: true },
    pendingReferredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    referralRewardEarned: { type: Boolean, default: false },
    referralRewardAmount: { type: Number, default: 0 },
    referralRewardedAt: { type: Date, default: null },
    
    role: { type: String, default: 'user' },
    isAdmin: { type: Boolean, default: false },

    // Address Array
    addresses: [addressSchema],

    walletBalance: { type: Number, default: 0 },
    walletTransactions: [
      {
        type: { type: String, default: 'credit' },
        amount: { type: Number, default: 0 },
        reason: { type: String, default: '' },
        orderId: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now }
      }
    ],

    // 🔴 ADDED: Wishlist Array (Product IDs Reference)
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // നിന്റെ Product Model Name 'Product' തന്നെയാണെന്ന് ഉറപ്പുവരുത്തുക
      }
    ],

    // Account Status & Block Controls
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

    // Single Sign-On (SSO) IDs
    googleId: { type: String, default: null },
    facebookId: { type: String, default: null },

    // OTP verification & Forgot Password fields
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    pendingEmail: { type: String, default: null },
    emailChangeOtp: { type: String, default: null },
    emailChangeOtpExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordOtpExpires: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);