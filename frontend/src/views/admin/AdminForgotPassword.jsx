import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminAuth.css';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/admin/verify-otp', { state: { email } });
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-container">
        <div className="admin-card-border">
          <h2 className="admin-auth-title">Forgot Password</h2>
          
          <form onSubmit={handleSubmit} className="admin-auth-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="admin-black-btn">
                Send OTP
              </button>
              <Link to="/admin/login" className="admin-login-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <footer className="admin-auth-footer">
        © 2026 baghub . All Rights Reserved.
      </footer>
    </div>
  );
};

export default AdminForgotPassword;