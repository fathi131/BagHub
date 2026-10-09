import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../views/admin/AdminDashboard';
import AdminCustomers from '../views/admin/AdminCustomers';
import Category from '../views/admin/Category';
import AdminLogin from '../views/admin/AdminLogin';
import AddCategory from '../views/admin/AddCategory';
import EditCategory from '../views/admin/EditCategory';
import Products from '../views/admin/Products';
import AddProduct from '../views/admin/AddProduct';
import AddVariant from '../views/admin/AddVariant';
import EditProduct from '../views/admin/EditProduct';
import AdminOrdersPage from '../views/admin/AdminOrdersPage';
import AdminEditOrderPage from '../views/admin/AdminEditOrderPage';
import BrandManagement from "../views/admin/BrandManagement";
import AddBrand from "../views/admin/AddBrand";
import OfferManagement from "../views/admin/OfferManagement";
import AddOffer from "../views/admin/AddOffer";
import EditOffer from "../views/admin/EditOffer";
import BannerManagement from "../views/admin/BannerManagement";
import SalesReport from "../views/admin/SalesReport";
import CouponManagement from "../views/admin/CouponManagement";
import ReturnRequestDetails from "../views/admin/ReturnRequestDetails";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/login" element={<AdminLogin />} />

      {/* Admin Protected / Layout Routes */}
     
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="category" element={<Category />} /> 
        <Route path="add-category" element={<AddCategory />} />
        <Route path="edit-category/:id" element={<EditCategory />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="add-variant" element={<AddVariant />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="orders/edit/:id" element={<AdminEditOrderPage />} />
        <Route path="brands" element={<BrandManagement />} />
        <Route path="brands/add" element={<AddBrand />} />
        <Route path="offers" element={<OfferManagement />} />
        <Route path="offers/add" element={<AddOffer />} />
        <Route path="offers/edit/:id" element={<EditOffer />} />
        <Route path="banner" element={<BannerManagement />} />
        
        {/* FIX: Removed leading /admin from sales-report and return-requests */}
        <Route path="sales-report" element={<SalesReport />} />
        <Route path="coupons" element={<CouponManagement />} />
        <Route path="return-requests/:requestId" element={<ReturnRequestDetails />} />
      
      </Route>
    </Routes>
  );
}

export default AdminRoutes;