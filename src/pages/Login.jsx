import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    
    const [show, setShow] = useState(false);
    const navigate=useNavigate()
  const [form, setForm] = useState({
     email: "",
     password: "" 
    });
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("https://authentication-server-1-oi3o.onrender.com/api/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
    navigate("/dashboard")
  };
const newAccount=(req,res)=>{
  navigate("/signup")
  
}
const forgotPassword=(req,res)=>{
  navigate("/forgot-password")
}

const handleGoogleLogin = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);

  const res = await axios.post("https://authentication-server-1-oi3o.onrender.com/api/google-login", {
    name: decoded.name,
    email: decoded.email,
    googleId: decoded.sub,
  });

  localStorage.setItem("token", res.data.token);
};
  return (
    <AuthCard>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
  Welcome Back
</h2>
      <h2 className="text-xl font-bold text-center mb-4">Login</h2>
 <div className="relative mt-2">

      <input placeholder="Email" className="input"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

      <div className="relative mt-2">
  <input
    type={show ? "text" : "password"}
    placeholder="Password"
    className="input pr-10"
    onChange={(e) => setForm({ ...form, password: e.target.value })}
  />

  <span
    className="absolute right-3 top-2 cursor-pointer"
    onClick={() => setShow(!show)}
  >
    {show ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
<div className="relative mt-2">

      <button onClick={handleLogin}
       className="btn mt-4">
        Login
      </button>
</div>
<div>
  <button onClick={forgotPassword}>Forgot Password</button>
</div>
<div>
  <p onClick={newAccount} className="relative mt-2 text-center text-blue-400 cursor-pointer">Create a new Account</p>
</div>
<div>
  <GoogleLogin
  onSuccess={handleGoogleLogin}
  onError={() => console.log("Login Failed")}
/>
</div>
    </AuthCard>
  );
};

export default Login;