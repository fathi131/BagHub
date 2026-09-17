import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddAddress.css'; 

const EditAddress = () => {
  
  const [addressData, setAddressData] = useState({
    houseName: 'Green Villa',
    locality: 'MG Road',
    city: 'Kochi',
    state: 'Kerala',
    country: 'India',
    pincode: '682001'
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
    console.log('Updated Address:', addressData);
    alert('Address updated successfully!');
    navigate('/manage-address');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="account-page">
      <header className="auth-navbar">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact Us</a>
          <a href="#about">About Us</a>
        </nav>
        <div className="logo"><span>🎒 BagHub</span></div>
        <div className="nav-icons"><span>🛒</span><span>👤</span><span>❤️</span></div>
      </header>

      <main className="account-wrapper">
        <div className="account-container">
          <aside className="account-sidebar">
            <h3 className="sidebar-title">My Account</h3>
            <ul className="sidebar-menu">
              <li><Link to="/profile">👤 Personal Information</Link></li>
              <li className="active"><Link to="/manage-address">📱 Address</Link></li>
              <li><Link to="/orders">📦 Order</Link></li>
              <li><Link to="/wallet">💳 Wallet</Link></li>
              <li><Link to="/coupons">🎟️ Coupon</Link></li>
              <li><Link to="/referral">🎁 Referral Program</Link></li>
              <li><Link to="/password-change">🔑 Password Change</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">🔄 Logout</button></li>
            </ul>
          </aside>

          <section className="account-content">
            <div className="content-card">
              <h2 className="content-title">Edit Address</h2>

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
                    Update Address
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-logo"><h2>🎒 BagHub</h2></div>
        <div className="footer-bottom"><p>© 2026 baghub . All Rights Reserved.</p></div>
      </footer>
    </div>
  );
};

export default EditAddress;