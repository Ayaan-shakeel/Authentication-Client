import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import AuthCard from "../components/AuthCard";
import PasswordStrength from "../components/PasswordStrength";

import { Lock } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // PASSWORD VALIDATION
  const validatePassword = (password) => {

    if (password.length < 10)
      return "Password must be at least 10 characters";

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

  // RESET PASSWORD
  const handleReset = async () => {

    const cleanPassword = password.trim();

    if (!cleanPassword) {
      return toast.error("Password is required");
    }

    const error = validatePassword(cleanPassword);

    if (error) {
      toast.error(error);
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `https://authentication-server-1-oi3o.onrender.com/api/reset-password/${token}`,
        {
          password: cleanPassword,
        }
      );

      toast.success("Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Reset failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <AuthCard>

      {/* HEADER */}
      <div className="text-center mb-6">

        {/* ICON */}
        <div
          className="
            w-16 h-16
            mx-auto
            rounded-3xl
            bg-linear-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            shadow-lg
            mb-4
          "
        >
          <Lock className="text-white" size={30} />
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-800">
          Reset Password
        </h2>

        {/* SUBTITLE */}
        <p className="text-sm text-gray-500 mt-2 leading-relaxed px-2">
          Create a strong new password to secure your account
        </p>

      </div>

      {/* PASSWORD FIELD */}
      <div className="mb-5">

        <label className="text-sm font-semibold text-gray-700 block mb-2">
          New Password
        </label>

        <div className="relative">

          {/* LOCK ICON */}
          <Lock
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          {/* INPUT */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleReset();
              }
            }}

            className="
              w-full
              rounded-2xl
              border border-gray-200
              bg-gray-50
              py-4
              pl-12
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
          />

          {/* SHOW/HIDE BUTTON */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}

            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-blue-500
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

      {/* BUTTON */}
      <button
        onClick={handleReset}
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
          active:scale-[0.98]
          transition-all
          duration-300
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {/* FOOTER */}
      <div className="mt-6 text-center">

        <p className="text-xs text-gray-400 leading-relaxed px-2">
          Use a strong password with uppercase letters, numbers,
          and symbols to keep your account secure.
        </p>

      </div>

    </AuthCard>
  );
};

export default ResetPassword;