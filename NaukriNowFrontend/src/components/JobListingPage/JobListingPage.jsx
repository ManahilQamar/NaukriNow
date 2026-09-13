import { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobListingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Get URL parameters
  const urlJobTitle = searchParams.get('title') || '';
  const urlJobLocation = searchParams.get('location') || '';
  const urlJobCompany = searchParams.get('company') || '';

  // Search states
  const [searchTitle, setSearchTitle] = useState(urlJobTitle);
  const [searchLocation, setSearchLocation] = useState(urlJobLocation);
  const [searchCompany, setSearchCompany] = useState(urlJobCompany);

  // Filters & Pagination States
  const [salaryFilter, setSalaryFilter] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [datePostedFilter, setDatePostedFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [radiusFilter, setRadiusFilter] = useState('25');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPayDropdown, setShowPayDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showDatePostedDropdown, setShowDatePostedDropdown] = useState(false);

  // Data states
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);

  // Refs for dropdowns
  const payDropdownRef = useRef(null);
  const jobTypeDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const datePostedDropdownRef = useRef(null);

  // Update search fields when URL params change
  useEffect(() => {
    setSearchTitle(urlJobTitle);
    setSearchLocation(urlJobLocation);
    setSearchCompany(urlJobCompany);
  }, [urlJobTitle, urlJobLocation, urlJobCompany]);

  // Fetch jobs when filters or page change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Calculate date based on filter
        let postedDate = '';
        if (datePostedFilter === '24hours') {
          postedDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        } else if (datePostedFilter === '3days') {
          postedDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
        } else if (datePostedFilter === '7days') {
          postedDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        }

        // Build query parameters
        const params = new URLSearchParams();
        if (urlJobTitle) params.append('title', urlJobTitle);
        if (urlJobLocation) params.append('location', urlJobLocation);
        if (urlJobCompany) params.append('company', urlJobCompany);
        if (minSalary) params.append('minSalary', minSalary);
        if (maxSalary) params.append('maxSalary', maxSalary);
        if (jobTypeFilter) params.append('jobType', jobTypeFilter);
        if (postedDate) params.append('datePosted', postedDate);
        if (languageFilter) params.append('language', languageFilter);
        params.append('page', currentPage);
        params.append('limit', 10);

const url = `${import.meta.env.VITE_API_URL}/api/jobs?${params.toString()}`;
        const response = await axios.get(url);

        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
        setTotalJobs(response.data.totalCount);

        if (response.data.jobs.length > 0 && !selectedJob) {
          setSelectedJob(response.data.jobs[0]);
        }
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlJobTitle, urlJobLocation, urlJobCompany, minSalary, maxSalary, jobTypeFilter, currentPage, datePostedFilter, languageFilter]);

  // Reset page to 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [urlJobTitle, urlJobLocation, urlJobCompany, salaryFilter, jobTypeFilter, datePostedFilter, languageFilter]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTitle) params.append('title', searchTitle);
    if (searchLocation) params.append('location', searchLocation);
    if (searchCompany) params.append('company', searchCompany);

    setCurrentPage(1);
    navigate(`/jobs?${params.toString()}`);
  };

  // Apply salary filter
  const applySalaryFilter = () => {
    setSalaryFilter(`${minSalary}-${maxSalary}`);
    setShowPayDropdown(false);
  };

  // Clear salary filter
  const clearSalaryFilter = () => {
    setMinSalary('');
    setMaxSalary('');
    setSalaryFilter('');
    setShowPayDropdown(false);
  };

  // Toggle job type filter
  const toggleJobTypeFilter = (type) => {
    if (jobTypeFilter === type) {
      setJobTypeFilter('');
    } else {
      setJobTypeFilter(type);
    }
    setShowJobTypeDropdown(false);
  };

  // Toggle language filter
  const toggleLanguageFilter = (language) => {
    if (languageFilter === language) {
      setLanguageFilter('');
    } else {
      setLanguageFilter(language);
    }
    setShowLanguageDropdown(false);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [payDropdownRef, jobTypeDropdownRef, languageDropdownRef, datePostedDropdownRef];

      refs.forEach(ref => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref === payDropdownRef) setShowPayDropdown(false);
          if (ref === jobTypeDropdownRef) setShowJobTypeDropdown(false);
          if (ref === languageDropdownRef) setShowLanguageDropdown(false);
          if (ref === datePostedDropdownRef) setShowDatePostedDropdown(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format salary range for display
  const formatSalaryRange = () => {
    if (!minSalary && !maxSalary) return '';
    if (minSalary && maxSalary) return `$${minSalary} - $${maxSalary}`;
    if (minSalary) return `From $${minSalary}`;
    if (maxSalary) return `Up to $${maxSalary}`;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTitle('');
    setSearchLocation('');
    setSearchCompany('');
    setSalaryFilter('');
    setMinSalary('');
    setMaxSalary('');
    setJobTypeFilter('');
    setDatePostedFilter('');
    setLanguageFilter('');
    setCurrentPage(1);
    navigate('/jobs');
  };

  // Check if any filters are active
  const hasActiveFilters = urlJobTitle || urlJobLocation || urlJobCompany ||
                          salaryFilter || jobTypeFilter || datePostedFilter || languageFilter;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-blue-600 font-bold text-2xl">NaukriNow</Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 hover:underline">Home</Link>
                <Link to="/company-reviews" className="text-gray-600 hover:text-blue-600 hover:underline">Company Reviews</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Job title, keywords, or company"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="City, state, or zip code"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-sm">
                Find jobs
              </button>
            </div>
          </form>

          {/* Indeed-Style Filters */}
          <div className="flex flex-wrap items-center mt-4 gap-2">
            {/* Pay Filter */}
            <div className="relative" ref={payDropdownRef}>
              <button
                type="button"
                className={`flex items-center text-sm px-3 py-1 rounded-md ${salaryFilter ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setShowPayDropdown(!showPayDropdown)}
              >
                <span>{salaryFilter ? formatSalaryRange() : 'Pay'}</span>
                <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showPayDropdown && (
                <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700">Pay</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex space-x-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                        <input
                          type="number"
                          placeholder="$0"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          value={minSalary}
                          onChange={(e) => setMinSalary(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                        <input
                          type="number"
                          placeholder="$100,000"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          value={maxSalary}
                          onChange={(e) => setMaxSalary(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={radiusFilter === '25'}
                          onChange={() => setRadiusFilter('25')}
                        />
                        <span className="ml-2 text-sm text-gray-700">Within 25 miles</span>
                      </label>
                    </div>
                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:text-blue-800"
                        onClick={clearSalaryFilter}
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                        onClick={applySalaryFilter}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Job Type Filter */}
            <div className="relative" ref={jobTypeDropdownRef}>
              <button
                type="button"
                className={`flex items-center text-sm px-3 py-1 rounded-md ${jobTypeFilter ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
              >
                <span>{jobTypeFilter ? jobTypeFilter.charAt(0).toUpperCase() + jobTypeFilter.slice(1) : 'Job Type'}</span>
                <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showJobTypeDropdown && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700">Job Type</h4>
                  </div>
                  <div className="px-4 py-2">
                    {['full-time', 'part-time', 'contract', 'internship'].map((type) => (
                      <label key={type} className="flex items-center mt-2 first:mt-0">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={jobTypeFilter === type}
                          onChange={() => toggleJobTypeFilter(type)}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Filter */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                type="button"
                className={`flex items-center text-sm px-3 py-1 rounded-md ${languageFilter ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <span>{languageFilter ? languageFilter.charAt(0).toUpperCase() + languageFilter.slice(1) : 'Language'}</span>
                <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showLanguageDropdown && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700">Language</h4>
                  </div>
                  <div className="px-4 py-2">
                    {['english', 'urdu'].map((language) => (
                      <label key={language} className="flex items-center mt-2 first:mt-0">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={languageFilter === language}
                          onChange={() => toggleLanguageFilter(language)}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {language.charAt(0).toUpperCase() + language.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Date Posted Filter */}
            <div className="relative" ref={datePostedDropdownRef}>
              <button
                type="button"
                className={`flex items-center text-sm px-3 py-1 rounded-md ${datePostedFilter ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setShowDatePostedDropdown(!showDatePostedDropdown)}
              >
                <span>
                  {datePostedFilter === '24hours' ? 'Last 24 hours' :
                   datePostedFilter === '3days' ? 'Last 3 days' :
                   datePostedFilter === '7days' ? 'Last 7 days' :
                   'Date Posted'}
                </span>
                <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showDatePostedDropdown && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700">Date Posted</h4>
                  </div>
                  <div className="px-4 py-2">
                    {[
                      { value: '24hours', label: 'Last 24 hours' },
                      { value: '3days', label: 'Last 3 days' },
                      { value: '7days', label: 'Last 7 days' },
                      { value: '', label: 'Any time' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center mt-2 first:mt-0">
                        <input
                          type="radio"
                          name="date-posted"
                          className="h-4 w-4 text-blue-600 border-gray-300"
                          checked={datePostedFilter === option.value}
                          onChange={() => setDatePostedFilter(option.value)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job List Container */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {totalJobs > 0 ? `${totalJobs}+ jobs` : 'Jobs'} in {urlJobLocation || 'Pakistan'}
                </h1>
                <p className="text-gray-600">Sorted by: Relevance - Date</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {urlJobTitle && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Title: {urlJobTitle}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={() => {
                      const params = new URLSearchParams(location.search);
                      params.delete('title');
                      navigate(`/jobs?${params.toString()}`);
                    }}
                  >
                    ×
                  </button>
                </span>
              )}
              {urlJobLocation && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Location: {urlJobLocation}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={() => {
                      const params = new URLSearchParams(location.search);
                      params.delete('location');
                      navigate(`/jobs?${params.toString()}`);
                    }}
                  >
                    ×
                  </button>
                </span>
              )}
              {urlJobCompany && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Company: {urlJobCompany}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={() => {
                      const params = new URLSearchParams(location.search);
                      params.delete('company');
                      navigate(`/jobs?${params.toString()}`);
                    }}
                  >
                    ×
                  </button>
                </span>
              )}
              {salaryFilter && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Salary: {formatSalaryRange()}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={clearSalaryFilter}
                  >
                    ×
                  </button>
                </span>
              )}
              {jobTypeFilter && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Job Type: {jobTypeFilter}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={() => setJobTypeFilter('')}
                  >
                    ×
                  </button>
                </span>
              )}
              {datePostedFilter && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Date: {datePostedFilter === '24hours' ? 'Last 24 hours' :
                        datePostedFilter === '3days' ? 'Last 3 days' :
                        'Last 7 days'}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={() => setDatePostedFilter('')}
                  >
                    ×
                  </button>
                </span>
              )}
              {languageFilter && (
                <span className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Language: {languageFilter}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800"
                    onClick={() => setLanguageFilter('')}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            {/* Job List or Loading/Error */}
            {loading ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-gray-600 mt-4">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-red-500">{error}</p>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className={`job-card bg-white p-6 rounded-lg border ${selectedJob && selectedJob._id === job._id ? 'border-blue-400 border-2' : 'border-gray-200'} hover:border-blue-300 transition-colors cursor-pointer`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                          <div className="flex items-center mt-1">
                            <span className="text-blue-600 font-medium">{job.company}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-600">{job.location}</span>
                          </div>
                          <p className="text-gray-700 mt-2 line-clamp-2">{job.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Typically responds within 4 days
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {job.jobType}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Easily apply
                            </span>
                            {job.salary && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</span>
                          {job.salary && (
                            <span className="text-sm text-gray-700 mt-1">{job.salary}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-4 mt-8">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 disabled:hover:bg-blue-600"
                    >
                      Previous
                    </button>
                    <div className="flex items-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 mx-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 disabled:hover:bg-blue-600"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Job Details Container */}
          <div className="w-full lg:w-1/2">
            {selectedJob ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                <div className="flex items-center mb-4">
                  <span className="text-blue-600 font-medium">{selectedJob.company}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{selectedJob.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Typically responds within 4 days
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedJob.jobType}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Easily apply
                  </span>
                  {selectedJob.salary && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {selectedJob.salary}
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Job Details</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Qualifications</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>3+ years of experience in frontend development</li>
                    <li>Proficiency in React.js, JavaScript, HTML, and CSS</li>
                    <li>Experience with state management libraries like Redux</li>
                    <li>Familiarity with RESTful APIs and modern authorization mechanisms</li>
                    <li>Strong problem-solving skills and attention to detail</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Develop new user-facing features using React.js</li>
                    <li>Build reusable components and front-end libraries for future use</li>
                    <li>Translate designs and wireframes into high-quality code</li>
                    <li>Optimize components for maximum performance across a vast array of web-capable devices and browsers</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Health insurance</li>
                    <li>Flexible working hours</li>
                    <li>Remote work options</li>
                    <li>Professional development opportunities</li>
                  </ul>
                </div>

               <Link
  to={`/contact-info?jobId=${selectedJob._id}`}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md shadow-sm mb-4 block text-center"
>
  Apply Now
</Link>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Posted {new Date(selectedJob.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>30 applicants</span>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center flex items-center justify-center h-full">
                <div>
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a job to view details</h3>
                  <p className="text-gray-600">Click on a job listing to see the full description and requirements</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-blue-600">About Us</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-600 hover:text-blue-600">Careers</Link></li>
                <li><Link to="/press" className="text-sm text-gray-600 hover:text-blue-600">Press Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Help</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-sm text-gray-600 hover:text-blue-600">Help Center</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">ESG at NaukriNow</h4>
              <ul className="space-y-2">
                <li><Link to="/sustainability" className="text-sm text-gray-600 hover:text-blue-600">Sustainability</Link></li>
                <li><Link to="/diversity" className="text-sm text-gray-600 hover:text-blue-600">Diversity & Inclusion</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Privacy Center</Link></li>
                <li><Link to="/ad-choices" className="text-sm text-gray-600 hover:text-blue-600">Ad Choices</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 NaukriNow</p>
            <Link to="/accessibility" className="text-sm text-blue-600 hover:underline mt-4 md:mt-0">Accessibility at NaukriNow</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobListingPage;