import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export default function AddressUpdatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get("jobId") || "";

  const [address, setAddress] = useState({
    country: 'Pakistan',
    postcode: '',
    city: '',
    province: '',
    street: ''
  });

  const [showCountryForm, setShowCountryForm] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const countries = [
    "Pakistan", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Canada", "China", "Egypt", "France", "Germany", "India", "Japan",
    "Saudi Arabia", "United Arab Emirates", "United Kingdom", "United States"
  ];

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }
const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/address`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.address) {
          setAddress(res.data.address);
        }
      } catch (err) {
        console.error("Failed to fetch address", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const handleCountryChange = (country) => {
    setAddress({ ...address, country });
    setShowCountryForm(false);
    setCountrySearch('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
await axios.post(`${import.meta.env.VITE_API_URL}/api/address`, address, {
          headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/resume-upload?jobId=${jobId}`);
    } catch (err) {
      console.error("Failed to save address", err);
      alert("Address save nahi ho saki. Dobara try karein.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Review your location details from your profile
          </h1>
          <p className="text-gray-600">
            Sharing location helps connect you with relevant jobs and estimate your commute time.
            We'll save any changes to your profile.
          </p>
        </header>

        {/* Country Section */}
        <section className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Country</h2>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Country</div>
              <div className="font-medium">{address.country}</div>
            </div>
            <button
              onClick={() => setShowCountryForm(!showCountryForm)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Change
            </button>
          </div>

          {showCountryForm && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label htmlFor="country-search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search for a country
                </label>
                <input
                  type="text"
                  id="country-search"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder="Start typing to search..."
                  className="w-full p-2 border border-gray-300 rounded-md mb-3"
                />
                <div className="border border-gray-300 rounded-md max-h-60 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <div
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className={`p-2 cursor-pointer hover:bg-blue-50 ${
                          address.country === country ? 'bg-blue-100 font-medium' : ''
                        }`}
                      >
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No countries found</div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => { setShowCountryForm(false); setCountrySearch(''); }}
                  className="px-4 py-2 border border-gray-300 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Postcode + City */}
        <section className="mb-6 pb-6 border-b border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Postcode</h2>
            <input
              type="text"
              name="postcode"
              value={address.postcode}
              onChange={handleInputChange}
              placeholder="Enter your postcode"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">City, Province/Territory</h2>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </section>

        {/* Street */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Street address</h2>
          <div className="p-4 bg-gray-50 rounded-lg mb-2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleInputChange}
              placeholder="Enter your street address"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <p className="text-sm text-gray-500 italic">Not shown to employers</p>
        </section>

        <button
          onClick={handleContinue}
          disabled={isSaving}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}