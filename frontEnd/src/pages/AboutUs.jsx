import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:order-2 mb-8 lg:mb-0 lg:pl-12">
            <img
              src="img/about.png"
              alt="About us"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:order-1 text-center lg:text-left">
            <h5 className="text-xl text-gray-600 mb-2">Our History</h5>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Where The Food’s As Good As The Root Beer.
            </h2>
            <h4 className="text-2xl font-semibold text-gray-700 mb-6">
              Satisfying people hunger for simple pleasures
            </h4>
            <p className="text-gray-600 mb-8">
              May over was. Be signs two. Spirit. Brought said dry own firmament
              lesser best sixth deep abundantly bearing, him, gathering you
              blessed bearing he our position best ticket in month hole deep
            </p>
            <a
              src="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow hover:bg-blue-700 transition duration-300"
            >
              Read More
              <img src="img/icon/left_2.svg" alt="arrow" className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
