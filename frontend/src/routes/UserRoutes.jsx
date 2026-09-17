import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Common Header & Footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// User Pages
import Landing from "../views/user/home/Landing";
import Home from "../views/user/home/Home";
import Login from "../views/user/Login";
import SignUp from "../views/user/SignUp";
import OtpVerification from "../views/user/OtpVerification";
import ForgotPassword from "../views/user/ForgotPassword";
import ForgotPasswordOtp from "../views/user/ForgotPasswordOtp";
import ResetPassword from "../views/user/ResetPassword";
import Profile from "../views/user/Profile";
import Address from "../views/user/Address";
import AddAddress from "../views/user/AddAddress";
import PasswordChange from "../views/user/PasswordChange";
import EditAddress from "../views/user/EditAddress";
import EditProfile from "../views/user/EditProfile";
import VerifyEmailOtp from "../views/user/VerifyEmailOtp";

// Common Layout Component
const UserLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-address" element={<Address />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/edit-address" element={<EditAddress />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/verify-email-otp" element={<VerifyEmailOtp />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;