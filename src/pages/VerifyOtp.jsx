import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
useEffect(() => {
  if (timer > 0) {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [timer]);
  const email = location.state?.email;

 const handleVerify = async () => {
  try {
    setLoading(true);

    await axios.post("http://localhost:7000/api/verify-otp", {
      email,
      otp,
    });

    toast.success("Verified!");
    navigate("/main");
    toast.success("SignUp Success")
  } catch (err) {
    toast.error("Invalid OTP");
  } finally {
    setLoading(false);
  }
};
const handleResend = async () => {
  try {
    await axios.post("http://localhost:7000/api/resend-otp", { email });

    toast.success("OTP resent");
    setTimer(30);
  } catch {
    toast.error("Error resending OTP");
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


      <button
  onClick={handleVerify}
  className="btn mt-4"
  disabled={loading}
>
  {loading ? "Verifying..." : "Verify"}
</button>

<p className="text-center mt-3 text-sm">
  {timer > 0 ? (
    `Resend OTP in ${timer}s`
  ) : (
    <span
      className="text-blue-500 cursor-pointer"
      onClick={handleResend}
    >
      Resend OTP
    </span>
  )}
</p>
    </AuthCard>
  );
};

export default VerifyOtp;