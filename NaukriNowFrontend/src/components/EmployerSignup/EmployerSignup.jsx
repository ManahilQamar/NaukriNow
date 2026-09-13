import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    source: "",
    phone: "",
    countryCode: "+92",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first to create an employer account.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
`${import.meta.env.VITE_API_URL}/api/employer`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/create-job-post");
    } catch (err) {
      console.error("Employer signup failed:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-md shadow p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create an employer account
        </h1>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              How did you hear about us?
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select an option</option>
              <option value="Newspaper">Newspaper</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend">Friend</option>
              <option value="Google Search">Google Search</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-l-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              For account management communication. Not visible to job seekers.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-8 text-lg py-3 sm:py-4 rounded-md hover:bg-indigo-700 disabled:opacity-60 w-full sm:w-auto"
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerSignup;