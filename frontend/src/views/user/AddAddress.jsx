import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddAddress.css';

const AddAddress = () => {
  const [addressData, setAddressData] = useState({
    houseName: '',
    locality: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Address Added:', addressData);
    alert('Address added successfully!');
    navigate('/manage-address');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="account-page">
      {/* Header */}
      <header className="auth-navbar">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact Us</a>
          <a href="#about">About Us</a>
        </nav>

        <div className="logo">
          <span>🎒 BagHub</span>
        </div>

        <div className="nav-icons">
          <span>🛒</span>
          <span>👤</span>
          <span>❤️</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="account-wrapper">
        <div className="account-container">
          
          {/* Left Sidebar */}
          <aside className="account-sidebar">
            <h3 className="sidebar-title">My Account</h3>
            <ul className="sidebar-menu">
              <li>
                <Link to="/profile">👤 Personal Information</Link>
              </li>
              <li className="active">
                <Link to="/manage-address">📱 Address</Link>
              </li>
              <li>
                <Link to="/orders">📦 Order</Link>
              </li>
              <li>
                <Link to="/wallet">💳 Wallet</Link>
              </li>
              <li>
                <Link to="/coupons">🎟️ Coupon</Link>
              </li>
              <li>
                <Link to="/referral">🎁 Referral Program</Link>
              </li>
              <li>
                <Link to="/password-change">🔑 Password Change</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  🔄 Logout
                </button>
              </li>
            </ul>
          </aside>

          {/* Right Main Content Form */}
          <section className="account-content">
            <div className="content-card">
              <h2 className="content-title">Add New Address</h2>

              <form onSubmit={handleSubmit} className="add-address-form">
                <div className="form-group">
                  <label htmlFor="houseName">House Name</label>
                  <input
                    type="text"
                    id="houseName"
                    name="houseName"
                    value={addressData.houseName}
                    onChange={handleChange}
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="locality">Locality/Street</label>
                  <input
                    type="text"
                    id="locality"
                    name="locality"
                    value={addressData.locality}
                    onChange={handleChange}
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">Town/City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={addressData.city}
                    onChange={handleChange}
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={addressData.state}
                      onChange={handleChange}
                      className="account-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={addressData.country}
                      onChange={handleChange}
                      className="account-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={addressData.pincode}
                    onChange={handleChange}
                    className="account-input"
                    required
                  />
                </div>

                <div className="form-action">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <h2>🎒 BagHub</h2>
        </div>
        <div className="footer-content">
          <div className="footer-col">
            <h4>SHOP</h4>
            <ul>
              <li><a href="#indoor">Indoor Plants</a></li>
              <li><a href="#outdoor">Outdoor Plants</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#status">Order Status</a></li>
              <li><a href="#support">Product Support</a></li>
              <li><a href="#shipping">Shipping & Return Policy</a></li>
              <li><a href="#complaint">Complaint Registration</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of use</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p><strong>Email :</strong> baghub@gmail.com</p>
            <p><strong>Phone :</strong> +91 8888888888</p>
          </div>
          <div className="footer-col">
            <h4>Connect with us</h4>
            <div className="social-icons">
              <span>📷</span>
              <span>📘</span>
              <span>🐦</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 baghub . All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AddAddress;