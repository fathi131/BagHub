import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#03544c', color: '#ffffff' }}>
      <div className="footer-logo">
        <h2>BagHub</h2>
      </div>

      <div className="footer-content">
        <div className="footer-column">
          <h4>SHOP</h4>
          <ul>
            <li>Indoor Plants</li>
            <li>Outdoor Plants</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>SUPPORT</h4>
          <ul>
            <li>Order Status</li>
            <li>Product Support</li>
            <li>Shipping & Return Policy</li>
            <li>Complaint Registration</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of use</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p>Email: baghub@gmail.com</p>
          <p>Phone: +91 8888888888</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 baghub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;