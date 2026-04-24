import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `https://authentication-server-1-oi3o.onrender.com/api/reset-password/${token}`,
        { password }
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <h2 className="text-xl font-bold text-center mb-4">
        Reset Password
      </h2>

      <input
        type="password"
        placeholder="New Password"
        className="input"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="btn mt-4"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </AuthCard>
  );
};

export default ResetPassword;