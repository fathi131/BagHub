require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection (Database Name: baghub)
mongoose.connect('mongodb://127.0.0.1:27017/baghub')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Admin Routes import and use
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const userAuthRoutes=require('./routes/userAuthRoutes');
app.use('/api/user',userAuthRoutes);

// Server Listening Port
app.listen(5000, () => {
  console.log('Backend Server running on port 5000');
});