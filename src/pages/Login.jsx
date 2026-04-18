import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";

const Login = () => {
    
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:7000/api/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <AuthCard>
      <h2 className="text-xl font-bold text-center mb-4">Login</h2>

      <input placeholder="Email" className="input"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password" className="input mt-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleLogin} className="btn mt-4">
        Login
      </button>
    </AuthCard>
  );
};

export default Login;