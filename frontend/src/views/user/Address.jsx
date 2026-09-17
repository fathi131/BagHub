import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Address.css';

const Address = () => {
  const navigate = useNavigate();

  // Demo Address List
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 9876543210',
      pincode: '682001',
      addressLine: '123 Green Street, MG Road',
      city: 'Kochi',
      state: 'Kerala',
      isDefault: true
    }
  ]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div className="profile-page-wrapper">
      {/* Top Header Title */}
      <div className="page-header-title">
        <h2>Manage Address</h2>
      </div>

      {/* Main Content Area */}
      <main className="profile-page">
        <div className="profile-container">
          
          {/* Left Sidebar Menu */}
          <aside className="account-box">
            <h3 className="box-title">My Account</h3>
            <ul className="account-menu">
              <li>
                <Link to="/profile">
                  <span className="icon">👤</span> Personal Information
                </Link>
              </li>
              <li className="active">
                <Link to="/manage-address">
                  <span className="icon">📍</span> Address
                </Link>
              </li>
              <li>
                <Link to="/orders">
                  <span className="icon">📦</span> Order
                </Link>
              </li>
              <li>
                <Link to="/wallet">
                  <span className="icon">💳</span> Wallet
                </Link>
              </li>
              <li>
                <Link to="/coupons">
                  <span className="icon">🎟️</span> Coupon
                </Link>
              </li>
              <li>
                <Link to="/referral">
                  <span className="icon">🎁</span> Referral Program
                </Link>
              </li>
              <li>
                <Link to="/password-change">
                  <span className="icon">🔑</span> Password Change
                </Link>
              </li>
              <li onClick={handleLogout} className="logout-li">
                <span className="icon">🚪</span> Logout
              </li>
            </ul>
          </aside>

          {/* Right Main Content */}
          <section className="info-box">
            <div className="address-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="box-title-center" style={{ margin: 0 }}>Address Management</h3>
              <Link to="/add-address" className="add-address-btn" style={{ textDecoration: 'none', background: '#000', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '13px' }}>
                + Add New Address
              </Link>
            </div>

            <div className="address-list">
              {addresses.length === 0 ? (
                <p className="no-address-text">No addresses saved yet.</p>
              ) : (
                addresses.map((addr) => (
                  <div key={addr.id} className="address-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                    {addr.isDefault && <span className="default-badge" style={{ background: '#000', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px' }}>DEFAULT</span>}
                    <h4 style={{ margin: '8px 0' }}>{addr.name}</h4>
                    <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>{addr.addressLine}, {addr.city}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>{addr.state} - {addr.pincode}</p>
                    <p style={{ margin: '4px 0', fontSize: '13px', color: '#555' }}>Phone: {addr.phone}</p>

                    <div className="address-card-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button className="edit-btn" onClick={() => navigate('/edit-address')} style={{ cursor: 'pointer' }}>Edit</button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(addr.id)}
                        style={{ color: 'red', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Address;