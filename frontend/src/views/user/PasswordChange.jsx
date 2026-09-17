import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PasswordChange.css';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password updated successfully:', formData);
    alert('Password updated successfully!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <main className="account-wrapper">
      <div className="account-container">
        
        {/* Left Sidebar */}
        <aside className="account-sidebar">
          <h3 className="sidebar-title">My Account</h3>
          <ul className="sidebar-menu">
            <li>
              <Link to="/profile">👤 Personal Information</Link>
            </li>
            <li>
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
            <li className="active">
              <Link to="/password-change">🔑 Password Change</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                🔄 Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Right Content Form */}
        <section className="account-content">
          <div className="content-card">
            <h2 className="content-title">Password Change</h2>

            <form onSubmit={handleSubmit} className="password-change-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="account-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="account-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="account-input"
                  required
                />
              </div>

              <div className="form-action">
                <button type="submit" className="save-btn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </main>
  );
};

export default PasswordChange;