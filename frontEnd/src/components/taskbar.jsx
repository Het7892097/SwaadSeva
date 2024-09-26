import React, { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../store/atoms/user";
import { useRecoilValue } from "recoil";
import ConfirmationModal from "./ConfirmationModal";
import { useRef } from "react";

const Taskbar = ({ aboutUsRef }) => {
  // State for menu toggle
  const [menuOpen, setMenuOpen] = useState(false);
  // State for logged-in and admin status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Get the current user data from Recoil
  const currentUser = useRecoilValue(userAtom);
  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleNavigateToAboutUs = () => {
    navigate("/", { state: { scrollTo: "about" } }); // Passing state
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  useEffect(() => {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem("cartList")) || [];
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    setTotal(totalAmount);
    setQuantity(totalQuantity);
  }, []);
  console.log(total);
  console.log(quantity);
  useEffect(() => {
    // Update the isLoggedIn and isAdmin based on currentUser
    if (currentUser) {
      setIsLoggedIn(!!currentUser.mobNo);
      setIsAdmin(currentUser.isAdmin || false);
    }
  }, [currentUser]); // Dependency on currentUser

  // Debugging purpose
  console.log(currentUser);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logOutHandler = () => {
    localStorage.removeItem("authorization");
    closeModal();
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
          <button
            onClick={() => navigate("/")}
            className="text-lg md:text-2xl font-bold text-black"
          >
            <span className="text-green-700">Swad</span>Seva
          </button>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate("/")}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium hover:underline underline-offset-4"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/explore")}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            Explore
          </button>
          <button
            onClick={handleNavigateToAboutUs}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            About Us
          </button>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Signup
              </button>
            </>
          ) : isAdmin ? (
            <>
              <button
                onClick={() => navigate("/admin/orders")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Today’s Orders
              </button>
              <button
                onClick={() => navigate("/admin/editfood")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Edit Products
              </button>
              <button
                onClick={() => navigate("/order")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Order
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/order")}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
            >
              Order
            </button>
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
                  <span className="badge badge-sm indicator-item">
                    {quantity}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold"></span>
                  <span className="text-info">{`Subtotal: ${total}`}</span>
                  <div className="card-actions">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="btn btn-primary btn-block"
                    >
                      Checkout
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
                    <span className="font-bold">
                      {currentUser.name ? currentUser.name : "RandomUser"}
                    </span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={openModal}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2 px-4">
          <button
            onClick={() => navigate("/")}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/explore")}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            Explore
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
          >
            About Us
          </button>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Signup
              </button>
            </>
          ) : isAdmin ? (
            <>
              <button
                onClick={() => navigate("/admin/orders")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Today’s Orders
              </button>
              <button
                onClick={() => navigate("/admin/editfood")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Edit Products
              </button>
              <button
                onClick={() => navigate("/order")}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
              >
                Order
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/order")}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 hover:text-black font-medium"
            >
              Order
            </button>
          )}
        </div>
      )}
      {/* Confirmation modal for logout */}
      <ConfirmationModal
        func="logout"
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          logOutHandler();
          // Close modal on confirm
        }}
      />
    </nav>
  );
};

export default Taskbar;
