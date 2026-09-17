import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAuth.css';

const AdminVerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(56);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next box
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      navigate('/admin/reset-password');
    } else {
      alert('Please enter a 4-digit OTP');
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-container">
        <div className="admin-card-border">
          <h2 className="admin-auth-title">Verify Your OTP</h2>

          <form onSubmit={handleSubmit} className="admin-auth-form">
            <div className="otp-boxes-wrapper">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  className="otp-box"
                />
              ))}
            </div>

            <div className="otp-resend-row">
              <span className="resend-text">
                Didn't get the OTP? <button type="button" className="resend-btn">Resend OTP</button>
              </span>
              <span className="timer-text">
                00:{timer < 10 ? `0${timer}` : timer}
              </span>
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

export default AdminVerifyOtp;