const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// 1. Signup (Generates 4-digit OTP)
const signup = async (req, res) => {
  try {
    const { name, email, password, phone="" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: 'Email already registered. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 60 * 1000); // 60 Seconds Timer

    if (!user) {
      user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        otp,
        otpExpires
      });
    } else {
      user.name = name;
      user.phone = phone;
      user.password = hashedPassword;
      user.otp = otp;
      user.otpExpires = otpExpires;
    }

    await user.save();

    // Wrap email dispatch in try-catch so failed emails don't break database state
    try {
      await sendEmail(email, 'BagHub Verification Code', `Your OTP for signup is: ${otp}`);
    } catch (emailErr) {
      console.error('Nodemailer failed:', emailErr.message);
      // Return 200 with fallback notice for smooth frontend handling
      return res.status(200).json({ 
        message: 'Signup initiated, but failed to send OTP email. Please click Resend OTP.',
        email 
      });
    }

    res.status(200).json({ message: 'OTP sent to your email', email });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 🔑 2. Login (Added & Fixed)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    // Check if account is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email via OTP before logging in.' });
    }

    // Check if user is blocked by admin
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked by an administrator.' });
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '7d'
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 3. Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (String(user.otp).trim() !== String(otp).trim()) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please resend.' });
    }

    user.isVerified = true;
    user.otp = undefined; 
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '7d'
    });

    res.status(200).json({
      message: 'Account verified successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 4. Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    
    user.otp = newOtp;
    user.otpExpires = new Date(Date.now() + 60 * 1000);
    await user.save();

    await sendEmail(email, 'BagHub New OTP', `Your new OTP is: ${newOtp}`);

    res.status(200).json({ message: 'New OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 5. Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 മിനിറ്റ് കാലാവധി
    await user.save();

    
    try {
      await sendEmail(email, 'BagHub Reset Password OTP', `Your OTP for resetting password is: ${otp}`);
      return res.status(200).json({ message: 'OTP sent to your email successfully' });
    } catch (emailErr) {
      console.error('Nodemailer Error in Forgot Password:', emailErr.message);
      return res.status(500).json({ 
        message: 'Failed to send OTP email. Please check NodeMailer / SMTP settings.' 
      });
    }

  } catch (error) {
    console.error('Forgot Password Error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 6. Get User Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Dummy placeholders for remaining CRUD operations
const updateProfile = async (req, res) => {
  res.status(200).json({ message: 'Profile updated successfully' });
};

const changePassword = async (req, res) => {
  res.status(200).json({ message: 'Password changed successfully' });
};

const getAddresses = async (req, res) => { res.status(200).json({ addresses: [] }); };
const addAddress = async (req, res) => { res.status(201).json({ message: 'Address added' }); };
const updateAddress = async (req, res) => { res.status(200).json({ message: 'Address updated' }); };
const deleteAddress = async (req, res) => { res.status(200).json({ message: 'Address deleted' }); };

module.exports = { 
  signup,
  login, 
  verifyOTP, 
  resendOTP, 
  forgotPassword,
  getProfile,
  updateProfile,
  changePassword,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
};