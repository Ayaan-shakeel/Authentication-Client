import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrength from "../components/PasswordStrength";
import PasswordGenerator from "../components/PasswordGenerator";
import { Copy, Shield } from "lucide-react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
  const handleSubmit = async () => {
  const error = validatePassword(password);

  if (error) {
    toast.error(error);
    return;
  }

  if (password !== confirm) {
    toast.error("Passwords do not match");
    return;
  }
    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://authentication-server-1-oi3o.onrender.com/api/change-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = () => {
  navigator.clipboard.writeText(password);
  toast.success("Copied!");
};

  return (
    <AuthCard>

  {/* HEADER */}
  <div className="text-center mb-8">


    <h2 className="text-2xl font-bold text-gray-800">
      Change Password
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      Secure your account with a stronger password
    </p>

  </div>

  {/* NEW PASSWORD */}
  <div className="mb-3">

    <label className="text-sm font-semibold text-gray-700 block mb-2">
      New Password
    </label>

    <div className="relative">

      <input
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Enter new password"
        className="
          w-full
          rounded-2xl
          border border-gray-200
          bg-gray-50
          px-4 py-4
          pr-24
          text-sm
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          focus:bg-white
        "
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* COPY */}
      <button
        onClick={handleCopy}
        className="
          absolute right-12 top-1/2 -translate-y-1/2
          text-gray-400 hover:text-blue-500
          transition
        "
      >
        <Copy size={18} />
      </button>

      {/* SHOW/HIDE */}
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          text-gray-400 hover:text-blue-500
          transition
        "
      >
        {showPassword ? (
          <FaEyeSlash size={18} />
        ) : (
          <FaEye size={18} />
        )}
      </button>

    </div>

    {/* PASSWORD STRENGTH */}
    <div className="mt-3">
      <PasswordStrength password={password} />
    </div>

  </div>

  {/* CONFIRM PASSWORD */}
  <div className="mb-6">

    <label className="text-sm font-semibold text-gray-700 block mb-2">
      Confirm Password
    </label>

    <div className="relative">

      <input
        type={showConfirm ? "text" : "password"}
        value={confirm}
        placeholder="Confirm new password"
        className="
          w-full
          rounded-2xl
          border border-gray-200
          bg-gray-50
          px-4 py-4
          pr-14
          text-sm
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          focus:bg-white
        "
        onChange={(e) => setConfirm(e.target.value)}
      />

      {/* SHOW/HIDE */}
      <button
        onClick={() => setShowConfirm(!showConfirm)}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          text-gray-400 hover:text-blue-500
          transition
        "
      >
        {showConfirm ? (
          <FaEyeSlash size={18} />
        ) : (
          <FaEye size={18} />
        )}
      </button>

    </div>

  </div>

  {/* PASSWORD GENERATOR */}
  <div className="mb-4">
    <PasswordGenerator setPassword={setPassword} />
  </div>

  {/* SAVE BUTTON */}
  <button
    onClick={handleSubmit}
    disabled={loading}
    className="
      w-full
      py-4
      rounded-2xl
      bg-linear-to-r
      from-blue-600
      to-indigo-600
      text-white
      font-semibold
      shadow-lg
      hover:scale-[1.02]
      hover:shadow-blue-200
      transition-all
      duration-300
      disabled:opacity-70
      disabled:cursor-not-allowed
    "
  >
    {loading ? "Saving..." : "Save Password"}
  </button>

  {/* FOOTER */}
  <p className="text-center text-xs text-gray-400 mt-4">
    Your password is encrypted and securely stored
  </p>

</AuthCard>
  );
};

export default ChangePassword;