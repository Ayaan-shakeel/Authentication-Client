import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignUp = () => {
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
  try {
    setLoading(true);
    

    const res = await axios.post("https://authentication-server-1-oi3o.onrender.com/api/register", form);
   


    toast.success(res.data.message);
    navigate("/verify", { state: { email: form.email } });
  } catch (err) {
    toast.error("Signup failed");
  } finally {
    setLoading(false);
  }
  
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
    placeholder="Password"
    className="input pr-10"
    onChange={(e) => setForm({ ...form, password: e.target.value })}
  />

  <span
    className="absolute right-3 top-2 cursor-pointer"
    onClick={() => setShow(!show)}
  >
    {show ? <FaEyeSlash /> : <FaEye />}
  </span>
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