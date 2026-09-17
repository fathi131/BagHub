const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // bcrypt ഇമ്പോർട്ട് ചെയ്യുന്നു

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === 'admin@baghub.com' && password === 'admin123') {
      return res.status(200).json({
        message: 'Admin login successful',
        token: 'admin-secret-token'
      });
    }

    
    const user = await User.findOne({ email });
    if (!user || !user.isAdmin) {
      return res.status(400).json({ message: 'Invalid Admin Credentials!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Admin Credentials!' });
    }

    res.status(200).json({
      message: 'Admin login successful',
      token: 'admin-secret-token',
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 1. Fetch Users (Search, Pagination, Sorting)
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';

    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    };

    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments(searchQuery);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 2. Add New User (Bcrypt Password Hashing ഉൾപ്പെടുത്തിയിട്ടുണ്ട്)
const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 3. Toggle Block / Unblock User
const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked },
      { new: true }
    );

    res.status(200).json({ message: 'User status updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// All functions exported properly
module.exports = {
  adminLogin, // 👈 Export list-ൽ ആഡ് ചെയ്തു
  getUsers,
  createUser,
  toggleBlockUser
};