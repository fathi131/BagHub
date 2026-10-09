import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, ChevronRight, Tag } from 'lucide-react';
import API from '../../api/axios';
import './ProductDetails.css';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center' });

  const BASE_URL = 'http://localhost:5000';

  // Windows path slashes (\) fix cheyyanum full server URL aakkanumulla helper
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/500x500?text=No+Image';
    
    let cleanPath = String(imagePath).replace(/\\/g, '/');

    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
      return cleanPath;
    }

    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }

    if (!cleanPath.includes('/uploads/')) {
      cleanPath = `/uploads${cleanPath}`;
    }

    return `${BASE_URL}${cleanPath}`;
  };

  // 1. Fetch Product Details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/user/products/${id}`);
        const data = res.data?.data || res.data;
        
        setProduct(data);

        // Product image list setup cheyyunnu
        const imgList = data?.images?.length > 0 ? data.images : (data?.image ? [data.image] : []);
        if (imgList.length > 0) {
          setSelectedImage(imgList[0]);
        }

        if (data?.isInWishlist) {
          setIsInWishlist(true);
        }
      } catch (error) {
        console.error('Fetch Product Error:', error);
        alert(error.response?.data?.message || 'Product not found');
        navigate('/category');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id, navigate]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'increase' && quantity < (product?.stockCount || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) return;

    try {
      const productToBuy = {
        ...product,
        _id: product?._id || id,
        productId: product?._id || id,
        image: getImageUrl(selectedImage || product?.images?.[0] || product?.image),
        images: product?.images?.length ? product.images : (product?.image ? [product.image] : [])
      };

      await addToCart(productToBuy, quantity);

      navigate('/checkout', {
        state: {
          cartItems: [{
            _id: productToBuy._id,
            productId: productToBuy._id,
            name: productToBuy.name,
            price: Number(productToBuy.price || 0),
            quantity,
            image: productToBuy.image,
            images: productToBuy.images,
            stockCount: productToBuy.stockCount ?? 1
          }],
          subTotal: Number(productToBuy.price || 0) * quantity,
          grandTotal: Number(productToBuy.price || 0) * quantity
        }
      });
    } catch (error) {
      console.error('Buy now failed:', error);
    }
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;

    try {
      await addToCart(
        {
          ...product,
          _id: product?._id || id,
          productId: product?._id || id,
          image: getImageUrl(selectedImage || product?.images?.[0] || product?.image)
        },
        quantity
      );
      alert('Added to Cart!');
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await API.post('/user/wishlist/toggle', { productId: product._id || id });
      setIsInWishlist(!isInWishlist);
      alert(response.data?.message || 'Wishlist updated successfully!');
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Please log in to add items to your wishlist!');
      } else {
        alert(error.response?.data?.message || 'Failed to update wishlist');
      }
    }
  };

  if (loading) {
    return <div className="product-details-container" style={{ textAlign: 'center', padding: '50px' }}>Loading Product Details...</div>;
  }

  if (!product) return null;

  const isOutOfStock = product.stockCount <= 0;
  const imageList = product.images?.length > 0 ? product.images : (product.image ? [product.image] : []);

  return (
    <div className="product-details-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span className="breadcrumb-link" onClick={() => navigate('/')}>Home</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={() => navigate('/category')}>Shop</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={() => navigate('/category')}>{product.category?.name || product.category || 'Category'}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-active">{product.name}</span>
      </div>

      {/* Main Product Info */}
      <div className="product-details-main">
        {/* Left: Gallery with Zoom Effect */}
        <div className="product-gallery">
          <div className="thumbnail-list">
            {imageList.map((img, index) => (
              <img
                key={index}
                src={getImageUrl(img)}
                alt="thumb"
                className={`thumbnail-img ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="zoom-image-container" onMouseMove={handleMouseMove}>
            <img 
              src={getImageUrl(selectedImage || imageList[0])} 
              alt={product.name} 
              style={zoomStyle} 
            />
          </div>
        </div>

        {/* Right: Details, Stock & Actions */}
        <div className="product-info-section">
          <div className="product-title-header">
            <h1>{product.name}</h1>
            <button className="wishlist-btn-inline" onClick={handleAddToWishlist} title="Add to Wishlist">
              <Heart size={20} color={isInWishlist ? 'red' : 'currentColor'} fill={isInWishlist ? 'red' : 'none'} />
            </button>
          </div>

          <div className="price-container-detail">
            <span className="current-price-detail">₹{product.price}</span>
            {product.oldPrice && <span className="original-price-detail">₹{product.oldPrice}</span>}
            {product.discount && <span className="discount-badge">{product.discount}</span>}
          </div>

          {product.offer && (
            <section className="product-offer-banner" aria-label="Available offer">
              <Tag size={18} aria-hidden="true" />
              <div>
                <strong>{product.offer.name}</strong>
                <p>
                  {product.offer.discountType === 'fixed'
                    ? `₹${Number(product.offer.discountValue).toLocaleString('en-IN')} off`
                    : `${Number(product.offer.discountValue)}% off${product.offer.maxDiscount ? ` (up to ₹${Number(product.offer.maxDiscount).toLocaleString('en-IN')})` : ''}`}
                </p>
                {product.offer.description && <small>{product.offer.description}</small>}
                <small>Valid through {new Date(product.offer.expiryDate).toLocaleDateString('en-GB')}</small>
              </div>
            </section>
          )}

          {product.couponCode && (
            <div className="coupon-box">
              🏷️ Coupon: <strong>{product.couponCode}</strong>
            </div>
          )}

          <div className="rating-brand-info">
            <div>
              <span className="star-rating">★ {product.rating || 4.5}</span> | {product.reviewsCount || 0} Reviews
            </div>
            {product.brand && <div>Brand: <strong>{product.brand}</strong></div>}
          </div>

          {product.highlights?.length > 0 && (
            <div className="product-highlights">
              <h4>Product Highlights</h4>
              <ul>
                {product.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {isOutOfStock ? (
            <div className="out-of-stock-banner">
              ⚠️ Currently Out of Stock. This item is temporarily unavailable.
            </div>
          ) : (
            <div className="stock-status in-stock">
              ✓ In Stock ({product.stockCount} items left)
            </div>
          )}

          <div className="variant-selectors-row">
            <span>Qty:</span>
            <div className="quantity-controller">
              <button onClick={() => handleQuantityChange('decrease')} disabled={isOutOfStock || quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange('increase')} disabled={isOutOfStock || quantity >= (product.stockCount || 1)}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-group">
            <button 
              className="btn-buy-now" 
              disabled={isOutOfStock}
              onClick={handleBuyNow}
            >
              {isOutOfStock ? 'Sold Out' : 'Buy Now'}
            </button>
            
            <button 
              className="btn-add-cart" 
              disabled={isOutOfStock}
              onClick={handleAddToCart}
            >
              {isOutOfStock ? 'Unavailable' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;