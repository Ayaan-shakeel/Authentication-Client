import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Trash2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", profilePic: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://authentication-server-1-oi3o.onrender.com/api/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load profile");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://authentication-server-1-oi3o.onrender.com/api/update-profile",
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://authentication-server-1-oi3o.onrender.com/api/upload-profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      toast.success("Photo updated");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        "https://authentication-server-1-oi3o.onrender.com/api/delete-profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser({ ...user, profilePic: "" });
      toast.success("Photo removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group w-28 h-28">

            <img
              src={user.profilePic || "/default-avatar.png"}
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow"
            />

            {/* Hover Overlay */}
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition">
              <Camera size={20} />
              <input type="file" hidden onChange={handleImageUpload} />
            </label>
          </div>

          {/* Remove Button ONLY if image exists */}
          {user.profilePic && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 mt-3 text-red-500 text-sm hover:underline"
            >
              <Trash2 size={16} /> Remove Photo
            </button>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
            placeholder="Name"
            className="input"
          />

          <input
            value={user.email}
            disabled
            className="input bg-gray-100 cursor-not-allowed"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow"
          >
            Update Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;