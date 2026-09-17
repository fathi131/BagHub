import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

const VerifyEmailOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  
  const oldEmail = location.state?.oldEmail;
  const newEmail = location.state?.newEmail || location.state?.email || '';
  const username = location.state?.username;
  const isEmailChange = location.state?.isEmailChange || false;

  
  const targetEmail = isEmailChange ? oldEmail : newEmail;

  // 1. Verify OTP Handler
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!targetEmail) {
      alert('Email missing. Please try again.');
      return;
    }

    try {
      setLoading(true);

      
      const endpoint = isEmailChange
        ? 'http://localhost:5000/api/user/verify-email-otp'
        : 'http://localhost:5000/api/verify-otp';

      const res = await axios.post(endpoint, {
        oldEmail,
        newEmail,
        email: targetEmail,
        otp
      });

      if (res.status === 200 || res.data.success) {
        if (isEmailChange) {
          
          const updatedUser = { name: username, email: newEmail };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          alert('Email updated successfully!');
          navigate('/profile');
        } else {
          alert('Email verified successfully!');
          navigate('/login');
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid or Expired OTP');
    } finally {
      setLoading(false);
    }
  };

  // 2. Resend OTP Handler
  const handleResendOtp = async () => {
    if (!targetEmail) {
      alert('Email missing! Please try again.');
      return;
    }

    try {
      setResending(true);

      const endpoint = isEmailChange
        ? 'http://localhost:5000/api/user/send-email-otp'
        : 'http://localhost:5000/api/resend-otp';

      const res = await axios.post(endpoint, {
        emailToSend: targetEmail,
        email: targetEmail,
        newEmail: newEmail
      });

      alert(res.data.message || 'New OTP sent to your email!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="account-page">
      <main className="account-wrapper">
        <div className="content-card" style={{ maxWidth: '450px', margin: '40px auto', width: '100%' }}>
          <h2 className="content-title">Verify Email OTP</h2>
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            Enter the 4-digit OTP sent to <strong>{targetEmail || 'your email'}</strong>
          </p>

          <form onSubmit={handleVerify} className="edit-profile-form">
            <div className="form-group">
              <input
                type="text"
                maxLength="4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="account-input"
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '18px' }}
                required
              />
            </div>

            <div className="form-action" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </div>
          </form>

          {/* Resend OTP Section */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
            <p>
              Didn't get the OTP?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }}
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmailOtp;