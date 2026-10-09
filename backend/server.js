require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Custom Middlewares Import
const errorHandler = require('./middlewares/errorHandler');

const app = express();
connectDB();


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite / React Port
  credentials: true
}));

// 2. Body Parser Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Serve Uploaded Files Statically
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// 4. MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/baghub';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// 5. Routes Import and Use
const adminRoutes = require('./routes/adminRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/user', userAuthRoutes);

// 6. Global Error Handler Middleware
app.use(errorHandler);

// 7. Server Listening Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});