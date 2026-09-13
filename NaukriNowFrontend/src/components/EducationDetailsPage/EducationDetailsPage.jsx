import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EducationDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("jobId") || "";

  const [formData, setFormData] = useState({
    educationLevel: '',
    fieldOfStudy: '',
    schoolName: '',
    country: 'Pakistan',
    schoolLocation: '',
    currentlyEnrolled: false,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const educationLevels = [
    'High School', 'Associate Degree', "Bachelor's Degree", "Master's Degree",
    'Doctorate', 'Diploma', 'Certificate', 'Other'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const countries = [
    'Pakistan', 'United States', 'India', 'United Kingdom', 'Canada',
    'Australia', 'Germany', 'France', 'United Arab Emirates', 'Saudi Arabia'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.educationLevel) newErrors.educationLevel = 'Level of education is required';
    if (!formData.schoolName) newErrors.schoolName = 'School name is required';
    if (!formData.startMonth || !formData.startYear) newErrors.startDate = 'Start date is required';
    if (!formData.currentlyEnrolled && (!formData.endMonth || !formData.endYear)) {
      newErrors.endDate = 'End date is required';
    }
    return newErrors;
  };

  // Application flow complete karo: education save, phir (agar jobId hai) JobApplication submit
  const finalizeApplication = async (token) => {
    if (!jobId) {
      // Ye education-details generic profile update ke liye khola gaya tha (job apply flow se nahi)
      navigate('/dashboard');
      return;
    }

    try {
      const [contactRes, addressRes] = await Promise.all([
       axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, {
  headers: { Authorization: `Bearer ${token}` }
}).catch(() => null),
axios.get(`${import.meta.env.VITE_API_URL}/api/address`, {
  headers: { Authorization: `Bearer ${token}` }
}).catch(() => null),
      ]);

      const contactInfo = contactRes?.data?.contactInfo || {};
      const address = addressRes?.data?.address || {};

      const storedResume = localStorage.getItem(`applyResume_${jobId}`);
      const resume = storedResume ? JSON.parse(storedResume) : undefined;

     await axios.post(
  `${import.meta.env.VITE_API_URL}/api/jobapplications`,
  { jobId, contactInfo, address, resume },
  { headers: { Authorization: `Bearer ${token}` } }
);

      localStorage.removeItem(`applyResume_${jobId}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError(
        error.response?.data?.message || 'Failed to submit application. Please try again.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setSubmitError('Please login to save your education details');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
`${import.meta.env.VITE_API_URL}/api/education`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await finalizeApplication(token);
    } catch (error) {
      console.error('Error saving education details:', error);
      setSubmitError(error.response?.data?.message || 'Failed to save education details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center mb-4 overflow-x-auto">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium">1</span>
              </div>
              <div className="w-10 sm:w-16 h-1 bg-blue-600 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium">2</span>
              </div>
              <div className="w-10 sm:w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium">3</span>
              </div>
              <div className="w-10 sm:w-16 h-1 bg-gray-300 mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium">4</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Build your resume (1 of 4)</h1>
          <p className="mt-2 text-gray-600">Do you want to add any education details?</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Please fill out the form below. <span className="text-red-500">*required</span>
            </h2>
          </div>

          {submitError && (
            <div className="mx-6 mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="mb-6">
              <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Level of education <span className="text-red-500">*</span>
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.educationLevel ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select level of education</option>
                {educationLevels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
              {errors.educationLevel && <p className="mt-1 text-sm text-red-600">{errors.educationLevel}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">Field of study</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Computer Science, Business Administration"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                School name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.schoolName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g. University of Example"
              />
              {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {countries.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="schoolLocation" className="block text-sm font-medium text-gray-700 mb-1">School location</label>
                <input
                  type="text"
                  id="schoolLocation"
                  name="schoolLocation"
                  value={formData.schoolLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Islamabad, Pakistan"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Time period</h3>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="currentlyEnrolled"
                  name="currentlyEnrolled"
                  checked={formData.currentlyEnrolled}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="currentlyEnrolled" className="ml-2 block text-sm text-gray-700">Currently enrolled</label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="startMonth"
                      value={formData.startMonth}
                      onChange={handleChange}
                      className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Month</option>
                      {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                    </select>
                    <select
                      name="startYear"
                      value={formData.startYear}
                      onChange={handleChange}
                      className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Year</option>
                      {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                  </div>
                  {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                </div>

                {!formData.currentlyEnrolled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        name="endMonth"
                        value={formData.endMonth}
                        onChange={handleChange}
                        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Month</option>
                        {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                      </select>
                      <select
                        name="endYear"
                        value={formData.endYear}
                        onChange={handleChange}
                        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Year</option>
                        {years.map(year => <option key={year} value={year}>{year}</option>)}
                      </select>
                    </div>
                    {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save and Continue"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>©2025 NaukriNow - Cookies, Privacy and Terms</p>
        </div>
      </div>
    </div>
  );
};

export default EducationDetailsPage;