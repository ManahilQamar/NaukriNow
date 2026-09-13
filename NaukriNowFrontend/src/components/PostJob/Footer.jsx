import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
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
  );
};

export default Footer;
