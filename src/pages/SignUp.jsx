import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrength from "../components/PasswordStrength";
import PasswordGenerator from "../components/PasswordGenerator";
import { Copy } from "lucide-react";


const SignUp = () => {
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validatePassword = (password) => {
  if (password.length < 10) return "Password must be at least 10 characters";

  if (!/[A-Z]/.test(password))
    return "At least one uppercase letter required";

  if (!/[a-z]/.test(password))
    return "At least one lowercase letter required";

  if (!/[0-9]/.test(password))
    return "At least one number required";

  if (!/[^A-Za-z0-9]/.test(password))
    return "At least one symbol required";

  return null;
};

  const handleSignup = async () => {

  if (!form.name || !form.email || !form.password) {
    return toast.error("All fields are required");
  }

  const error = validatePassword(form.password);

  if (error) {
    toast.error(error);
    return;
  }

  try {

    setLoading(true);

    const res = await axios.post(
      "https://authentication-server-1-oi3o.onrender.com/api/register",
      form
    );

    toast.success(res.data.message);

    // Save temporary verification session
    localStorage.setItem("verifyEmail", form.email);

    navigate("/verify");

  } catch (err) {

    toast.error(
      err.response?.data?.message || "Signup failed"
    );

  } finally {

    setLoading(false);
  }
};
const handleCopy = () => {
  navigator.clipboard.writeText(form.password);
  toast.success("Copied!");
};
  return (
  <AuthCard>

  {/* Logo / Heading */}
  <div className="text-center mb-3">

    {/* <div
      className="
        w-16 h-16 mx-auto mb-4
        rounded-2xl
        bg-gradient-to-r from-blue-500 to-indigo-600
        flex items-center justify-center
        shadow-lg
      "
    >
      <span className="text-white text-2xl font-bold">
        <img src="src/assets/image.png" alt="" />
      </span>
    </div> */}

    <h2 className="text-2xl font-bold text-gray-800">
      Create Account
    </h2>

    <p className="text-gray-500 text-sm mt-2">
      Join us and secure your account easily
    </p>

  </div>

  {/* Name */}
  <div className="relative mb-4">

    <input
      placeholder="Full Name"
      className="
        w-full
        rounded-2xl
        border border-gray-200
        bg-gray-50
        px-4 py-3
        outline-none
        transition
        focus:ring-2 focus:ring-blue-400
        focus:bg-white
      "
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

  </div>

  {/* Email */}
  <div className="relative mb-4">

    <input
      type="email"
      placeholder="Email Address"
      className="
        w-full
        rounded-2xl
        border border-gray-200
        bg-gray-50
        px-4 py-3
        outline-none
        transition
        focus:ring-2 focus:ring-blue-400
        focus:bg-white
      "
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

  </div>

  {/* Password */}
  <div className="relative mb-3">

    <input
      type={show ? "text" : "password"}
      value={form.password}
      placeholder="Create Password"
      className="
        w-full
        rounded-2xl
        border border-gray-200
        bg-gray-50
        px-4 py-3
        pr-20
        outline-none
        transition
        focus:ring-2 focus:ring-blue-400
        focus:bg-white
      "
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    {/* Eye */}
    <span
      className="
        absolute right-12 top-1/2 -translate-y-1/2
        cursor-pointer text-gray-500
      "
      onClick={() => setShow(!show)}
    >
      {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </span>

    {/* Copy */}
    <Copy
      size={18}
      onClick={handleCopy}
      className="
        absolute right-4 top-1/2 -translate-y-1/2
        cursor-pointer text-gray-500 hover:text-black
      "
    />

  </div>

  {/* Password Strength */}
  <div className="mb-4">
    <PasswordStrength password={form.password} />
  </div>

  {/* Password Generator */}
  <div className="mb-3">
    <PasswordGenerator
      setPassword={(pwd) =>
        setForm({ ...form, password: pwd })
      }
    />
  </div>

  {/* Login Redirect */}
  <p
    onClick={() => navigate("/login")}
    className="
      text-sm
      text-blue-500
      cursor-pointer
      text-center
      hover:underline
      mb-3
    "
  >
    Already have an account? Login
  </p>

  {/* Signup Button */}
  <button
    className="
      w-full
      bg-linear-to-r from-blue-500 to-indigo-600
      text-white
      py-3
      rounded-2xl
      font-semibold
      shadow-lg
      hover:scale-[1.02]
      active:scale-[0.98]
      transition-all duration-200
      disabled:opacity-70
    "
    onClick={handleSignup}
    disabled={loading}
  >
    {loading ? "Creating Account..." : "Create Account"}
  </button>

</AuthCard>
  );
};

export default SignUp;