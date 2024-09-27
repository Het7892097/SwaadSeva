const Reason = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Images on the left for desktop, background image for mobile */}
        <div className="lg:w-1/2 w-full relative mb-8 lg:mb-0">
          {/* Mobile background */}
          <div
            className="lg:hidden block bg-cover bg-center h-64 w-3/5 rounded-lg"
            style={{
              backgroundImage:
                'url("https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg")',
            }}
          ></div>
          {/* Add a second image layered */}
          <div
            className="lg:hidden absolute bottom-0 left-[150px] w-1/2 h-1/2 bg-cover bg-center transform translate-x-8 -translate-y-16 rounded-lg"
            style={{
              backgroundImage:
                'url("https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg")',
            }}
          ></div>

          {/* Desktop images */}
          <div className="hidden lg:flex space-x-4">
            <img
              src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
              alt="Chopping veggies"
              className="w-1/2 h-auto rounded-lg shadow-md"
            />
            <img
              src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg"
              alt="Fresh salad"
              className="object-cover w-1/3 h-auto rounded-lg shadow-md transform translate-y-12"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="lg:w-1/2 w-full">
          <div className="text-center lg:text-left">
            <h2 className="text-lg font-semibold text-green-600 mb-2">
              Why Choose Us
            </h2>
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">
              Why We are the best?
            </h1>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum.
              Ultrices mattis sed vitae mus risus.
            </p>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius
              sed pharetra dictum neque massa congue.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v4.585l2.293-2.292a1 1 0 011.414 1.414L11.414 9l2.293 2.293a1 1 0 01-1.414 1.414L10 10.415V15a1 1 0 01-2 0v-4.585L5.707 12.707a1 1 0 01-1.414-1.414L8.586 9 6.293 6.707a1 1 0 111.414-1.414L9 7.585V3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">
                  Fast Delivery
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a1 1 0 011 1v8a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 011-1h2a1 1 0 011 1v8a4 4 0 01-4 4H7a4 4 0 01-4-4V6a1 1 0 011-1h2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">
                  24/7 services
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v4.585l2.293-2.292a1 1 0 011.414 1.414L11.414 9l2.293 2.293a1 1 0 01-1.414 1.414L10 10.415V15a1 1 0 01-2 0v-4.585L5.707 12.707a1 1 0 01-1.414-1.414L8.586 9 6.293 6.707a1 1 0 111.414-1.414L9 7.585V3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">Fresh food</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16 2a2 2 0 00-2-2h-8a2 2 0 00-2 2v2h12V2zM2 6h16v10a4 4 0 01-4 4H6a4 4 0 01-4-4V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">
                  Quality maintain
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;
