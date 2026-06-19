import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import {logo} from "../assets/otp-logo.png";

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
  const email =
  location.state?.email ||
  localStorage.getItem("verifyEmail");

 const handleVerify = async () => {
  console.log("EMAIL:", email);
  console.log("OTP:", otp);


  if (!otp) {
    return toast.error("Enter OTP");
  }

  if (otp.length !== 6) {
    return toast.error("OTP must be 6 digits");
  }

  try {

    setLoading(true);

    const res = await axios.post(
      "https://authentication-server-1-oi3o.onrender.com/api/verify-otp",
      {
        email,
        otp,
      }
    );

    localStorage.setItem("token", res.data.token);

    toast.success("Account verified successfully");

    // Remove temporary verification session
    localStorage.removeItem("verifyEmail");

    navigate("/dashboard");

  } catch (err) {
console.log("verify full Err",err.response?.data?.message)
    toast.error(
      err.response?.data?.message || "Something went wrong"
    );

  } finally {

    setLoading(false);
  }
};
const handleResend = async () => {
  try {
    await axios.post("https://authentication-server-1-oi3o.onrender.com/api/resend-otp", { email });

    toast.success("OTP resent");
    setTimer(30);
  } catch {
    toast.error("Error resending OTP");
  }
};
  return (
    <AuthCard>

  {/* Logo / Icon */}
  <div className="flex justify-center mb-5">
    <div
      className="
        w-16 h-16
        rounded-2xl
        bg-gray-100
        flex items-center justify-center
        shadow-sm
      "
    >
      <span className="text-3xl">
        <img src={logo} alt="OTP LOGO" />
      </span>
    </div>
  </div>

  {/* Heading */}
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
    Verify OTP
  </h2>

  <p className="text-sm text-gray-500 text-center mt-2 mb-6 px-2">
    Enter the 6-digit verification code sent to your email
  </p>

  {/* OTP Input */}
  <div className="relative">

    <input
      type="text"
      maxLength={6}
      placeholder="Enter OTP"
      className="
        w-full
        text-center
        tracking-[6px] sm:tracking-[10px]
        text-xl
        font-semibold
        px-4
        py-4
        rounded-2xl
        border
        border-gray-300
        outline-none
        bg-white
        focus:ring-2
        focus:ring-blue-400
        transition-all
        duration-200
      "
      onChange={(e) => setOtp(e.target.value)}
    />

  </div>

  {/* Verify Button */}
  <button
    onClick={handleVerify}
    disabled={loading}
    className="
      w-full
      mt-6
      bg-blue-500
      hover:bg-blue-600
      active:scale-[0.98]
      transition-all
      duration-200
      text-white
      font-semibold
      py-3.5
      rounded-2xl
      shadow-md
      disabled:opacity-70
    "
  >
    {loading ? "Verifying..." : "Verify OTP"}
  </button>

  {/* Timer / Resend */}
  <div className="text-center mt-5">

    {timer > 0 ? (

      <p className="text-sm text-gray-500">
        Resend OTP in{" "}
        <span className="font-semibold text-blue-500">
          {timer}s
        </span>
      </p>

    ) : (

      <button
        onClick={handleResend}
        className="
          text-sm
          text-blue-500
          hover:text-blue-600
          font-medium
          transition
        "
      >
        Resend OTP
      </button>

    )}

  </div>

</AuthCard>
  );
};

export default VerifyOtp;