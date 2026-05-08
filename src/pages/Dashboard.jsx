import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import DeleteAccount from "./DeleteAccount";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://authentication-server-1-oi3o.onrender.com/api/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        toast.error("Session expired");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <motion.div
        animate={{ width: open ? 240 : 70 }}
        className="bg-gray-700 text-white p-4 flex flex-col"
      >
        {/* Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`font-bold text-lg ${!open && "hidden"}`}>
            MyApp
          </h2>

          <Menu
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Menu */}
        <ul className="space-y-6">

          <li
            className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
          >
            <LayoutDashboard size={20} />
            {open && "Dashboard"}
          </li>

          <li
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
          >
            <User size={20} />
            {open && "Profile"}
          </li>

          <li
          onClick={() => navigate("/settings")}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
          >
            <Settings size={20} />
            {open && "Settings"}
          </li>

          <li
            onClick={handleLogout}
            className="flex items-center gap-3 cursor-pointer hover:text-red-400 mt-10"
          >
            <LogOut size={20} />
            {open && "Logout"}
          </li>

        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto text-center">
          <div>
             <h2 className="text-2xl font-bold mb-2">
            Welcome {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-30 h-30 rounded-full border-2 border-blue-400  mx-auto mb-4"
              />
            ) : (
              <div></div>
            )}
          </h2>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Welcome {user.name}
          </h2>

          <p className="text-gray-600 mb-4">
            {user.email}
          </p>

          <p className="text-sm text-gray-500">
            You are logged in successfully.
          </p>

        </div>

      </div>
      
    </div>
  );
};

export default Dashboard;