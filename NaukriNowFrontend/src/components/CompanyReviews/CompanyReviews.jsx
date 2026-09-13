import { useState } from "react";
import { Link } from "react-router-dom";

const StarRating = ({ rating, size = "md" }) => {
  const starSize = size === "lg" ? "w-6 h-6" : "w-5 h-5";
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${starSize} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CompanyCard = ({ company, onCompanyClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onCompanyClick(company)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-xl font-semibold text-indigo-600">
            {company.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
          <div className="flex items-center mb-2">
            <StarRating rating={Math.round(company.rating)} />
            <span className="ml-2 text-sm font-medium text-gray-600">{company.rating.toFixed(1)}</span>
          </div>
          <p className="text-gray-600 text-sm">{company.reviews} reviews</p>
        </div>
      </div>
      <div className="flex space-x-4 pt-4 border-t border-gray-100">
        <span className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">Salaries</span>
        <span className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">Q&A</span>
        <span className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
          {company.openJobs || 12} open jobs
        </span>
      </div>
    </div>
  );
};

const CompanyReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [includeSalaries, setIncludeSalaries] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const companies = [
    { name: "K-ELECTRIC", reviews: 149, rating: 3.8, openJobs: 24 },
    { name: "Rainbow Cash & Carry", reviews: 9, rating: 4.2, openJobs: 7 },
    { name: "Bloomfield Hall School", reviews: 17, rating: 4.0, openJobs: 5 },
    { name: "Avari Hotel Lahore", reviews: 9, rating: 3.5, openJobs: 18 },
    { name: "The City School", reviews: 189, rating: 4.1, openJobs: 32 },
    { name: "NADRA", reviews: 58, rating: 3.2, openJobs: 41 },
    { name: "Panda mart", reviews: 3, rating: 4.5, openJobs: 9 },
    { name: "PTCL", reviews: 336, rating: 2.9, openJobs: 28 },
    { name: "10Pearls", reviews: 26, rating: 4.3, openJobs: 15 },
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log("Searching for:", searchQuery, "Include salaries:", includeSalaries);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleAddReview = () => {
    // In a real app, this would navigate to a review form
    console.log("Navigate to review form");
    setShowModal(false);
  };

  const handleViewAllReviews = () => {
    // In a real app, this would navigate to all reviews for this company
    console.log("Navigate to all reviews for", selectedCompany.name);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">
             
                <span className="text-indigo-600 font-bold text-2xl">NaukriNow</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/company-reviews"
                  className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1"
                >
                  Company Reviews
                </Link>
               
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
             <Link 
                    to="/employers"
                    className="hidden md:flex text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors font-medium"
                  >
                    Employers / Post Job
                  </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Great Places to Work</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get access to millions of company reviews, salary information, and interview experiences
          </p>
        </div>
        
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="company-search" className="block text-sm font-medium text-gray-700 mb-2">
                  Company name or job title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="company-search"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Search for companies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Find Companies
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="salary-search"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={includeSalaries}
                onChange={() => setIncludeSalaries(!includeSalaries)}
              />
              <label htmlFor="salary-search" className="ml-2 block text-sm text-gray-700">
                Include salary information in results
              </label>
            </div>
          </form>
        </div>

        {/* Popular Companies */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Companies</h2>
            <span className="text-sm text-gray-600">{filteredCompanies.length} companies</span>
          </div>
          
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard 
                  key={company.name} 
                  company={company} 
                  onCompanyClick={handleCompanyClick}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </section>

        {/* Rate Employer CTA */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Help others make better career decisions by sharing your experience with your current or previous employer.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-md"
          >
            Rate Your Employer
          </button>
        </div>

        {/* Resources Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Jobs</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Jobs in Karachi</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Jobs in Lahore</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Remote Jobs</Link></li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Companies</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">All Companies</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Top Companies</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Company Reviews</Link></li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Countries</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Pakistan</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">United States</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">United Kingdom</Link></li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">About</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">Help</Link></li>
              <li><Link to="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">ESG at NaukriNow</Link></li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-white font-bold text-xl">NaukriNow</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Center</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">Terms</Link>
              <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors text-sm">Accessibility</Link>
            </div>
            <p className="text-sm text-gray-400">© 2025 NaukriNow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Company Detail Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedCompany.name}</h3>
                <div className="flex items-center mt-2">
                  <StarRating rating={Math.round(selectedCompany.rating)} size="lg" />
                  <span className="ml-2 text-lg font-medium text-gray-600">{selectedCompany.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-600 mt-1">{selectedCompany.reviews} reviews</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mt-6 space-y-4">
              <button 
                onClick={handleViewAllReviews}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                View All Reviews
              </button>
              <button 
                onClick={handleAddReview}
                className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Add Your Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyReviews;