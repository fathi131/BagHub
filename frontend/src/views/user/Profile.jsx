import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('userInfo'));

    if (storedUser) {
      
      setUserData({
        name: storedUser.name || storedUser.username || '',
        email: storedUser.email || ''
      });

      // Optional: Backend-ൽ നിന്ന് പുതിയ ഡാറ്റ Fetch ചെയ്യണമെങ്കിൽ
      if (storedUser.email) {
        axios.get(`http://localhost:5000/api/user/profile?email=${storedUser.email}`)
          .then(res => {
            if (res.data) {
              setUserData({
                name: res.data.name || res.data.username,
                email: res.data.email
              });
            }
          })
          .catch(err => console.log('Error fetching user profile:', err));
      }
    }
  }, []);

  return (
    <div className="profile-page-wrapper">
      <main className="profile-page">
        <div className="profile-container">
          
          {/* Left Navigation Menu */}
          <div className="account-box">
            <h3 className="box-title">My Account</h3>
            <ul className="account-menu">
              <li className="active" onClick={() => navigate('/profile')}>
                <span className="icon">👤</span> Personal Information
              </li>
              <li onClick={() => navigate('/manage-address')}>
                <span className="icon">📍</span> Address
              </li>
              <li onClick={() => navigate('/orders')}>
                <span className="icon">📦</span> Order
              </li>
              <li onClick={() => navigate('/wallet')}>
                <span className="icon">💳</span> Wallet
              </li>
              <li onClick={() => navigate('/coupon')}>
                <span className="icon">🎟️</span> Coupon
              </li>
              <li onClick={() => navigate('/referral')}>
                <span className="icon">🎁</span> Referral Program
              </li>
              <li onClick={() => navigate('/password-change')}>
                <span className="icon">🔑</span> Password Change
              </li>
              <li onClick={() => navigate('/login')}>
                <span className="icon">🚪</span> Logout
              </li>
            </ul>
          </div>

          {/* Right Main Info Box */}
          <div className="info-box">
            <h3 className="box-title-center">Personal Information</h3>
            
            <form className="personal-info-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>username</label>
                <input 
                  type="text" 
                  value={userData.name} 
                  readOnly 
                  className="rounded-input" 
                  placeholder="Loading name..."
                />
              </div>

              <div className="form-group">
                <label>email</label>
                <input 
                  type="email" 
                  value={userData.email} 
                  readOnly 
                  className="rounded-input" 
                  placeholder="Loading email..."
                />
              </div>

              <div className="form-action">
                <button 
                  type="button" 
                  className="update-btn"
                  onClick={() => navigate('/edit-profile')}
                >
                  Edit Profile
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;