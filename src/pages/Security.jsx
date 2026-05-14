import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Shield, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://authentication-server-1-oi3o.onrender.com/api/login-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data);
    } catch (err) {
      toast.error("Failed to load history");
    }
  };

  const logoutOthers = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://authentication-server-1-oi3o.onrender.com/api/logout-others",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Logged out from all devices");
      fetchHistory();
      navigate("/login");

    } catch (err) {
      toast.error("Error logging out");
    }
  };
  const logoutDevice = async (historyId) => {
  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "https://authentication-server-1-oi3o.onrender.com/api/logout-device",
      { historyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Device logged out");

    fetchHistory();

  } catch (err) {

    toast.error("Failed");

  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield /> Security Activity
        </h2>

        <div className="space-y-3">
            {history.length === 0 ? (

    <p className="text-gray-400 text-sm text-center py-6">
      No login activity found
    </p>

          ): (
            history.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                    className="p-3 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">{item.device}</p>
                <p className="text-xs text-gray-500">{item.ip}</p>
                <p className="text-xs text-gray-400">
                  {new Date(item.time).toLocaleString()}
                </p>
              </div>
              {item.isActive ? (
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-xs">Active</span>
                  <button
                    onClick={() => logoutDevice(item._id)}
                    className="
                      text-xs
                      bg-red-100
                      text-red-500
                      px-3
                      py-1
                      rounded-lg
                      hover:bg-red-200
                      transition
                    "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <span className="text-red-500 text-xs">Not Active</span>
              )}
              
            </motion.div>
          )))}
        </div>

        <button
          onClick={logoutOthers}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Logout from all devices
        </button>

      </div>
    </div>
  );
};

export default Security;