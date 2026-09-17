const express = require('express');
const router = express.Router();
const { 
  signup, 
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
} = require('../controllers/userAuthController');

// 1. Auth Routes
router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);

// 2. User Profile Routes
// router.get('/profile', getProfile);
// router.put('/profile', updateProfile);
// router.patch('/change-password', changePassword);

// // 3. Address Management Routes (CRUD)
// router.get('/address', getAddresses);
// router.post('/address', addAddress);
// router.put('/address/:id', updateAddress);
// router.delete('/address/:id', deleteAddress);

module.exports = router;