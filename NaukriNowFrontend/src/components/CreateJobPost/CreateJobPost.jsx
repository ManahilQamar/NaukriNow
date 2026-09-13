import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateJobPost = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert("Please select an option before continuing.");
      return;
    }
    navigate("/post-job");
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-md shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create a job post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="flex items-start p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="jobOption"
              value="continue"
              checked={selectedOption === "continue"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Continue with your job post</p>
              <p className="text-sm text-gray-500">
                We've saved your progress so you can pick up where you left off.
              </p>
            </div>
          </label>

          <label className="flex items-start p-4 border rounded-md cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="jobOption"
              value="new"
              checked={selectedOption === "new"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Create a brand new post</p>
            </div>
          </label>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 text-lg py-4 rounded-md hover:bg-indigo-700"
            >
              Continue →
            </button>
          </div>
        </form>

        <div className="mt-8 text-xs text-gray-500 space-x-2">
          <span>©2025 Indeed</span> •
          <a href="#" className="hover:underline">Cookies, privacy and terms</a> •
          <a href="#" className="hover:underline">Privacy center</a> •
          <a href="#" className="hover:underline">Security</a> •
          <a href="#" className="hover:underline">Billing</a> •
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPost;