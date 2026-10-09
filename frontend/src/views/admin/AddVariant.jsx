import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import './AddVariant.css';

const AddVariant = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [colourSize, setColourSize] = useState('');
  const [price, setPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      colourSize,
      price,
      stockStatus,
      imagesCount: selectedImages.length,
    });
    // Save ചെയ്ത ശേഷം Products പട്ടികയിലേക്ക് തിരികെ പോകുന്നു
    navigate('/admin/products');
  };

  return (
    <div className="add-variant-container">
      <h1 className="add-variant-title">Products Varients</h1>
      <h2 className="add-variant-subtitle">Add Product Varients</h2>

      <form onSubmit={handleSubmit} className="add-variant-form">
        <div className="form-group-variant">
          <label>Colour/Size</label>
          <input
            type="text"
            placeholder="Select Variant Type (e.g., Red, Blue, 32L) V"
            value={colourSize}
            onChange={(e) => setColourSize(e.target.value)}
            className="variant-input"
            required
          />
        </div>

        <div className="form-group-variant">
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="variant-input"
            required
          />
        </div>

        <div className="form-group-variant">
          <label>Stock status</label>
          <input
            type="number"
            placeholder="Stock status"
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
            className="variant-input"
            required
          />
        </div>

        <div className="form-group-variant">
          <label>Images</label>
          <div
            className="image-upload-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <ImageIcon size={18} color="#888" />
            <span>
              {selectedImages.length > 0
                ? `${selectedImages.length} Image(s) selected`
                : 'Choose product images'}
            </span>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden-file-input"
          />
        </div>

        <button type="submit" className="btn-save-variant">
          Save Varient
        </button>
      </form>
    </div>
  );
};

export default AddVariant;