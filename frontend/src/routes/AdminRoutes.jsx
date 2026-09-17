import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminCustomers from '../views/admin/AdminCustomers';
import AdminLogin from '../views/admin/AdminLogin';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/login" element={<AdminLogin />} />

      <Route element={<AdminLayout />}>
      
        <Route path="/customers" element={<AdminCustomers />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;