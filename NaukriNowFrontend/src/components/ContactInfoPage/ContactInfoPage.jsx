import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const ContactInfoPage = () => {
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("jobId") || "";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+92',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    { code: '+92', name: 'Pakistan' },
    { code: '+86', name: 'China' },
    { code: '+81', name: 'Japan' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+61', name: 'Australia' },
    { code: '+55', name: 'Brazil' }
  ];

  const getAuthToken = () => localStorage.getItem('token');
  const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = getAuthToken();
      const user = getUser();

      if (user) {
        const [firstName = '', lastName = ''] = (user.name || '').split(' ');
        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: user.email || prev.email
        }));
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.contactInfo) {
          setFormData((prev) => ({
            ...prev,
            firstName: response.data.contactInfo.firstName || prev.firstName,
            lastName: response.data.contactInfo.lastName || prev.lastName,
            email: response.data.contactInfo.email || prev.email,
            phoneCode: response.data.contactInfo.phoneCode || '+92',
            phoneNumber: response.data.contactInfo.phoneNumber || ''
          }));
        }
      } catch (error) {
        console.log('Error fetching contact data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phone) => !phone || /^\d{5,}$/.test(phone.replace(/\D/g, ''));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (formData.email && !validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid phone number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setMessage('Please login to save your contact information');
      return;
    }

    try {
    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneCode: formData.phoneCode,
          phoneNumber: formData.phoneNumber
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Contact information updated successfully!');
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
      if (error.response?.status === 401) {
        setMessage('Please login to save your contact information');
      } else {
        setMessage('Error saving contact information. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add your contact information</h1>
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes('Error') || message.includes('login') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <div className="flex space-x-2">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  className="block w-28 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.name})
                    </option>
                  ))}
                </select>
                <div className="flex-1">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Phone number"
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Save Information
              </button>
              <Link
                to={`/address-update?jobId=${jobId}`}
                className="w-full py-2 px-4 rounded-md text-center border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue to Address
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPage;