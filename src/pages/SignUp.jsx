import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrength from "../components/PasswordStrength";
import PasswordGenerator from "../components/PasswordGenerator";
import { Copy } from "lucide-react";


const SignUp = () => {
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const handleSignup = async () => {
    const error = validatePassword(form.password);
    if (error) {
      toast.error(error);
      return;
    }
  try {
    setLoading(true);
    

    const res = await axios.post("https://authentication-server-1-oi3o.onrender.com/api/register", form);
   


    toast.success(res.data.message);
    navigate("/verify", { state: { email: form.email } });
  } catch (err) {
    // toast.error("Signup failed");
    toast.error(err.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
  
};
const handleCopy = () => {
  navigator.clipboard.writeText(form.password);
  toast.success("Copied!");
};
  return (
    <AuthCard>
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      
<div className="relative mt-2">
      <input placeholder="Name" className="input" 
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
<div className="relative mt-2">
      <input placeholder="Email" className="input mt-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

   <div className="relative mt-2">
 <input
  type={show ? "text" : "password"}
  value={form.password}
  placeholder="Password"
  className="input pr-10"
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
/>
  <span
    className="absolute right-12 top-3 cursor-pointer"
    onClick={() => setShow(!show)   }
  >
    {show ? <FaEyeSlash /> : <FaEye />}
    </span>
<Copy
      size={18}
      onClick={handleCopy}
      className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-black"
    />
</div>
<div>

<PasswordStrength password={form.password} />
</div>
<div>
  <PasswordGenerator setPassword={(pwd) =>
  setForm({ ...form, password: pwd })
} />
</div>
<div>
   <p
        onClick={() => navigate("/")}
        className="text-sm text-blue-500 mt-2 cursor-pointer text-center"
      >
        Already have an account? Login
      </p>
</div>
<div className="relative mt-2">

      <button className="btn  mt-4" onClick={handleSignup} disabled={loading}>
  {loading ? "Creating..." : "Signup"}
</button>
</div>
    </AuthCard>
  );
};

export default SignUp;