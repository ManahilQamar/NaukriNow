import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <div className="bg-indigo-600 text-white p-1 rounded-md mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-indigo-600 font-bold text-2xl">NaukriNow</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/employers"
                className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1"
              >
                For Employers
              </Link>
              <Link
                to="/company-reviews"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Company Reviews
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            
            <Link
              to="/employer-signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;