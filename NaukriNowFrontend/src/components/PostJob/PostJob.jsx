import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    jobLocationType: "",
    payType: "range",
    minSalary: "",
    maxSalary: "",
    payRate: "per month",
  });

  const [message, setMessage] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [estimatedPay, setEstimatedPay] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayTypeChange = (type) => {
    setFormData(prev => ({ ...prev, payType: type }));
  };

  const handlePayRateChange = (rate) => {
    setFormData(prev => ({ ...prev, payRate: rate }));
  };

  const calculateEstimatedPay = () => {
    const { minSalary, maxSalary, payRate, payType } = formData;

    if (payType === "range" && minSalary && maxSalary) {
      let min = parseInt(minSalary);
      let max = parseInt(maxSalary);

      if (payRate === "per hour") { min *= 160; max *= 160; }
      else if (payRate === "per day") { min *= 20; max *= 20; }
      else if (payRate === "per week") { min *= 4; max *= 4; }
      else if (payRate === "per year") { min /= 12; max /= 12; }

      setEstimatedPay(`Rs ${Math.round(min)} - Rs ${Math.round(max)} per month`);
    } else if (payType === "starting" && minSalary) {
      let amount = parseInt(minSalary);

      if (payRate === "per hour") amount *= 160;
      else if (payRate === "per day") amount *= 20;
      else if (payRate === "per week") amount *= 4;
      else if (payRate === "per year") amount /= 12;

      setEstimatedPay(`Starting at Rs ${Math.round(amount)} per month`);
    } else {
      setEstimatedPay("Please provide salary information");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    let formattedSalary = "";
    if (formData.payType === "range" && formData.minSalary && formData.maxSalary) {
      formattedSalary = `Rs ${formData.minSalary} - Rs ${formData.maxSalary} ${formData.payRate}`;
    } else if (formData.payType === "starting" && formData.minSalary) {
      formattedSalary = `Starting at Rs ${formData.minSalary} ${formData.payRate}`;
    }

    const submitData = {
      title: formData.title,
      company: formData.company,
      description: formData.description,
      location: formData.location,
      jobType: formData.jobType,
      jobLocationType: formData.jobLocationType,
      salary: formattedSalary,
      minSalary: formData.minSalary || undefined,
      maxSalary: formData.maxSalary || undefined,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login as employer first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
`${import.meta.env.VITE_API_URL}/api/jobs`,
        submitData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

     if (res.status === 201) {
  setMessage("Job posted successfully! Redirecting...");
  setTimeout(() => navigate("/sponsor-job"), 1200);
}
    } catch (err) {
      console.error(err?.response?.data || err);
      setMessage(err?.response?.data?.message || "Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Post a New Job</h2>

        {message && (
          <div className={`mb-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <button
              type="button"
              onClick={() => setShowPayModal(true)}
              className="w-full text-left px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100"
            >
              {formData.payType === "range" && formData.minSalary && formData.maxSalary
                ? `Rs ${formData.minSalary} - Rs ${formData.maxSalary} ${formData.payRate}`
                : formData.payType === "starting" && formData.minSalary
                ? `Starting at Rs ${formData.minSalary} ${formData.payRate}`
                : "Set pay range"}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Karachi, Remote"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Location Type</label>
            <select
              name="jobLocationType"
              value={formData.jobLocationType}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select location type</option>
              <option value="In person">In person</option>
              <option value="Fully remote">Fully remote: no on-site work required</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On the road">On the road</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>

      {showPayModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Set Pay Range</h3>
            <p className="text-sm text-gray-600 mb-4">
              Review the pay we estimated for your job and adjust as needed. Check your local minimum wage.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Show pay by</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handlePayTypeChange("range")}
                  className={`px-3 py-2 rounded-md text-sm ${formData.payType === "range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
                >
                  Range
                </button>
                <button
                  type="button"
                  onClick={() => handlePayTypeChange("starting")}
                  className={`px-3 py-2 rounded-md text-sm ${formData.payType === "starting" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
                >
                  Starting Amount
                </button>
              </div>
            </div>

            {formData.payType === "range" ? (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum (Rs)</label>
                  <input
                    type="number"
                    value={formData.minSalary}
                    onChange={(e) => setFormData(prev => ({ ...prev, minSalary: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum (Rs)</label>
                  <input
                    type="number"
                    value={formData.maxSalary}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxSalary: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Starting Amount (Rs)</label>
                <input
                  type="number"
                  value={formData.minSalary}
                  onChange={(e) => setFormData(prev => ({ ...prev, minSalary: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
              <div className="grid grid-cols-2 gap-2">
                {["per hour", "per day", "per week", "per month", "per year"].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handlePayRateChange(rate)}
                    className={`px-3 py-2 rounded-md text-sm ${formData.payRate === rate ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 border border-gray-300"}`}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium">Estimated Monthly Equivalent:</p>
              <p className="text-lg font-bold">{estimatedPay || "Enter values to see estimate"}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={calculateEstimatedPay}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Calculate Estimate
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => { calculateEstimatedPay(); setShowPayModal(false); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostJob;