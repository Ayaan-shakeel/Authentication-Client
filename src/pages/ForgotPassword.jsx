import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";

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
      <h2 className="text-xl font-bold text-center mb-4">
        Forgot Password
      </h2>

      <input
        placeholder="Enter your email"
        className="input"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleForgot}
        className="btn mt-4"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </AuthCard>
  );
};

export default ForgotPassword;