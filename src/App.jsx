import React from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';
import FrontPage from './pages/FrontPage';


const App = () => {
  return (

    <div>



      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/verify" element={<VerifyOtp/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/main" element={<FrontPage/>} />
        </Routes>
      </BrowserRouter>





      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App