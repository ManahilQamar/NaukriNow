import React from 'react';
import { Link, useParams } from "react-router-dom";

const CompanyDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/" className="text-blue-600 font-bold text-2xl">NaukriNow</Link>
              <nav className="flex gap-4">
                <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">Find jobs</Link>
                <Link to="/company-reviews" className="text-gray-600 hover:text-blue-600 text-sm">Company Reviews</Link>
                <Link to="/salary-guide" className="text-gray-600 hover:text-blue-600 text-sm">Find salaries</Link>
              </nav>
            </div>
            <nav className="flex gap-4">
              <Link to="/resume-upload" className="text-gray-600 hover:text-blue-600 text-sm">Upload your resume</Link>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 text-sm">Sign in</Link>
              <Link to="/employers" className="text-gray-600 hover:text-blue-600 text-sm">Employers / Post Job</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Company Details</h1>
          <p className="text-gray-600 mb-6">
            {id ? `Viewing details for company ID: ${id}` : "Company information will appear here."}
          </p>
          {/* TODO: yahan backend se actual company data fetch karke dikhana hai
             — abhi backend mein Company model/route nahi hai, agar chahiye to bata dena banwa deti hoon */}
          <div className="flex justify-center">
            <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
              Return home
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link to="/privacy" className="hover:text-blue-600">Privacy Center</Link>
            <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
          </div>
          <p>© {new Date().getFullYear()} NaukriNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CompanyDetail;