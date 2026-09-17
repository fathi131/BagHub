import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAuth.css';

const AdminResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password reset successful!');
    navigate('/admin/login');
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-container">
        <div className="admin-card-border">
          <h2 className="admin-auth-title">Reset Password</h2>

          <form onSubmit={handleSubmit} className="admin-auth-form">
            <div className="input-group">
              <input
                type="password"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="admin-black-btn submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <footer className="admin-auth-footer">
        © 2026 baghub . All Rights Reserved.
      </footer>
    </div>
  );
};

export default AdminResetPassword;