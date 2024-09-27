import React, { useState, useEffect } from "react";
import OrderFoodCard from "../components/OrderFoodCard";
import FoodModal from "../components/FoodModal";
import axios from "axios";
import Taskbar from "../components/taskbar";

const FoodListEditor = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFoodItem, setCurrentFoodItem] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false); // New state to trigger refetch

  const token = localStorage.getItem("authtoken");
  if (!token) {
    console.error("No auth token found");
  }

  const categories = [
    "Beverages",
    "Appetizers",
    "Fast Food",
    "North Indian",
    "South Indian",
    "Chinese",
    "Continental",
    "Dessert",
  ];

  // Fetching food items, re-run when updateFlag changes
  useEffect(() => {
    axios
      .get("http://localhost:3050/api/v1/product/categLister")
      .then((response) => {
        setFoodItems(() => response.data.productList);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error in request:", error.response.status);
        } else if (error.request) {
          console.error("Error in request:", error.request);
        } else {
          console.error(error.message);
        }
      });
  }, [updateFlag]); // Re-fetch whenever updateFlag changes

  const handleCategoryChange = (categoryIndex) => {
    setSelectedCategory(categoryIndex);
  };

  const currentFoodItems =
    foodItems.find((item) => item._id === selectedCategory)?.products || [];

  const handleEditClick = (item) => {
    setCurrentFoodItem(item);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setCurrentFoodItem(null); // Clear for new item
    setIsModalOpen(true);
  };

  const handleSave = (foodItem) => {
    const categoryIndex = foodItems.findIndex(
      (item) => item._id === selectedCategory
    );

    if (currentFoodItem) {
      // Update existing food item via API
      axios
        .patch(
          "http://localhost:3050/api/v1/product/update",
          {
            ...foodItem,
            _id: currentFoodItem._id, // Ensure to include the food item _id for updating
          },
          {
            headers: {
              authtoken: token, // Pass the token correctly in headers
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            alert("Update Successful");
            setIsModalOpen(false); // Close modal after successful save
            setUpdateFlag((prevFlag) => !prevFlag); // Toggle updateFlag to trigger refetch
          }
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                alert("Invalid Product Details");
                break;
              case 409:
                alert("Product Not Exists");
                break;
              case 500:
                alert("Backend Error");
                break;
              default:
                alert("An error occurred");
            }
          } else {
            console.error("Error:", error.message);
          }
        });
    } else {
      // Create new food item via API
      axios
        .post(
          "http://localhost:3050/api/v1/product/create",
          foodItem, // Pass the new food item data
          {
            headers: {
              authtoken: token, // Pass the token correctly in headers
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            alert("Creation Successful");
            setIsModalOpen(false); // Close modal after successful creation
            setUpdateFlag((prevFlag) => !prevFlag); // Toggle updateFlag to trigger refetch
          }
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                alert("Invalid Product Details");
                break;
              case 409:
                alert("Product Already Exists");
                break;
              case 500:
                alert("Backend Error");
                break;
              default:
                alert("An error occurred");
            }
          } else {
            console.error("Error:", error.message);
          }
        });
    }
  };

  const handleDelete = (foodItemId) => {
    axios
      .delete("http://localhost:3050/api/v1/product/delete", {
        headers: {
          authtoken: token, // Pass the token correctly in headers
          "Content-Type": "application/json",
        },
        data: {
          _id: foodItemId, // Pass the food item ID in the request body
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Deletion successful!"); // Alert for successful deletion
          setUpdateFlag((prevFlag) => !prevFlag); // Toggle updateFlag to trigger refetch
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            alert("Product not exists"); // Alert for product not existing
          } else if (error.response.status === 500) {
            alert("Deletion failed"); // Alert for deletion failure
          }
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="p-4">
      <Taskbar />
      <h1 className="mt-8 text-2xl font-bold mb-4">Food List Editor</h1>

      {/* Dropdown for md screens */}
      <div className="lg:hidden md:block mb-4">
        <label htmlFor="category-select" className="block text-lg font-medium">
          Select Category:
        </label>
        <select
          id="category-select"
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(parseInt(e.target.value))}
        >
          {categories.map((category, index) => (
            <option key={index} value={index + 1}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Horizontal taskbar for lg screens */}
      <div className="hidden lg:flex gap-2 overflow-x-auto mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`btn ${
              selectedCategory === index + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleCategoryChange(index + 1)}
          >
            {category}
          </button>
        ))}
      </div>

      <button onClick={handleCreateClick} className="btn btn-primary mb-4">
        Add Food Item
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentFoodItems.length === 0 ? (
          <p>No food present in this category</p>
        ) : (
          currentFoodItems.map((item, index) => (
            <OrderFoodCard
              key={index}
              func="edit"
              item={item}
              cbfunc={() => handleEditClick(item)}
            />
          ))
        )}
      </div>

      <FoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        foodItem={currentFoodItem}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FoodListEditor;
