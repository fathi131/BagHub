import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email === 'admin@baghub.com' && credentials.password === 'admin123') {
      alert('Admin Login Successful!');
      navigate('/admin/users');
    } else {
      alert('Invalid Admin Credentials!');
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Brand Header Logo */}
      <div className="admin-brand-logo">
        <span className="bag-icon">🛍️</span>
        <span className="brand-title">BagHub</span>
      </div>

      {/* Login Card */}
      <div className="admin-login-card">
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot-password-link">
            <Link to="/admin/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>

      {/* Footer Copyright */}
      <footer className="admin-login-footer">
        <p>© 2026 baghub . All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;