import { useNavigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";

const SettingsPage = ({user}) => {
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
      {/* Delete Account Card */}
      <div
        onClick={() => navigate("/delete-account")}
        className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold">
          Delete Account
        </h2>
        <p className="text-sm text-gray-500">
          Deleting your account deletes all your data in it completely 
        </p>
      </div>
      {/* Security Settings Card */}

<div
        onClick={() => navigate("/security")}
        className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-lg font-semibold">
          Security Settings
        </h2>
        <p className="text-sm text-gray-500">
          Manage your account's security preferences
        </p>
      </div>

    </div>
  );
};

export default SettingsPage;