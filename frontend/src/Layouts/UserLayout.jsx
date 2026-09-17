import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const UserLayout = () => {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Common Navbar */}
      <Navbar />

      {/* 2. dynamic Page Content (Signup, Login, Shop etc.) */}
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      {/* 3. Common Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;