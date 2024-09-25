import React, { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../store/atoms/user";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
const Taskbar = () => {
   // State for menu toggle
   const [menuOpen, setMenuOpen] = useState(false);

   // State for logged-in and admin status
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
 
   // Get the current user data from Recoil
   const currentUser = useRecoilValue(userAtom);
 
   useEffect(() => {
     // Update the isLoggedIn and isAdmin based on currentUser
     setIsLoggedIn(currentUser.mobNo ? true : false);
     setIsAdmin(currentUser.isAdmin || false);
   }, [currentUser]); // Dependency on currentUser
 
   // Debugging purpose
   console.log(currentUser)

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-transparent mx-auto m-2 border-orange-600 border-2 rounded-lg shadow-2xl shadow-red-300 w-full max-w-7xl px-4 py-2">
      <div className="flex justify-between items-center">
        {/* Responsive Burger Menu (Mobile view) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            {/* Burger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Left Side: Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-lg md:text-2xl font-bold text-black">
            <span className="text-green-700">Foodie</span>Space
          </a>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium hover:underline underline-offset-4"
          >
            Home
          </a>
          <a
            href="/explore"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            Explore
          </a>
          <a
            href="/about"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            About Us
          </a>

          {!isLoggedIn ? (
            <>
              <a
                href="/signin"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Signup
              </a>
            </>
          ) : isAdmin ? (
            <>
              <a
                href="/admin/orders"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Today’s Orders
              </a>
              <a
                href="/admin/editfood"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Edit Products
              </a>
              <a
                href="/order"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Order
              </a>
            </>
          ) : (
            <>
              <a
                href="/order"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Order
              </a>
            </>
          )}
        </div>

        {/* User Avatar and Cart */}
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                      {/* Checkout //on click go to /checkout */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2 px-4">
          <a
            href="/"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            {" "}
            Home
          </a>
          <a
            href="/explore"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            {" "}
            Explore
          </a>
          <a
            href="/about"
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            {" "}
            About
          </a>

          {!isLoggedIn ? (
            <>
              <a
                href="/signin"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Signup
              </a>
            </>
          ) : isAdmin ? (
            <>
              <a
                href="/order"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Order
              </a>
              <a
                href="/admin/orders"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Today’s Orders
              </a>

              <a
                href="/admin/editfood"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Edit Products
              </a>
            </>
          ) : (
            <>
              <a
                href="/order"
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Order
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Taskbar;
