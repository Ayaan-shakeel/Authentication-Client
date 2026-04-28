import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrength from "../components/PasswordStrength";
import PasswordGenerator from "../components/PasswordGenerator";
import { Copy } from "lucide-react";

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
      <h2 className="text-xl font-bold text-center mb-4">
        Change Password
      </h2>
<div className="relative mt-2">

      <input
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="New Password"
        className="input mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Copy
      size={18}
      onClick={handleCopy}
      className="absolute right-12 top-3 cursor-pointer text-gray-500 hover:text-black"
    />
      <span onClick={() => setShowPassword(!showPassword)}>
        
      {showPassword ? <FaEyeSlash className="absolute right-3 top-3 cursor-pointer" /> : <FaEye className="absolute right-3 top-3 cursor-pointer" />}
      </span>
        </div>
        <PasswordStrength password={password}/>
<div className="relative mt-2">

      <input
        type={showConfirm ? "text" : "password"}
        value={confirm}
        placeholder="Confirm Password"
        className="input mb-3"
        onChange={(e) => setConfirm(e.target.value)}
        />
        <span onClick={() => setShowConfirm(!showConfirm)}>
{showConfirm ? <FaEyeSlash className="absolute right-3 top-3 cursor-pointer" /> : <FaEye className="absolute right-3 top-3 cursor-pointer" />}
        </span>
 
        </div>
        <PasswordGenerator setPassword={setPassword}/>
      <button
        onClick={handleSubmit}
        className="btn"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Password"}
      </button>
    </AuthCard>
  );
};

export default ChangePassword;