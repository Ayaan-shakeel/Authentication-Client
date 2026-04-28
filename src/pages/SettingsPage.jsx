import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Change Password Card */}
      <div
        onClick={() => navigate("/change-password")}
        className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold">
          Change Password
        </h2>
        <p className="text-sm text-gray-500">
          Update your account password securely
        </p>
      </div>

    </div>
  );
};

export default SettingsPage;