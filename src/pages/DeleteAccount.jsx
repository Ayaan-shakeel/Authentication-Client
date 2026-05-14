import React from 'react'
import axios from "axios";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { GoogleLogin } from "@react-oauth/google";
import ForgotPassword from './ForgotPassword';

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
    navigate("/login");

  } catch (err) {
    console.log("DELETE ERROR:", err.response?.data);

    toast.error(err.response?.data?.message || "Delete failed");
  }
};



  return (
    <div className="mt-10">

  {/* ================= DANGER CARD ================= */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="
      bg-white
      border border-red-100
      rounded-3xl
      p-5 sm:p-6
      shadow-lg
    "
  >

    {/* Header */}
    <div className="flex items-start gap-4">

      <div
        className="
          w-12 h-12
          rounded-2xl
          bg-red-100
          flex items-center justify-center
          shrink-0
        "
      >
        <AlertTriangle className="text-red-500" size={24} />
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800">
          Danger Zone
        </h3>

        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          Deleting your account is permanent and cannot be undone.
          All your account data will be removed forever.
        </p>
      </div>

    </div>

    {/* Button */}
    <button
      onClick={() => setShowDelete(true)}
      className="
        mt-6
        w-full sm:w-auto
        bg-linear-to-r
        from-red-500 to-rose-600
        hover:from-red-600 hover:to-rose-700
        text-white
        px-6 py-3
        rounded-2xl
        font-semibold
        shadow-lg
        transition-all duration-300
        active:scale-[0.98]
      "
    >
      Delete Account
    </button>

  </motion.div>

  {/* ================= MODAL ================= */}
  {showDelete && (

    <div
      className="
        fixed inset-0
        bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        z-50
        p-4
      "
    >

      <motion.div

        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}

        className="
          w-full max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* Top Gradient */}
        <div
          className="
            bg-linear-to-r
            from-red-500 to-rose-600
            px-6 py-5
            text-white
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-white/20
                flex items-center justify-center
              "
            >
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Delete Account
              </h2>

              <p className="text-sm text-red-100">
                This action cannot be reversed
              </p>
            </div>

          </div>

        </div>

        {/* Content */}
        <div className="p-6">

          <div
            className="
              bg-red-50
              border border-red-100
              rounded-2xl
              p-4
              mb-5
            "
          >

            <p className="text-sm text-red-700 leading-relaxed">
              Once deleted, your account, profile, and all associated
              data will be permanently removed from our servers.
            </p>

          </div>

          {/* NORMAL USER */}
          {user?.password !== "google-auth" ? (

            <>

              <label className="text-sm font-medium text-gray-700">
                Confirm your password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full
                  mt-2
                  bg-gray-50
                  border border-gray-200
                  rounded-2xl
                  px-4 py-3
                  outline-none
                  focus:ring-2
                  focus:ring-red-400
                  transition
                "
                onChange={(e) =>
                  setDeletePassword(e.target.value)
                }
              />

              <p className="text-xs text-gray-400 mt-3">
                We require your password to verify ownership of this account.
              </p>

            </>

          ) : (

            /* GOOGLE USER */
            <div className="mt-2">

              <div
                className="
                  flex items-start gap-3
                  bg-yellow-50
                  border border-yellow-100
                  rounded-2xl
                  p-4
                  mb-5
                "
              >

                <ShieldAlert
                  className="text-yellow-600 shrink-0 mt-1"
                  size={20}
                />

                <div>

                  <p className="text-sm font-semibold text-yellow-700">
                    Google Verification Required
                  </p>

                  <p className="text-xs text-yellow-600 mt-1">
                    Re-login with Google to confirm deletion.
                  </p>

                </div>

              </div>

              <div className="flex justify-center overflow-hidden rounded-2xl">
                
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {

                      const token =
                        localStorage.getItem("token");

                      await axios.delete(
                        "https://authentication-server-1-oi3o.onrender.com/api/delete-account-google",
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                          data: {
                            credential:
                              credentialResponse.credential,
                          },
                        }
                      );

                      toast.success("Account deleted");

                      localStorage.removeItem("token");

                      navigate("/login");

                    } catch (err) {

                      console.log(err);

                      toast.error(
                        "Google delete failed"
                      );

                    }
                  }}

                  onError={() => {
                    toast.error("Google auth failed");
                  }}
                />

              </div>

            </div>

          )}

          {/* Forgot Password */}
          {!user?.isGoogleUser && (
            <p
              className="
                text-center
                text-sm
                text-blue-500
                hover:text-blue-600
                mt-5
                cursor-pointer
                transition
              "
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <button
              onClick={() => setShowDelete(false)}
              className="
                w-full
                py-3
                rounded-2xl
                bg-gray-100
                hover:bg-gray-200
                text-gray-700
                font-medium
                transition
              "
            >
              Cancel
            </button>

            {/* Normal User Delete */}
            {!user?.isGoogleUser && (

              <button
                onClick={handleDeleteAccount}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  bg-linear-to-r
                  from-red-500 to-rose-600
                  hover:from-red-600 hover:to-rose-700
                  text-white
                  font-semibold
                  shadow-lg
                  transition-all duration-300
                  active:scale-[0.98]
                "
              >
                Delete Forever
              </button>

            )}

          </div>

        </div>

      </motion.div>

    </div>

  )}

</div>
  )
}

export default DeleteAccount