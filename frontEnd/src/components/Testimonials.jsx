
const Testimonials = () => {
  const blogPosts = [
    {
      title: 'Chocolate Truffle Cake With Honey Flavor',
      comments: 3,
      description: 'Lorem ipsum dolor sit amet, consectetur elit. Non mi sed etiam a id at ultricies neque.',
      imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg', // Replace with actual image path
    },
    {
      title: 'Chocolate Truffle Cake With Honey Flavor',
      comments: 3,
      description: 'Lorem ipsum dolor sit amet, consectetur elit. Non mi sed etiam a id at ultricies neque.',
      imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg', // Replace with actual image path
    },
    {
      title: 'Chocolate Truffle Cake With Honey Flavor',
      comments: 3,
      description: 'Lorem ipsum dolor sit amet, consectetur elit. Non mi sed etiam a id at ultricies neque.',
      imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg', // Replace with actual image path
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Foods</h2>
          <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description.slice(0,100)}...</p>
                <a href="#" className="text-green-600 font-semibold flex items-center">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
