import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Skybags Klik Daypack',
      oldPrice: '₹999',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
    },
    {
      id: 2,
      name: 'Safari Omega Spacious',
      oldPrice: '₹999',
      price: '₹799',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400'
    },
    {
      id: 3,
      name: 'Gear Vintage2',
      oldPrice: '₹999',
      price: '₹895',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=400'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Adventure Awaits with<br />Premium Backpacks</h1>
          <p>
            Discover our collection of durable, stylish, and<br />
            functional backpacks designed for every<br />
            journey.<br />
            From urban commutes to mountain adventures.
          </p>
          <button className="know-more-btn">know more</button>
        </div>
        <div className="hero-image-container">
          <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" alt="Safari Premium Backpack" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">
                <span className="old-price">{product.oldPrice}</span> {product.price}
              </p>
            </div>
          ))}
          <div className="see-more-wrapper">
            <button className="see-more-btn">
              See more →
            </button>
          </div>
        </div>
      </section>

      {/* Shop Your Favourites Section */}
      <section className="section-container">
        <h2 className="section-title">Shop Your Favourites</h2>
        <div className="favourites-grid">
          <div className="fav-card fav-large">
            <img src="https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400" alt="Model with Backpack" />
          </div>
          <div className="fav-column">
            <div className="fav-card fav-small">
              <img src="https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400" alt="Collection on display" />
            </div>
            <div className="fav-card fav-small">
              <img src="https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=400" alt="Patterned Backpacks" />
            </div>
          </div>
          <div className="fav-card fav-large relative">
            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" alt="Woman with Green Backpack" />
            <button className="arrow-next-btn">
              →
            </button>
          </div>
        </div>
      </section>

      {/* Hand Picked Section */}
      <section className="section-container">
        <h2 className="section-title">Hand Picked</h2>
        <p className="section-subtitle">
          Discover our hand-picked collection, featuring backpacks chosen for their quality,<br />
          style, and timeless appeal.
        </p>
        <div className="handpicked-grid">
          <div className="handpicked-card">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" alt="Leather Backpack" />
          </div>
          <div className="handpicked-card">
            <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" alt="Luxury Handbags" />
          </div>
          <div className="handpicked-card">
            <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400" alt="Pink Travel Backpack" />
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
          ))}
          <div className="see-more-wrapper">
            <button className="see-more-btn">
              See more →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;