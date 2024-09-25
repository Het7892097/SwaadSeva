
const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-16 py-10">
      {/* Grid for images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="flex justify-center p-5">
            <img
            src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
            alt="Food 1"
            className="rounded-lg object-cover"
            />
        </div>
        <div className="md:flex flex-col gap-2 hidden ">
            <img
            src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
            alt="Food 2"
            className="rounded-lg object-cover"
            />
            <img
            src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
            alt="Food 3"
            className="rounded-lg object-cover"
            />
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 lg:pl-10">
        <h3 className="text-green-600 text-lg font-semibold mb-2">About us</h3>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          Food is an important part of a balanced Diet
        </h1>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
          pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
          augue urna, vitae feugiat pretium donec id elementum.
        </p>
        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Show more
          </button>
          <button className="bg-transparent border border-green-600 text-green-600 px-4 py-2 rounded-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-4.752-3v6l4.752-3z"
              />
            </svg>
            Watch video
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

// function Page2() {
//   return (
//     <div className="h-screen bg-white py-16 px-36">
//         <div className="grid grid-cols-2 gap-2">
//             <div>Images</div>
//             <div className="h-full w-[400px]">
//                 <div className="flex items-center">
//                     <div className="flex flex-col">
//                         <h2 className="text-4xl">Food is an important</h2>
//                         <h2 className="text-4xl mb-5">part of balanced Diet</h2>
//                         <p className="text-gray-500 pl-5">
//                             lorem  innzdkkcozdm zz
//                             vxnvvlxkmvoivlxzvn
//                             fvnzxfvnfvz
//                             fvzfv gndgnsgnfvvsggsfgfdgsdggggggggggggggggg
//                         </p>
//                     </div>
//                     </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Page2
