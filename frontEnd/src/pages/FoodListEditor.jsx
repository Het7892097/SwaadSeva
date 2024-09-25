import React, { useState } from 'react';
import OrderFoodCard from '../components/OrderFoodCard';
import FoodModal from '../components/FoodModal'; // Import the modal component

const foodItems = {
    1: [{ name: "Coke", price: 50, isAvailable: true, imgLink: 'google.com', desc: 'An good refresher', category: 'Beverages' }, { name: "Pepsi", price: 50, isAvailable: true, imgLink: '', desc: '', category: 'Beverages' },{ name: "Spring Rolls", price: 100, isAvailable: true, imgLink: '', desc: '', category: 'Appetizers' }, { name: "Garlic Bread", price: 80, isAvailable: true, imgLink: '', desc: '', category: 'Appetizers' },{ name: "Burger", price: 150, isAvailable: true, imgLink: '', desc: '', category: 'Fast Food' }, { name: "Fries", price: 70, isAvailable: true, imgLink: '', desc: '', category: 'Fast Food' }],
    4: [{ name: "Butter Chicken", price: 300, isAvailable: true, imgLink: '', desc: '', category: 'North Indian' }, { name: "Paneer Tikka", price: 250, isAvailable: true, imgLink: '', desc: '', category: 'North Indian' }],
    5: [{ name: "Dosa", price: 120, isAvailable: true, imgLink: '', desc: '', category: 'South Indian' }, { name: "Idli", price: 100, isAvailable: true, imgLink: '', desc: '', category: 'South Indian' }],
    6: [{ name: "Fried Rice", price: 200, isAvailable: true, imgLink: '', desc: '', category: 'Chinese' }, { name: "Noodles", price: 180, isAvailable: true, imgLink: '', desc: '', category: 'Chinese' }],
    7: [{ name: "Pasta", price: 250, isAvailable: true, imgLink: '', desc: '', category: 'Continental' }, { name: "Lasagna", price: 300, isAvailable: true, imgLink: '', desc: '', category: 'Continental' }],
    8: [{ name: "Ice Cream", price: 100, isAvailable: true, imgLink: '', desc: '', category: 'Dessert' }, { name: "Brownie", price: 150, isAvailable: true, imgLink: '', desc: '', category: 'Dessert' }],
};

const FoodListEditor = () => {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFoodItem, setCurrentFoodItem] = useState(null);
    const categories = [
        "Beverages", 
        "Appetizers", 
        "Fast Food", 
        "North Indian", 
        "South Indian", 
        "Chinese", 
        "Continental", 
        "Dessert"
    ];

    const handleCategoryChange = (categoryIndex) => {
        setSelectedCategory(categoryIndex);
    };

    const currentFoodItems = foodItems[selectedCategory] || [];

    const handleEditClick = (item) => {
        console.log("clcikerd");
        setCurrentFoodItem(item);
        setIsModalOpen(true);
    };

    const handleCreateClick = () => {
        setCurrentFoodItem(null); // Clear for new item
        setIsModalOpen(true);
    };

    const handleSave = (foodItem) => {
        if (currentFoodItem) {
            // Update existing food item
            const updatedFoodItems = currentFoodItems.map(item =>
                item.name === currentFoodItem.name ? foodItem : item
            );
            foodItems[selectedCategory] = updatedFoodItems;
        } else {
            // Create new food item
            foodItems[selectedCategory] = [...currentFoodItems, foodItem];
        }
        setIsModalOpen(false); // Close modal after saving
    };

    const handleDelete = (foodItem) => {
        // Remove the food item from the category
        foodItems[selectedCategory] = currentFoodItems.filter(item => item.name !== foodItem.name);
        setIsModalOpen(false); // Close modal after deleting
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Food List Editor</h1>
            {/* Dropdown for md screens */}
            <div className="lg:hidden md:block mb-4">
                <label htmlFor="category-select" className="block text-lg font-medium">Select Category:</label>
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
                        className={`btn ${selectedCategory === index + 1 ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleCategoryChange(index + 1)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button onClick={handleCreateClick} className="btn btn-primary mb-4">Add Food Item</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
            {currentFoodItems.length === 0 ? (
                            <p>No food present in this category</p>
                        ) : (
                            currentFoodItems.map((item, index) => (
                                <OrderFoodCard key={index} func="Order" item={item} cbfunc={() => addToCart(item)} />
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
