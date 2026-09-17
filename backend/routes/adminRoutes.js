const express = require('express');
const router = express.Router();
const { getUsers, createUser, toggleBlockUser } = require('../controllers/adminController');

// Routes mapping
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/:id/block', toggleBlockUser);

module.exports = router;