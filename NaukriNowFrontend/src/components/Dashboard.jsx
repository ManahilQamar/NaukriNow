import { Link, useNavigate } from "react-router-dom";
import Footer from "./PostJob/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-indigo-600 font-bold text-2xl">NaukriNow</Link>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600">My Profile</Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600">Here are your personalized job recommendations</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">Your job recommendations will appear here</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;