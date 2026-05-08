import React from 'react'
import axios from "axios";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { GoogleLogin } from "@react-oauth/google";

function DeleteAccount({user}) {
  const [showDelete, setShowDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
    const navigate = useNavigate();
 const handleDeleteAccount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!user?.isGoogleUser && !deletePassword) {
      return toast.error("Enter your password");
    }

    const res = await axios.delete(
      "https://authentication-server-1-oi3o.onrender.com/api/delete-account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: deletePassword,
        },
      }
    );

    console.log("DELETE RESPONSE:", res.data);

    toast.success("Account deleted");

    localStorage.removeItem("token");
    navigate("/");

  } catch (err) {
    console.log("DELETE ERROR:", err.response?.data);

    toast.error(err.response?.data?.message || "Delete failed");
  }
};



  return (
    <div>
        <div className="mt-8 border-t pt-6">

  <h3 className="text-red-500 font-semibold flex items-center gap-2">
    <AlertTriangle size={18} /> Danger Zone
  </h3>

  <p className="text-sm text-gray-500 mt-2">
    Deleting your account is permanent. This action cannot be undone.
  </p>

  <button
    onClick={() => setShowDelete(true)}
    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Delete Account
  </button>
</div>


{showDelete && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
    >
      
      {/* Header */}
      <div className="flex items-center gap-2 text-red-500 mb-3">
        <AlertTriangle />
        <h2 className="text-lg font-bold">Delete Account</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        This action is permanent. Your data will be erased forever.
      </p>

      {/* Conditional UI */}
      {user?.password !== "google-auth" ? (
  <>
    <input
      type="password"
      placeholder="Enter your password"
      className="input mb-4"
      onChange={(e) => setDeletePassword(e.target.value)}
    />

    <p className="text-xs text-gray-400 mb-4">
      We need your password to confirm this action.
    </p>
  </>
) : (
  <div className="mb-4">
    <p className="text-sm text-gray-500 mb-2">
      Confirm deletion with Google
    </p>

    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const token = localStorage.getItem("token");

          await axios.delete(
            "https://authentication-server-1-oi3o.onrender.com/api/delete-account-google",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                credential: credentialResponse.credential,
              },
            }
          );

          toast.success("Account deleted");

          localStorage.removeItem("token");
          navigate("/");
        } catch (err) {
          console.log(err);
          toast.error("Google delete failed");
        }
      }}
      onError={() => {
        toast.error("Google auth failed");
      }}
    />
  </div>
)}
      {/* Buttons */}
     <div className="flex justify-between gap-3">

  <button
    onClick={() => setShowDelete(false)}
    className="w-full py-2 bg-gray-200 rounded-lg"
  >
    Cancel
  </button>

  {/* NORMAL USER */}
  {!user?.isGoogleUser && (
    <button
      onClick={handleDeleteAccount}
      className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
    >
      Delete Forever
    </button>
  )}

</div>
    </motion.div>
  </div>
)}
    </div>
  )
}

export default DeleteAccount