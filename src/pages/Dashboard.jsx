import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successfully");
setTimeout(() => {
  navigate("/");
}, 500);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://authentication-server-1-oi3o.onrender.com/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
  console.log(err);
  toast.error("Session expired, please login again");

  localStorage.removeItem("token");
  navigate("/");
}
    };

    fetchUser();
  }, []);

  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold animate-pulse">
        Loading Dashboard...
      </p>
    </div>
  );
}
 return (
  <div className="min-h-screen bg-gray-100">

    {/* Navbar */}
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="  bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto text-center">

        <h2 className="text-2xl font-bold mb-2">
          Welcome {user.name}
        </h2>

        <p className="text-gray-600 mb-4">
          {user.email}
        </p>

        <div className="mt-4 text-sm text-gray-500">
          You are logged in successfully.
        </div>

      </div>
    </div>
  </div>
);
};

export default Dashboard;