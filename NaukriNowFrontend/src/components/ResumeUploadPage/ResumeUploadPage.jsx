import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResumeUploadPage = () => {
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("jobId") || "";

  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const validTypes = [".pdf", ".docx", ".doc", ".rtf", ".txt"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const validateAndSetFile = (selectedFile) => {
    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validTypes.includes(fileExtension)) {
      alert("Please select a valid file type (PDF, DOCX, DOC, RTF, or TXT)");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = async () => {
    if (selectedOption === "upload" && !file) {
      alert("Please upload a resume file");
      return;
    }
    if (!file) {
      // upload option select nahi kiya ya file nahi di, sirf aage badh do
      navigate(`/education-details?jobId=${jobId}`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        "http://localhost:5000/api/resume/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Resume path ko is application flow ke liye temporarily save karo
      // taake education step pe final application submit karte waqt use ho sake
      if (jobId) {
        localStorage.setItem(
          `applyResume_${jobId}`,
          JSON.stringify({ fileUrl: response.data.filePath, type: fileName.split(".").pop() })
        );
      }

      navigate(`/education-details?jobId=${jobId}`);
    } catch (error) {
      console.error("Error submitting application", error);
      alert(error.response?.data?.message || "Error uploading resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div
                className={`border-2 rounded-lg p-6 mb-6 cursor-pointer transition-all duration-200 ${
                  selectedOption === "upload" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleOptionSelect("upload")}
              >
                <div className="flex items-start">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 mt-1 ${
                      selectedOption === "upload" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                    }`}
                  >
                    {selectedOption === "upload" && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload a resume</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Accepted file types are PDF (recommended), DOCX, DOC, RTF, or TXT.
                    </p>

                    {selectedOption === "upload" && (
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${
                          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleUploadClick}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.docx,.doc,.rtf,.txt"
                          className="hidden"
                        />
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">{fileName || "Click to upload or drag and drop"}</p>
                        <p className="text-xs text-gray-500">PDF, DOCX, DOC, RTF, TXT (MAX. 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center my-8">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleContinue}
                  disabled={!selectedOption || isUploading}
                  className={`w-full py-3 px-4 rounded-md text-sm font-medium ${
                    selectedOption && !isUploading
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;