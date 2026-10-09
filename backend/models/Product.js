const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: String },
    stockCount: { type: Number, required: true, default: 0 },
    maxQuantityLimit: { type: Number, default: 5 },
    images: [{ type: String, required: true }], // Image URLs (Minimum 3 required)
    description: { type: String, trim: true },
    highlights: [{ type: String }],
    isBlocked: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false } // Soft delete flag
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);