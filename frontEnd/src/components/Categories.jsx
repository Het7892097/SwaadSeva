function CategoryCarousel() {
  return (
    <div className="flex flex-col items-center justify-between px-4 lg:px-16 py-10">
      <div className="flex flex-col items-center mb-5">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Food Category</h1>
        <p className="text-gray-600 mb-6 w-[400px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div>
        <ResponsiveCarousel />
      </div>
    </div>
  );
}

export default CategoryCarousel;

import { useEffect, useState } from "react";

const ResponsiveCarousel = () => {
  // Image list (Replace with your image URLs)
  const images = [
    "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
    "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
    "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
  ];

  // State for current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track window width and determine images per slide dynamically
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update windowWidth when the window is resized
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine images per slide based on screen size
  const imagesPerSlide = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 4;

  // Function to move to the next set of images
  const nextSlide = () => {
    const newIndex = (currentIndex + imagesPerSlide) % images.length;
    setCurrentIndex(newIndex);
  };

  // Function to move to the previous set of images
  const prevSlide = () => {
    const newIndex =
      (currentIndex - imagesPerSlide + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  // Get the current images to display
  const visibleImages = images.slice(
    currentIndex,
    currentIndex + imagesPerSlide
  );

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="overflow-hidden">
        <div className="flex transition-transform ease-in-out duration-700">
          {visibleImages.map((imgSrc, index) => (
            <div
              key={index}
              className={`w-full ${
                windowWidth < 768
                  ? "w-full" // 1 image on mobile
                  : windowWidth < 1024
                  ? "md:w-1/2" // 2 images on medium screens
                  : "lg:w-1/4" // 4 images on larger screens
              } p-2`}
            >
              <img
                src={imgSrc}
                className="object-cover w-full h-56 rounded-lg md:h-96"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 left-2 z-30 transform -translate-y-1/2 p-2 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60 focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-gray-800 rounded-full"
        onClick={prevSlide}
      >
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        className="absolute top-1/2 right-2 z-30 transform -translate-y-1/2 p-2 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60 focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-gray-800 rounded-full"
        onClick={nextSlide}
      >
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
