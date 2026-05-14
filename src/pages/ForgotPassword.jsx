import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://authentication-server-1-oi3o.onrender.com/api/forgot-password",
        { email }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>

  {/* HEADER */}
  <div className="text-center mb-4">

    <div className="w-12 h-12 mx-auto rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-4">
      <Mail className="text-white" size={28} />
    </div>

    <h2 className="text-3xl font-bold text-gray-800">
      Forgot Password
    </h2>

    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
      Enter your email address and we’ll send you a secure password reset link
    </p>

  </div>

  {/* EMAIL FIELD */}
  <div className="mb-6">

    <label className="text-sm font-semibold text-gray-700 block mb-2">
      Email Address
    </label>

    <div className="relative">

      <Mail
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="email"
        placeholder="Enter your email"
        className="
          w-full
          rounded-2xl
          border border-gray-200
          bg-gray-50
          py-4
          pl-12
          pr-4
          text-sm
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          focus:bg-white
        "
        onChange={(e) => setEmail(e.target.value)}
      />

    </div>

  </div>

  {/* BUTTON */}
  <button
    onClick={handleForgot}
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
    {loading ? "Sending..." : "Send Reset Link"}
  </button>

  {/* EXTRA INFO */}
  <div className="mt-6 text-center">

    <p className="text-xs text-gray-400 leading-relaxed">
      We’ll email you a secure link to reset your password.
      Make sure to check your spam folder too.
    </p>

  </div>

</AuthCard>
  );
};

export default ForgotPassword;