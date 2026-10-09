const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // Multer Upload Middleware
const { isAdmin } = require('../middlewares/authMiddleware'); // Admin Auth Middleware

const {
  adminLogin,
  getUsers,
  createUser,
  toggleBlockUser,
  getCategories,
  addCategory,
  editCategory,
  toggleCategoryStatus,
  deleteCategory,
  getAdminProducts,
  addProduct,
  editProduct,
  toggleBlockProduct,
  deleteProduct,
  getAdminDashboard,
  getBrands,
  addBrand,
  updateBrand,
  updateBrandStatus,
} = require('../controllers/adminController');
const { getAllOrders, getAdminOrderById, updateOrderStatus } = require('../controllers/orderController');
const { getSalesReport } = require('../controllers/salesController');
const { listOffers, createOffer, updateOffer, updateOfferStatus, deleteOffer, getOfferSummary } = require('../controllers/offerController');
const { listCoupons, createCoupon, deleteCoupon } = require('../controllers/couponController');
const { getBanner, updateBannerContent, uploadBannerImage, removeBanner } = require('../controllers/bannerController');
const { bannerImageUpload } = require('../middlewares/uploadMiddleware');

// --- ADMIN AUTH ---
router.post('/login', adminLogin);

// --- USER MANAGEMENT ---
router.get('/users', isAdmin, getUsers);
router.post('/users', isAdmin, createUser);
router.patch('/users/:id/block', isAdmin, toggleBlockUser);

// --- CATEGORY MANAGEMENT ---
router.get('/categories', getCategories);
router.post('/add-category', upload.none(),addCategory);
router.put('/categories/:id', isAdmin, editCategory);
router.patch('/categories/toggle-status/:id', isAdmin, toggleCategoryStatus);
router.patch('/categories/:id/delete', isAdmin, deleteCategory);

// --- PRODUCT MANAGEMENT ---
router.get('/products', isAdmin, getAdminProducts);
router.post('/products', isAdmin, upload.array('images', 4), addProduct);
router.put('/products/:id', isAdmin, upload.array('images', 4), editProduct);
router.patch('/products/toggle-status/:id', isAdmin, toggleBlockProduct);
router.patch('/products/:id/delete', isAdmin, deleteProduct);

router.get('/dashboard', isAdmin, getAdminDashboard);
router.get('/banner', isAdmin, getBanner);
router.put('/banner', isAdmin, updateBannerContent);
router.post('/banner/upload', isAdmin, bannerImageUpload.single('bannerImage'), uploadBannerImage);
router.delete('/banner', isAdmin, removeBanner);
router.get('/brands', isAdmin, getBrands);
router.post('/brands', isAdmin, addBrand);
router.put('/brands/:id', isAdmin, updateBrand);
router.patch('/brands/:id/status', isAdmin, updateBrandStatus);
router.get('/orders', isAdmin, getAllOrders);
router.get('/orders/:id', isAdmin, getAdminOrderById);
router.patch('/orders/:id/status', isAdmin, updateOrderStatus);
router.get('/sales/report', isAdmin, getSalesReport);

router.get('/offers', isAdmin, listOffers);
router.post('/offers', isAdmin, createOffer);
router.put('/offers/:id', isAdmin, updateOffer);
router.patch('/offers/:id/status', isAdmin, updateOfferStatus);
router.delete('/offers/:id', isAdmin, deleteOffer);
router.get('/offers/summary', isAdmin, getOfferSummary);

router.get('/coupons', isAdmin, listCoupons);
router.post('/coupons', isAdmin, createCoupon);
router.delete('/coupons/:id', isAdmin, deleteCoupon);

module.exports = router;