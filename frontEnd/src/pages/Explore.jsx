import React, { useEffect, useState } from "react";
import FoodCard from "../components/foodCard";
import axios from "axios";
import Taskbar from "../components/taskbar";
const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [foodList,setFoodList] = useState([]);

    //fetching list only once in refresh
  useEffect(() => {
    axios.get("http://localhost:3050/api/v1/product/categLister")
      .then((response) => {
        console.log(response.data.productList); // Log response data for debugging purpose
         setFoodList(()=>response.data.productList);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error in  request:", error.response.status);
        } // Log error}
        else if (error.request) {
          console.error("Error in request:", error.request); // Log error}
        } else {
          console.error(error.message);
        }
      });
  }, []);

  const categories = {
    1: "Beverages",
    2: "Appetizers",
    3: "Fast Food",
    4: "North Indian",
    5: "South Indian",
    6: "Chinese",
    7: "Continental",
    8: "Dessert",
  };

  // Get filtered items based on selected category and search term
  const filteredItems = selectedCategory
    ? foodList
        .find((item) => item._id === selectedCategory)
        ?.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []
    : [];

  return <>
  <Taskbar/>
  <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Explore Food</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for food..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Menu */}
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mb-6">
        {Object.entries(categories).map(([categoryId, categoryName]) => (
          <li key={categoryId}>
            <a
              className={
                selectedCategory === Number(categoryId) ? "active" : ""
              }
              onClick={() => setSelectedCategory(Number(categoryId))}
            >
              {categoryName}
            </a>
          </li>
        ))}
      </ul>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))
        ) : (
          <p>No items found for the selected category.</p>
        )}
      </div>
    </div>
  </>
};

export default Explore;
