import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, CameraIcon, Mail, Trash2, User } from "lucide-react";

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
   <div className="min-h-screen bg-linear-to-brrom-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="
      w-full
      max-w-lg
      rounded-3xl
      bg-white/80
      backdrop-blur-xl
      border border-white/40
      shadow-2xl
      p-6 sm:p-8
    "
  >

    {/* HEADER */}
    <div className="text-center mb-4">

      <div className="w-12 h-12 mx-auto rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-4">
        <User className="text-white" size={28} />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        Your Profile
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Manage your personal information and profile photo
      </p>

    </div>

    {/* PROFILE IMAGE */}
    <div className="flex flex-col items-center mb-4">

      <div className="relative group">

        {/* IMAGE */}
        <div className="relative w-32 h-32 rounded-full p-1 bg-linear-to-r from-blue-500 to-indigo-500 shadow-xl">

          <img
            src={user.profilePic || "/default-avatar.png"}
            alt=""
            className="
              w-full h-full
              rounded-full
              object-cover
              border-4 border-white text-center
            "
          />

        </div>

        {/* CAMERA OVERLAY */}
        <label
          className="
            absolute inset-0
            rounded-full
            bg-black/40
            flex items-center justify-center
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
            cursor-pointer
          "
        >
          <div className="bg-white p-3 rounded-full shadow-lg">
            <CameraIcon className="text-blue-600" size={22} />
          </div>

          <input
            type="file"
            hidden
            onChange={handleImageUpload}
          />
        </label>

      </div>

      {/* REMOVE BUTTON */}
      {user.profilePic && (
        <button
          onClick={handleDelete}
          className="
            mt-4
            flex items-center gap-2
            text-sm
            font-medium
            text-red-500
            hover:text-red-600
            transition
          "
        >
          <Trash2 size={16} />
          Remove Photo
        </button>
      )}

    </div>

    {/* FORM */}
    <div className="space-y-5">

      {/* NAME */}
      <div>

        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Full Name
        </label>

        <div className="relative">

          <User
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            placeholder="Enter your name"
            className="
              w-full
              rounded-2xl
              border border-gray-200
              bg-gray-50
              py-4
              pl-12
              pr-4
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              focus:bg-white
            "
          />

        </div>

      </div>

      {/* EMAIL */}
      <div>

        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Email Address
        </label>

        <div className="relative">

          <Mail
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            value={user.email}
            disabled
            className="
              w-full
              rounded-2xl
              border border-gray-200
              bg-gray-100
              py-4
              pl-12
              pr-4
              text-sm
              text-gray-500
              cursor-not-allowed
            "
          />

        </div>

      </div>

      {/* UPDATE BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        onClick={handleUpdate}
        className="
          w-full
          py-4
          rounded-2xl
          bg-linear-to-r
          from-blue-600
          to-indigo-600
          text-white
          font-semibold
          shadow-lg
          hover:shadow-blue-200
          transition-all
          duration-300
        "
      >
        Update Profile
      </motion.button>

    </div>

    {/* FOOTER */}
    <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
      Your profile information is securely stored and encrypted
    </p>

  </motion.div>

</div>
  );
};

export default Profile;