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

  const handleReset = async () => {
    const error = validatePassword(password);
    if (error) {
      toast.error(error);
      return;
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `https://authentication-server-1-oi3o.onrender.com/api/reset-password/${token}`,
        { password }
      );

      toast.success(res.data.message);
      navigate("/");
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
        className=" mt-4"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </AuthCard>
  );
};

export default ResetPassword;