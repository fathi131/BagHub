import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Adventure Awaits with<br />Premium Backpacks</h1>
          <p>
            Discover our collection of durable, stylish, and<br />
            functional backpacks designed for every journey.<br />
            From urban commutes to mountain adventures.
          </p>
          <button className="know-more-btn">know more</button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" alt="Premium Backpack" />
        </div>
      </section>

      {/* Dark Green Accent Strip */}
      <div className="green-accent-strip"></div>

      {/* 2. Featured Products Section */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" alt="Skybags Klik Daypack" />
            <h3>Skybags Klik Daypack</h3>
            <p className="price"><span className="old-price">₹999</span> ₹599</p>
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400" alt="Safari Omega Spacious" />
            <h3>Safari Omega Spacious</h3>
            <p className="price"><span className="old-price">₹999</span> ₹799</p>
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=400" alt="Gear Vintage2" />
            <h3>Gear Vintage2</h3>
            <p className="price"><span className="old-price">₹999</span> ₹895</p>
          </div>
          <div className="see-more-card">
            <button className="see-more-btn">See more &rarr;</button>
          </div>
        </div>
      </section>

      {/* 3. Shop Your Favourites Section */}
      <section className="favourites-section">
        <h2>Shop Your Favourites</h2>
        <div className="favourites-grid">
          <img src="https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400" alt="Favourite 1" />
          <img src="https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400" alt="Favourite 2" />
          <img src="https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=400" alt="Favourite 3" />
        </div>
      </section>

      {/* 4. Hand Picked Section */}
      <section className="handpicked-section">
        <h2>Hand Picked</h2>
        <p className="sub-title">Discover our hand-picked collection, featuring backpacks chosen for their quality, style, and timeless appeal.</p>
        <div className="handpicked-grid">
          <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" alt="Hand picked 1" />
          <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" alt="Hand picked 2" />
          <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400" alt="Hand picked 3" />
        </div>
      </section>

      {/* 5. Trending Now Section */}
      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" alt="Trending Bag 1" />
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400" alt="Trending Bag 2" />
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=400" alt="Trending Bag 3" />
          </div>
          <div className="see-more-card">
            <button className="see-more-btn">See more &rarr;</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;