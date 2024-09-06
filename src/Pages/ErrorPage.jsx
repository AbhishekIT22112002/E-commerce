// src/components/ErrorPage.jsx
import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  // Trigger the animation after component mounts
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300); // Delay to ensure smooth pop-out effect
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://wallpapercave.com/uwp/uwp4484474.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      
      <div
        className={`relative z-10 text-center text-white px-6 transition-all duration-700 ease-out ${
          animate ? 'transform scale-100 opacity-100' : 'transform scale-75 opacity-0'
        }`}
      >
        {/* Error Text */}
        <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>

        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
