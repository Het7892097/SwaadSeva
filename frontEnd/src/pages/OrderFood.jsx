import React, { useState } from 'react';
import OrderFoodCard from '../components/OrderFoodCard'; 
import Cart from '../components/Cart'; 
import ItemLimitModal from '../components/ItemLimitModal'; 
import Taskbar from '../components/taskbar';
const foodItems = {
    1: [{ name: "Coke", price: 50,isAvailable:true }, { name: "Pepsi", price: 50,isAvailable:true }],
    2: [{ name: "Spring Rolls", price: 100 }, { name: "Garlic Bread", price: 80,isAvailable:true }],
    3: [{ name: "Burger", price: 150 ,isAvailable:true}, { name: "Fries", price: 70,isAvailable:true }],
    4: [{ name: "Butter Chicken", price: 300,isAvailable:true }, { name: "Paneer Tikka", price: 250,isAvailable:true }],
    5: [{ name: "Dosa", price: 120 ,isAvailable:true}, { name: "Idli", price: 100 ,isAvailable:true}],
    6: [{ name: "Fried Rice", price: 200 ,isAvailable:true}, { name: "Noodles", price: 180,isAvailable:true }],
    7: [{ name: "Pasta", price: 250,isAvailable:true }, { name: "Lasagna", price: 300 ,isAvailable:true}],
    8: [{ name: "Ice Cream", price: 100,isAvailable:true }, { name: "Brownie", price: 150,isAvailable:true }],
};
const OrderPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const addToCart = (item) => {
        const currentQuantity = cart.reduce((acc, cartItem) => acc + (cartItem.name === item.name ? cartItem.quantity : 0), 0);
        const totalQuantity = currentQuantity + 1;

        if (totalQuantity > 15) {
            setIsModalOpen(true);
            return;
        }

        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        if (existingItemIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemName) => {
        const updatedCart = cart.reduce((acc, item) => {
            if (item.name === itemName) {
                if (item.quantity > 1) {
                    acc.push({ ...item, quantity: item.quantity - 1 });
                }
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        setCart(updatedCart);
    };

    const handleCategoryChange = (categoryIndex) => {
        setSelectedCategory(categoryIndex);
    };

    const currentFoodItems = foodItems[selectedCategory] || [];

    return (
        <div className="container mx-auto p-4">
             <Taskbar />
            <h1 className="text-4xl mt-10 font-bold mb-4">Order Food</h1>
            
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

            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 lg:w-4/5">
                    <div className="flex flex-wrap gap-4">
                        {currentFoodItems.length === 0 ? (
                            <p>No food present in this category</p>
                        ) : (
                            currentFoodItems.map((item, index) => (
                                <OrderFoodCard key={index} func="Order" item={item} cbfunc={() => addToCart(item)} />
                            ))
                        )}
                    </div>
                </div>

                <Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} />
            </div>

            <ItemLimitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default OrderPage;
