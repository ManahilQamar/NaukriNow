import {Link, useNavigate  } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handlePostJobClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/employer-signup");
    } else {
      navigate("/signup?redirect=/post-job");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Hiring that's simpler, faster, and more human
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Connect with top talent and build your dream team with NaukriNow's powerful hiring platform.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handlePostJobClick}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium text-lg"
              >
                Post a Job
              </button>
              
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-white p-2 rounded-2xl shadow-xl">
                <img 
                  src="https://media.istockphoto.com/id/1224500457/photo/programming-code-abstract-technology-background-of-software-developer-and-computer-script.jpg?s=612x612&w=0&k=20&c=nHMypkMTU1HUUW85Zt0Ff7MDbq17n0eVeXaoM9Knt4Q=" 
                  alt="Team collaboration" 
                  className="rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-indigo-600">59,582,816</div>
                <div className="text-gray-600">active job seekers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;