import React from 'react'
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {  Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';
import FrontPage from './pages/FrontPage';
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import RedirectHandler from './components/RedirectHandler';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import SettingsPage from './pages/SettingsPage';
import ChangePassword from './pages/ChangePassword';
import DeleteAccount from './pages/DeleteAccount';
import Security from './pages/Security';

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/verify" element={<VerifyOtp/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={<FrontPage/>} />
          <Route path="/redirect" element={<RedirectHandler/>} />

<Route path="/dashboard" element={
  <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
<Route path="/settings" element={<SettingsPage/>} />
<Route path="/change-password" element={<ChangePassword/>} />
<Route path="/delete-account" element={<DeleteAccount/>} />
<Route path="/security" element={<Security/>} />
<Route
  path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App