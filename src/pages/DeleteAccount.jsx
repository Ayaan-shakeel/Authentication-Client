import React from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

function DeleteAccount() {
    const navigate = useNavigate();
    const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete("https://authentication-server-1-oi3o.onrender.com/api/delete-account", {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem("token");
    toast.success("Account deleted");
    navigate("/");
  } catch (err) {
    toast.error("Error deleting account");
  }
};
  return (
    <div>
        <button onClick={handleDelete}>Delete Account</button>
    </div>
  )
}

export default DeleteAccount