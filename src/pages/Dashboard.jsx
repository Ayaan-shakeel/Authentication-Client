import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Desktop Sidebar
  const [desktopOpen, setDesktopOpen] = useState(true);

  // Mobile Sidebar
  const [mobileMenu, setMobileMenu] = useState(false);

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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/*MOBILE TOPBAR*/}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b z-50 px-4 py-4 flex items-center justify-between shadow-sm">

        <h1 className="text-xl font-bold text-blue-600">
          Auth App
        </h1>

        <button onClick={() => setMobileMenu(true)}>
          <Menu size={28} />
        </button>

      </div>

      {/*MOBILE OVERLAY*/}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/*DESKTOP SIDEBAR*/}
      <motion.div
        animate={{
          width: desktopOpen ? 260 : 85,
        }}
        transition={{ duration: 0.3 }}
        className="
          hidden md:flex
          h-screen
          sticky top-0
          bg-gray-900
          text-white
          p-5
          flex-col
          shadow-2xl
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          {desktopOpen && (
            <h2 className="text-2xl font-bold text-blue-400">
              Dashboard
            </h2>
          )}

          <button
            onClick={() => setDesktopOpen(!desktopOpen)}
          >
            <Menu size={24} />
          </button>

        </div>

        {/* Navigation */}
        <ul className="space-y-3">

          <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer">
            <LayoutDashboard size={20} />
            {desktopOpen && <span>Dashboard</span>}
          </li>

          <li
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
          >
            <User size={20} />
            {desktopOpen && <span>Profile</span>}
          </li>

          <li
            onClick={() => navigate("/settings")}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
          >
            <Settings size={20} />
            {desktopOpen && <span>Settings</span>}
          </li>

          <li
            onClick={() => navigate("/security")}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
          >
            <Shield size={20} />
            {desktopOpen && <span>Security</span>}
          </li>

        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            mt-auto
            flex items-center justify-center gap-2
            bg-red-500 hover:bg-red-600
            py-3 rounded-xl
            transition
          "
        >
          <LogOut size={18} />
          {desktopOpen && <span>Logout</span>}
        </button>

      </motion.div>

      {/*MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              top-0 left-0
              w-[260px]
              h-screen
              bg-gray-900
              text-white
              z-50
              p-5
              flex flex-col
              md:hidden
            "
          >

            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-10">

              <h2 className="text-2xl font-bold text-blue-400">
                Dashboard
              </h2>

              <button onClick={() => setMobileMenu(false)}>
                <X size={24} />
              </button>

            </div>

            {/* Mobile Nav */}
            <ul className="space-y-3">

              <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer">
                <LayoutDashboard size={20} />
                Dashboard
              </li>

              <li
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
              >
                <User size={20} />
                Profile
              </li>

              <li
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
              >
                <Settings size={20} />
                Settings
              </li>

              <li
                onClick={() => navigate("/security")}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
              >
                <Shield size={20} />
                Security
              </li>

            </ul>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="
                mt-auto
                flex items-center justify-center gap-2
                bg-red-500 hover:bg-red-600
                py-3 rounded-xl
                transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-4 md:p-8 mt-20 md:mt-0">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            max-w-2xl
            mx-auto
            text-center
          "
        >

          {/* Profile */}
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="
                w-28 h-28
                rounded-full
                object-cover
                border-4 border-blue-400
                mx-auto mb-5
              "
            />
          ) : (
            <div
              className="
                w-28 h-28
                rounded-full
                bg-blue-100
                flex items-center justify-center
                mx-auto mb-5
                text-4xl font-bold
                text-blue-600
              "
            >
              {user.name?.charAt(0)}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Welcome {user.name}
          </h1>

          <p className="text-gray-500 break-words mb-6">
            {user.email}
          </p>

          <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-2xl text-sm">
            You are logged in successfully 
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Dashboard;