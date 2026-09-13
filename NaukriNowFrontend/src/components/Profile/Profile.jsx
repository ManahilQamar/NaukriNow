// src/components/Profile/Profile.jsx
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <Link to="/contact-info" className="block text-indigo-600 hover:underline">
            Update contact information
          </Link>
          <Link to="/address-update" className="block text-indigo-600 hover:underline">
            Update address
          </Link>
          <Link to="/resume-upload" className="block text-indigo-600 hover:underline">
            Update resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;