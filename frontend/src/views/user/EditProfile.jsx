import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const [initialEmail, setInitialEmail] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFormData({
        username: storedUser.name || storedUser.username || '',
        email: storedUser.email || ''
      });
      setInitialEmail(storedUser.email || '');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== initialEmail) {
      try {
        await axios.post('http://localhost:5000/api/user/send-email-otp', {
          emailToSend: initialEmail,
          newEmail: formData.email
        });

        navigate('/verify-email-otp', {
          state: {
            oldEmail: initialEmail,
            newEmail: formData.email,
            username: formData.username,
            isEmailChange: true
          }
        });
      } catch (error) {
        navigate('/verify-email-otp', {
          state: {
            oldEmail: initialEmail,
            newEmail: formData.email,
            username: formData.username
          }
        });
      }
    } else {
      const updatedUser = {
        name: formData.username,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated successfully!');
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('googleToken');
    navigate('/login');
  };

  return (
    <div className="edit-profile-wrapper">
      {/* Main Account Area */}
      <div className="account-container">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <h3 className="sidebar-title">My Account</h3>
          <ul className="sidebar-menu">
            <li className="active">
              <Link to="/profile">👤 Personal Information</Link>
            </li>
            <li>
              <Link to="/manage-address">📍 Address</Link>
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

        {/* Content Box */}
        <section className="account-content">
          <div className="content-card">
            <h2 className="content-title">Edit Personal Information</h2>

            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="rounded-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-input"
                  required
                />
                <small className="email-note">
                  * Changing email requires OTP verification on registered email
                </small>
              </div>

              <div className="form-action">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;


