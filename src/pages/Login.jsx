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
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Welcome Back
      </h2>

      <input
        placeholder="Email"
        className="input mt-2"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <div className="relative mt-2">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          className="input pr-10"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <span
          className="absolute right-3 top-2 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleLogin} className="btn mt-4">
        Login
      </button>

      <p
        onClick={() => navigate("/forgot-password")}
        className="text-sm text-blue-500 mt-2 cursor-pointer"
      >
        Forgot Password
      </p>

      <p
        onClick={() => navigate("/signup")}
        className="text-sm text-blue-500 mt-2 cursor-pointer text-center"
      >
        Create a new Account
      </p>

      {/*Google Button inside return */}
      <div className="mt-4 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google Login Failed")}
        />
      </div>
    </AuthCard>
  );
};
export default Login