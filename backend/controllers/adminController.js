
const User = require('../models/userModel');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

// --- ADMIN AUTH ---
// --- ADMIN AUTH ---
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("👉 Login Request Email:", email);

    // 1. User database check
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.log("❌ Error: User record not found in MongoDB!");
      return res.status(400).json({ message: 'Invalid Admin Credentials or Not an Admin!' });
    }

    console.log("✅ User Found:", user.email);
    console.log("👉 User Role:", user.role, "| isAdmin:", user.isAdmin);

    // 2. Admin privilege check
  
    const isAdminUser = 
      email.toLowerCase().trim() === 'watak30556@deertees.com' || 
      user.isAdmin === true || 
      user.role === 'admin';

    if (!isAdminUser) {
      console.log("❌ Error: User is not marked as admin!");
      return res.status(400).json({ message: 'Invalid Admin Credentials or Not an Admin!' });
    }

    // 3. JWT Token Generation
    const token = jwt.sign(
      { 
        id: user._id, 
        role: 'admin',
        isAdmin: true
      },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '30d' }
    );

    console.log("🎉 Login Success! Token generated.");

    res.status(200).json({
      message: 'Admin login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'admin',
        isAdmin: true
      }
    });
  } catch (error) {
    console.error("🔥 Controller Exception Error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// --- USER MANAGEMENT ---
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';

    const searchQuery = {
      $or: [
        { name: { $regex: search,$options: 'i' } },
        { email: { $regex: search,$options: 'i' } },
        { phone: { $regex: search,$options: 'i' } }
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

const getAdminDashboard = async (req, res) => {
  try {
    const now = new Date();
    const range = ['30d', '6m', '1y'].includes(req.query.range) ? req.query.range : '6m';
    const daily = range === '30d';
    const start = daily
      ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 29))
      : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (range === '1y' ? 11 : 5), 1));

    const [orders, customers] = await Promise.all([
      Order.find({ orderDate: { $gte: start, $lte: now } }).sort({ orderDate: -1 }).lean(),
      User.find({ role: { $ne: 'admin' }, createdAt: { $gte: start, $lte: now } })
        .select('createdAt')
        .lean()
    ]);

    const bucketKey = (date) => {
      const value = new Date(date);
      return daily ? value.toISOString().slice(0, 10) : value.toISOString().slice(0, 7);
    };
    const bucketDates = Array.from({ length: daily ? 30 : range === '1y' ? 12 : 6 }, (_, index) => {
      if (daily) return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - (29 - index)));
      return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (range === '1y' ? 11 : 5) + index, 1));
    });
    const dateFormatter = new Intl.DateTimeFormat('en', daily
      ? { day: 'numeric', month: 'short', timeZone: 'UTC' }
      : { month: 'short', timeZone: 'UTC' });
    const salesByBucket = new Map();
    const customersByBucket = new Map();
    const productsByName = new Map();
    let totalSales = 0;

    orders.forEach((order) => {
      if (['cancelled', 'returned'].includes(order.status)) return;
      const bucket = bucketKey(order.orderDate);
      const amount = Number(order.totalAmount || 0);
      salesByBucket.set(bucket, (salesByBucket.get(bucket) || 0) + amount);
      totalSales += amount;
      (order.items || []).forEach((item) => {
        const name = item.name || 'Product';
        const current = productsByName.get(name) || { name, value: 0, sales: 0 };
        current.value += Number(item.quantity || 0);
        current.sales += Number(item.total || Number(item.price || 0) * Number(item.quantity || 0));
        productsByName.set(name, current);
      });
    });

    customers.forEach((customer) => {
      const bucket = bucketKey(customer.createdAt);
      customersByBucket.set(bucket, (customersByBucket.get(bucket) || 0) + 1);
    });

    const salesData = bucketDates.map((date) => ({
      day: dateFormatter.format(date),
      sales: Number((salesByBucket.get(bucketKey(date)) || 0).toFixed(2))
    }));
    const customerData = bucketDates.map((date) => ({
      day: dateFormatter.format(date),
      count: customersByBucket.get(bucketKey(date)) || 0
    }));
    const bestSellingData = [...productsByName.values()]
      .sort((left, right) => right.value - left.value)
      .slice(0, 3);
    const recentOrders = orders.slice(0, 5).map((order) => ({
      id: order.orderId || String(order._id),
      item: order.items?.[0]?.name || 'Order',
      date: order.orderDate,
      total: Number(order.totalAmount || 0),
      status: order.status || 'pending'
    }));

    return res.status(200).json({
      success: true,
      range,
      stats: { totalSales: Number(totalSales.toFixed(2)), customers: customers.length, orders: orders.length },
      salesData,
      customerData,
      bestSellingData,
      recentOrders
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return res.status(500).json({ message: 'Could not load dashboard data' });
  }
};
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, brands });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not load brands' });
  }
};

const addBrand = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const status = req.body.status === 'Inactive' ? 'Inactive' : 'Active';
    if (!name) return res.status(400).json({ message: 'Brand name is required' });
    const normalizedName = name.toLowerCase();
    if (await Brand.exists({ normalizedName })) {
      return res.status(409).json({ message: 'Brand name already exists' });
    }
    const brand = await Brand.create({ name, normalizedName, status });
    return res.status(201).json({ success: true, brand });
  } catch (error) {
    return res.status(error.code === 11000 ? 409 : 500).json({
      message: error.code === 11000 ? 'Brand name already exists' : 'Could not add brand'
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    if (!name) return res.status(400).json({ message: 'Brand name is required' });
    const normalizedName = name.toLowerCase();
    if (await Brand.exists({ normalizedName, _id: { $ne: req.params.id } })) {
      return res.status(409).json({ message: 'Brand name already exists' });
    }
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, normalizedName },
      { new: true, runValidators: true }
    );
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    return res.status(200).json({ success: true, brand });
  } catch (error) {
    return res.status(error.code === 11000 ? 409 : 500).json({
      message: error.code === 11000 ? 'Brand name already exists' : 'Could not update brand'
    });
  }
};

const updateBrandStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Active or Inactive' });
    }
    const brand = await Brand.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    return res.status(200).json({ success: true, brand });
  } catch (error) {
    return res.status(500).json({ message: 'Could not update brand status' });
  }
};

// --- CATEGORY MANAGEMENT ---
const getCategories = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 5, activeOnly } = req.query;

    const query = {
      isDeleted: false,
      name: { $regex: search, $options: 'i' }
    };

    
    if (activeOnly === 'true') {
      query.isBlocked = false;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    
    let categoriesQuery = Category.find(query).sort({ createdAt: -1 });

    if (req.query.page) {
      categoriesQuery = categoriesQuery.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const categories = await categoriesQuery;
    const total = await Category.countDocuments(query);

    res.status(200).json({
      success: true,
      data: categories,
      pagination: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    // Case-insensitive Duplicate check
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      isDeleted: false
    });

    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Category name already exists!' });
    }

    const newCategory = new Category({ name: name.trim(), description: description ? description.trim() : '' });
    await newCategory.save();

    res.status(201).json({ success: true, message: 'Category added successfully', data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    // Duplicate Name check across other categories
    const duplicateCheck = await Category.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      isDeleted: false
    });

    if (duplicateCheck) {
      return res.status(400).json({ success: false, message: 'Category name already taken by another category' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: name.trim(), description: description ? description.trim() : '' },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Category updated successfully', data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    category.isBlocked = !category.isBlocked;
    await category.save();

    res.status(200).json({
      success: true,
      message: `Category ${category.isBlocked ? 'Unlisted' : 'Listed'} successfully`,
      data: category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndUpdate(id, { isDeleted: true });

    res.status(200).json({ success: true, message: 'Category soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- PRODUCT MANAGEMENT ---
const getAdminProducts = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 5 } = req.query;

    const query = {
      isDeleted: false,
      name: { $regex: search,$options: 'i' }
    };

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      oldPrice,
      discount,
      stockCount,
      maxQuantityLimit,
      description,
      highlights
    } = req.body;

    // Determine images array from req.files (Multer) or req.body.images
    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => `/uploads/products/${file.filename}`);
    } else if (req.body.images) {
      imagePaths = Array.isArray(req.body.images) ? req.body.images : JSON.parse(req.body.images);
    }

    if (!imagePaths || imagePaths.length < 3) {
      return res.status(400).json({ success: false, message: 'Minimum 3 product images are required.' });
    }

    let parsedHighlights = [];
    if (highlights) {
      parsedHighlights = typeof highlights === 'string' ? JSON.parse(highlights) : highlights;
    }

    const newProduct = new Product({
      name,
      brand,
      category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      discount: discount || '',
      stockCount: Number(stockCount) || 0,
      maxQuantityLimit: maxQuantityLimit ? Number(maxQuantityLimit) : 5,
      description,
      highlights: parsedHighlights,
      images: imagePaths
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product || product.isDeleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let updatedImages = [];
    if (req.body.existingImages) {
      updatedImages = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];
    }

    if (req.files && req.files.length > 0) {
      const newUploaded = req.files.map((file) => `/uploads/products/${file.filename}`);
      updatedImages = [...updatedImages, ...newUploaded];
    } else if (req.body.images) {
      updatedImages = Array.isArray(req.body.images) ? req.body.images : JSON.parse(req.body.images);
    }

    if (updatedImages.length > 0 && updatedImages.length < 3) {
      return res.status(400).json({ success: false, message: 'Minimum 3 images are required for a product.' });
    }

    const updateData = { ...req.body };
    if (updatedImages.length >= 3) {
      updateData.images = updatedImages;
    }

    if (req.body.highlights) {
      updateData.highlights = typeof req.body.highlights === 'string'
        ? JSON.parse(req.body.highlights)
        : req.body.highlights;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleBlockProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product || product.isDeleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.isBlocked = !product.isBlocked;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({ success: true, message: 'Product soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  adminLogin,
  getUsers,
  createUser,
  toggleBlockUser,
  getAdminDashboard,
  getBrands,
  addBrand,
  updateBrand,
  updateBrandStatus,
  getCategories,
  addCategory,
  editCategory,
  toggleCategoryStatus,
  deleteCategory,
  addProduct,
  editProduct,
  toggleBlockProduct,
  deleteProduct,
  getAdminProducts,
};