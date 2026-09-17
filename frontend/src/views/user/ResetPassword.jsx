import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password Reset Successful:', formData.password);
    navigate('/login');
  };

  return (
    <div className="reset-page">
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

      <main className="reset-wrapper">
        <div className="reset-card">
          <h2 className="reset-title">Reset Password</h2>

          <form onSubmit={handleSubmit} className="reset-form">
            <input
              type="password"
              name="password"
              placeholder="Enter New Password"
              value={formData.password}
              onChange={handleChange}
              className="reset-input"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="reset-input"
              required
            />

            <div className="reset-action-row">
              <button type="submit" className="submit-btn">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-logo"><h2>🎒 BagHub</h2></div>
        <div className="footer-bottom"><p>© 2026 baghub . All Rights Reserved.</p></div>
      </footer>
    </div>
  );
};

export default ResetPassword;