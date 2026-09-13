import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RoleSelection() {
  const navigate = useNavigate();

const handleRoleSelect = async (role, redirectPath) => {
  try {
    await axios.post("http://localhost:5000/api/auth/set-role", { role }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    navigate(redirectPath);
  } catch (err) {
    console.error(err);
    navigate(redirectPath); // fallback, role backend mein set nahi hoga but user block na ho
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Your Role</h1>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
        <div className="flex flex-col items-center">
          <h2 className="font-bold mb-4 text-center px-4">Looking for a job?</h2>
          <button
            onClick={() => handleRoleSelect("user", "/")}
            className="px-8 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          >
            Employee
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-bold mb-4 text-center px-4">Hiring an employee?</h2>
          <button
            onClick={() => handleRoleSelect("employer", "/employers")}
            className="px-8 py-3 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
          >
            Employer
          </button>
        </div>
      </div>
    </div>
  );
};