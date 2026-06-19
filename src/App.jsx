import React from 'react'
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {  Routes, Route,Navigate } from "react-router-dom";
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
import AuthRedirect from './components/AuthRedirect';
import VerifyRoute from './components/VerifyRoute';

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/signup" element={<AuthRedirect><SignUp/></AuthRedirect>} />
          <Route path="/verify" element={<VerifyRoute><VerifyOtp/></VerifyRoute>} />
          <Route path="/login" element={<AuthRedirect><Login/></AuthRedirect>} />
          <Route path="/redirect" element={<RedirectHandler/>} />
          <Route path="/" element={<AuthRedirect><FrontPage /></AuthRedirect>} />

<Route path="/dashboard" element={
  <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
<Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>} />
<Route path="/change-password" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>} />
<Route path="/delete-account" element={<ProtectedRoute><DeleteAccount/></ProtectedRoute>} />
<Route path="/security" element={<ProtectedRoute><Security/></ProtectedRoute>} />
<Route
  path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App