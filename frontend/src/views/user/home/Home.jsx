import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [handpickedProducts, setHandpickedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [heroProduct, setHeroProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchHomeSections = async () => {
      try {
        // Puthiya Dynamic Backend API Call
        const res = await axios.get(`${BASE_URL}/api/user/home-sections`);
        
        if (res.data?.success) {
          const { trendingNow, featuredProducts, handPicked } = res.data.data;

          setFeaturedProducts(featuredProducts || []);
          setHandpickedProducts(handPicked || []);
          setTrendingProducts(trendingNow || []);

          // Hero product aayi Featured Products-ile adhyathe item set cheyyunnu
          if (featuredProducts && featuredProducts.length > 0) {
            setHeroProduct(featuredProducts[0]);
          } else if (trendingNow && trendingNow.length > 0) {
            setHeroProduct(trendingNow[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching home page sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeSections();
  }, []);

  // Image URL Handler
  const getImageUrl = (product) => {
    const imagePath = product?.images?.[0] || product?.image;

    if (!imagePath) return "https://via.placeholder.com/400x400?text=No+Image";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/uploads/${imagePath}`;
    return `${BASE_URL}${cleanPath}`;
  };

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Adventure Awaits with<br />Premium Backpacks</h1>
          <p>
            Discover our collection of durable, stylish, and<br />
            functional backpacks designed for every journey.
          </p>
          <Link to="/category" className="know-more-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            know more
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src={heroProduct ? getImageUrl(heroProduct) : "https://via.placeholder.com/500x500?text=Hero+Bag"} 
            alt={heroProduct?.name || "Hero Backpack"} 
          />
        </div>
      </section>

      <div className="green-accent-strip"></div>

      {/* 2. Featured Products Section */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : featuredProducts.length === 0 ? (
            <p>No featured products available right now.</p>
          ) : (
            featuredProducts.slice(0, 3).map((product) => (
              <div className="product-card" key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img src={getImageUrl(product)} alt={product.name} />
                </Link>
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
              </div>
            ))
          )}
          <div className="see-more-card">
            <Link to="/category" className="see-more-btn">See more &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 3. Hand Picked Section */}
      <section className="handpicked-section">
        <h2>Hand Picked</h2>
        <p className="sub-title">Discover our hand-picked collection chosen for quality and style.</p>
        <div className="handpicked-grid">
          {loading ? (
            <p>Loading handpicked products...</p>
          ) : handpickedProducts.length === 0 ? (
            <p>No handpicked products available.</p>
          ) : (
            handpickedProducts.slice(0, 3).map((product) => (
              <div key={product._id} className="handpicked-card">
                <Link to={`/product/${product._id}`}>
                  <img src={getImageUrl(product)} alt={product.name} />
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Trending Now Section */}
      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="product-grid">
          {loading ? (
            <p>Loading trending products...</p>
          ) : trendingProducts.length === 0 ? (
            <p>No trending products available right now.</p>
          ) : (
            trendingProducts.slice(0, 3).map((product) => (
              <div className="product-card" key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img src={getImageUrl(product)} alt={product.name} />
                </Link>
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
              </div>
            ))
          )}
          <div className="see-more-card">
            <Link to="/category" className="see-more-btn">See more &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;