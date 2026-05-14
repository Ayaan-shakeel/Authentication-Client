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
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://authentication-server-1-oi3o.onrender.com/api/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");

      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log("Google Response:", credentialResponse);

      const res = await axios.post(
        "https://authentication-server-1-oi3o.onrender.com/api/google-login",
        {
          credential: credentialResponse.credential,
        }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Google Login Success");

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    }
  };

  return (
  <AuthCard>

  {/* Logo / Brand */}
  <div className="flex flex-col items-center mb-4">
    
    {/* <div
      className="
        w-12 h-12
        rounded-2xl
        bg-gradient-to-br from-blue-500 to-indigo-600
        flex items-center justify-center
        shadow-lg mb-4
      "
    >
      <span className="text-white text-2xl font-bold">
        A
      </span>
    </div> */}

    <h2 className="text-2xl font-bold text-gray-800">
      Welcome Back
    </h2>

    <p className="text-gray-500 text-sm mt-3 text-center">
      Login to continue your secure journey
    </p>

  </div>

  {/* Email Input */}
  <div className="relative mt-6">
    <input
      type="email"
      placeholder="Enter your email"
      className="
        w-full
        bg-gray-50
        border border-gray-200
        rounded-2xl
        px-4 py-3
        outline-none
        text-sm sm:text-base
        focus:ring-2 focus:ring-blue-400
        focus:border-blue-400
        transition
      "
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
  </div>

  {/* Password */}
  <div className="relative mt-4">

    <input
      type={show ? "text" : "password"}
      placeholder="Enter your password"
      className="
        w-full
        bg-gray-50
        border border-gray-200
        rounded-2xl
        px-4 py-3
        pr-12
        outline-none
        text-sm sm:text-base
        focus:ring-2 focus:ring-blue-400
        focus:border-blue-400
        transition
      "
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <button
      type="button"
      className="
        absolute right-4 top-1/2
        -translate-y-1/2
        text-gray-500 hover:text-blue-500
        transition
      "
      onClick={() => setShow(!show)}
    >
      {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>

  </div>

  {/* Forgot Password */}
  <div className="flex justify-end mt-2">

    <p
      onClick={() => navigate("/forgot-password")}
      className="
        text-sm
        text-blue-500
        hover:text-blue-600
        cursor-pointer
        transition
      "
    >
      Forgot Password?
    </p>

  </div>

  {/* Login Button */}
  <button
    onClick={handleLogin}
    className="
      w-full
      mt-5
      bg-linear-to-r from-blue-500 to-indigo-600
      hover:from-blue-600 hover:to-indigo-700
      text-white
      font-semibold
      py-3
      rounded-2xl
      shadow-lg
      transition-all duration-300
      active:scale-[0.98]
    "
  >
    Login
  </button>

  {/* Divider */}
  <div className="flex items-center gap-3 my-3">

    <div className="flex-1 h-px bg-gray-200"></div>

    <p className="text-sm text-gray-400">
      OR
    </p>

    <div className="flex-1 h-px bg-gray-200"></div>

  </div>

  {/* Google Login */}
  <div className="flex justify-center overflow-hidden rounded-2xl">

    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => toast.error("Google Login Failed")}
    />

  </div>

  {/* Signup */}
  <div className="mt-3 text-center">

    <p className="text-sm text-gray-500">
      Don’t have an account?
    </p>

    <p
      onClick={() => navigate("/signup")}
      className="
        text-blue-500
        hover:text-blue-600
        font-semibold
        mt-1
        cursor-pointer
        transition
      "
    >
      Create New Account
    </p>

  </div>

</AuthCard>
  );
};
export default Login