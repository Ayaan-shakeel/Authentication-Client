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

const App = () => {


  

  

  return (

    <div>


      
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/verify" element={<VerifyOtp/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={<FrontPage/>} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        </Routes>
      





      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App