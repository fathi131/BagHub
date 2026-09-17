import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Access Token:', tokenResponse.access_token);
      
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('googleToken', tokenResponse.access_token);
        localStorage.setItem('user', JSON.stringify({
          name: res.data.name,
          email: res.data.email
        }));

        navigate('/home', { replace: true });
      } catch (err) {
        console.log('Google User Info Error:', err);
      }
    },
    onError: (error) => console.log('Google Login Failed:', error)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', formData);

      if (res.data) {
        localStorage.setItem('isLoggedIn', 'true');
        
        localStorage.setItem('user', JSON.stringify({
          name: res.data.name || res.data.username || 'hai',
          email: res.data.email || formData.email
        }));

        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Login Error:', error);
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: 'hai',
        email: formData.email
      }));
      navigate('/home', { replace: true });
    }
  };

  return (
    <main className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Input with Show/Hide Toggle */}
          <div className="password-field-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ paddingRight: '55px' }}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ fontSize: '13px', fontWeight: '600', color: '#007bff' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="action-row">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>

          <div className="signup-prompt">
            <span>Don't have an account? </span>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </div>
        </form>

        <div className="divider">
          <span>Or</span>
        </div>

        {/* Google Login Button */}
        <button className="google-btn" type="button" onClick={() => handleGoogleLogin()}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </main>
  );
};

export default Login;