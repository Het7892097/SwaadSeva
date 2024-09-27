import { CgEnter } from "react-icons/cg";
import { IoEnter, IoEnterOutline } from "react-icons/io5";
const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Foodtuck</h4>
            <p className="mb-4">
              Subscribe our newsletter and get discount 25% off
            </p>
            <div className="flex items-center mb-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="py-2 px-4 w-full border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700">
                Enter
              </button>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-pink-500">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" className="text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-700">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-pink-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-red-500">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact us</h4>
            <p className="mb-2 flex items-start">
              <span className="mr-2 text-green-600">
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
                    d="M16 8V6a4 4 0 00-8 0v2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2h-3z"
                  />
                </svg>
              </span>
              Ahmedabad India, 3rd Floor, Office 45
            </p>
            <p className="mb-2 flex items-start">
              <span className="mr-2 text-green-600">
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
                    d="M3 10l7-7m0 0l7 7M10 3v14"
                  />
                </svg>
              </span>
              9825------
            </p>
            <p className="mb-2 flex items-start">
              <span className="mr-2 text-green-600">
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
                    d="M16 8V6a4 4 0 00-8 0v2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2h-3z"
                  />
                </svg>
              </span>
              M.Alyaqout@4house.Co
            </p>
            <p className="flex items-start">
              <span className="mr-2 text-green-600">
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
                    d="M12 8v4l3 3"
                  />
                </svg>
              </span>
              Sun - Sat / 10:00 AM - 8:00 PM
            </p>
          </div>

          {/* Links Section
          <div>
            <h4 className="text-xl font-semibold mb-4">Links</h4>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">About us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Our Menu</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">FAQ</a></li>
            </ul>
          </div> */}

          {/* Instagram Gallery */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Instagram Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              {/* Image placeholders */}
              <img
                src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                alt="gallery"
                className="w-full h-20 object-cover rounded-md"
              />
              <img
                src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                alt="gallery"
                className="w-full h-20 object-cover rounded-md"
              />
              <img
                src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                alt="gallery"
                className="w-full h-20 object-cover rounded-md"
              />
              <img
                src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                alt="gallery"
                className="w-full h-20 object-cover rounded-md"
              />
              <img
                src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                alt="gallery"
                className="w-full h-20 object-cover rounded-md"
              />
              <img
                src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
                alt="gallery"
                className="w-full h-20 object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t p-6 text-white bg-green-500">
          <p className=" text-sm">
            Copyright © 2000-2020.logo.com. All rights reserved
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className=" hover:underline">
              Privacy Policy
            </a>
            <a href="#" className=" hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Partner
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
