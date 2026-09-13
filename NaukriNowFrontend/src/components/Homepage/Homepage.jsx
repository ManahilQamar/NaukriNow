import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ballpit from "../Ballpit";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from "axios";

const Homepage = () => {
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [jobInput, setJobInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu



  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showJobSuggestions && !event.target.closest(".job-search-container")) {
        setShowJobSuggestions(false);
      }
      if (
        showLocationSuggestions &&
        !event.target.closest(".location-search-container")
      ) {
        setShowLocationSuggestions(false);
      }
      if (isDropdownOpen && !event.target.closest(".profile-menu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showJobSuggestions, showLocationSuggestions, isDropdownOpen]);

  // Token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // Search form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // If user is not logged in, redirect to login page
      if (!token) {
        navigate("/login");
        return;
      }

      // Navigate directly to jobs page with search parameters
      navigate(
        `/jobs?title=${encodeURIComponent(jobInput)}&location=${encodeURIComponent(
          locationInput
        )}`
      );
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data || error.message
      );
      alert(
        "Please log in to search for jobs."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">

                <span className="text-indigo-600 font-bold text-2xl">NaukriNow</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/company-reviews"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Company Reviews
                </Link>

              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="hidden md:block text-gray-700 px-4 py-2 rounded-md hover:text-indigo-600 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/employers"
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors font-medium"
                  >
                    Employers / Post Job
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4 relative profile-menu">
                  <Link
                    to="/employers"
                    className="hidden md:flex text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors font-medium"
                  >
                    Employers / Post Job
                  </Link>
                  {/* Profile Icon */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user?.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-indigo-400 transition-colors"
                    />
                  </button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Account
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden mobile-menu-container">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 hover:text-indigo-600 focus:outline-none"
                >
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mobile-menu-container">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/company-reviews"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Company Reviews
                </Link>
                <Link
                  to="/salary-guide"
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Salary Guide
                </Link>
                <Link
                  to="/employers"
                  className="block px-3 py-2 text-gray-700 rounded-md hover:text-indigo-600 transition-colors font-medium"
                >
                  Employers / Post Job
                </Link>

                {!isLoggedIn && (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                )}

              </div>
            </div>
          )}


        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl z-10 mx-auto mb-12">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Job Search Field with Dropdown */}
              <div className="relative job-search-container">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Job title, keywords, or company"
                    value={jobInput}
                    onChange={(e) => setJobInput(e.target.value)}
                    onClick={() => setShowJobSuggestions(true)}
                  />
                  {showJobSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        Recent searches
                      </div>
                      {['Software Engineer', 'Frontend Developer', 'Project Manager', 'Data Analyst'].map((job) => (
                        <div
                          key={job}
                          className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setJobInput(job);
                            setShowJobSuggestions(false);
                          }}
                        >
                          {job}
                        </div>
                      ))}
                      <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-100">
                        <Link to="/all-jobs" className="text-indigo-600 hover:underline font-medium">
                          Browse all jobs
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Field with Dropdown */}
              <div className="relative location-search-container">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="City, state, zip code, or 'remote'"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onClick={() => setShowLocationSuggestions(true)}
                  />
                  {showLocationSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        Popular locations
                      </div>
                      {['Remote', 'Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map((location) => (
                        <div
                          key={location}
                          className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setLocationInput(location);
                            setShowLocationSuggestions(false);
                          }}
                        >
                          {location}
                        </div>
                      ))}
                      <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-100">
                        <Link to="/locations" className="text-indigo-600 hover:underline font-medium">
                          View all locations
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Find Jobs
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-700 h-96 rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0 z-0">
            <Ballpit />
          </div>

          <div className="relative z-1 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job Today</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Search through thousands of job listings to find the perfect match for
              your skills and career goals.
            </p>
            <Link
              to="/jobs"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-md"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
            <div className="text-gray-600">Job Listings</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">5K+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">1M+</div>
            <div className="text-gray-600">Candidates</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">15+</div>
            <div className="text-gray-600">Industries</div>
          </div>
        </div>

        {/* Auth CTA */}
        {!isLoggedIn && (
          <div className="max-w-5xl mx-auto mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Supercharge Your Job Search
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Create an account or sign in to save jobs, get personalized recommendations, and apply with one click.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-md"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

               {/* Trending Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Explore Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Browse Jobs</h4>
              <p className="text-gray-600">
                Explore millions of job listings from top companies across various industries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Company Reviews</h4>
              <p className="text-gray-600">
                Discover companies and read authentic reviews from current and former employees.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Global Opportunities</h4>
              <p className="text-gray-600">
                Find job opportunities in different countries and explore international careers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured Companies */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Featured Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "TechCorp", logo: "💻" },
              { name: "DataSystems", logo: "📊" },
              { name: "WebSolutions", logo: "🌐" },
              { name: "CloudTech", logo: "☁️" }
            ].map((company, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{company.logo}</div>
                <div className="font-medium text-gray-800">{company.name}</div>
                <div className="text-sm text-indigo-600 mt-1">View Jobs →</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand + social */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center mb-4">
                <span className="text-white font-bold text-2xl">NaukriNow</span>
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting talented professionals with great companies. Find your dream job or ideal candidate today.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/manahil-qamar-41bb45323/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/meno.coder/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <FaInstagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Job Seekers */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/career-advice" className="text-gray-400 hover:text-white transition-colors">Career Advice</Link></li>
                <li><Link to="/resume-builder" className="text-gray-400 hover:text-white transition-colors">Resume Builder</Link></li>
              </ul>
            </div>

            {/* Employers */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/post-job" className="text-gray-400 hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/recruitment-solutions" className="text-gray-400 hover:text-white transition-colors">Recruitment Solutions</Link></li>
                <li><Link to="/employer-dashboard" className="text-gray-400 hover:text-white transition-colors">Employer Dashboard</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 NaukriNow. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors mr-4">Sitemap</Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
};


export default Homepage;

