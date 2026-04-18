import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:7000/api/verify-otp", {
        email,
        otp,
      });

      toast.success("Verified successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <AuthCard>
      <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>

      <input
        placeholder="Enter OTP"
        className="input"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify} className="btn mt-4">
        Verify
      </button>
    </AuthCard>
  );
};

export default VerifyOtp;