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

const App = () => {
  return (
    <div>
<RedirectHandler/>

      {/* 959980577435-5gbhcm2r0na7itnvfe4rt0rl0pa1lcqj.apps.googleusercontent.com */}
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/verify" element={<VerifyOtp/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={<FrontPage/>} />

<Route path="/dashboard" element={
  <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      





      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App