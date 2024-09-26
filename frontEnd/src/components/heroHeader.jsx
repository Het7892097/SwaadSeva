import React from 'react';
import { useNavigate } from 'react-router-dom';
const HeroHeader = ({ isLoggedIn, isAdmin }) => {
  const navigate=useNavigate();

  return (
    <div className="relative">
    

      {/* Hero Section */}
      <header className="bg-white h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center h-full">
          
          {/* Left Side: Text Content */}
          <div className="text-left md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Enjoy Healthy Life & Tasty Food.
            </h1>
            <p className="text-gray-500 mt-4">
            Discover a world of delicious and nutritious meals designed to fuel your healthy lifestyle.
            </p>
            <div className="mt-6 flex space-x-4">
              <button  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all">
                Show more
              </button>
              <button onClick={()=>{navigate("/order")}} className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-100 transition-all">
                Place an order
              </button>
            </div>
          </div>

         {/* Right Side: Image */}
         <div className="md:w-1/2 md:pl-4">
            <img
              src="\src\Assets\about-background-image.png" // Replace with actual image URL
              alt="Healthy Food"
              className="rounded-lg  object-cover w-full h-full" // Updated classes
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeroHeader;
