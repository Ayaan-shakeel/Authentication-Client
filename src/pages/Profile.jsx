import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

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
        console.log(err);
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated");
    navigate("/dashboard");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-center">
          Profile
        </h2>

        <input
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          className="input mb-3"
        />

        <input
          value={user.email}
          disabled
          className="input mb-3 bg-gray-100"
        />

        <button
          onClick={handleUpdate}
          className="btn w-full"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;