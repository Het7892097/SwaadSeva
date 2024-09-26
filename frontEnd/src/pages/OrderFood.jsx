import React, { useState, useEffect } from 'react';
import OrderFoodCard from '../components/OrderFoodCard'; 
import Cart from '../components/Cart'; 
import ItemLimitModal from '../components/ItemLimitModal'; 
import Taskbar from '../components/taskbar';
import axios from 'axios';
// import { useRecoilState } from 'recoil'; 
// import { cartAtom } from '../store/atoms/cart'; // Ensure to import your cartAtom

const OrderPage = () => {
    const [cart, setCart] = useState(() => {
        // Step 2: Initialize cart from localStorage
        const savedCart = localStorage.getItem('cartList');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productList, setProductList] = useState([]);

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

    // Fetching product list once on component mount
    useEffect(() => {
        axios.get("http://localhost:3050/api/v1/product/categLister")
            .then((response) => {
                console.log(response.data.productList); // Log response data for debugging purpose
                setProductList(response.data.productList);
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
    }, []);

    // Step 3: Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const parsedPrice = parseFloat(item.price); // Parse the price from the item
    
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.name === item.name);
    
            if (existingItemIndex !== -1) {
                // Create a new array with the updated quantity of the existing item
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex], // Spread the existing item
                    quantity: updatedCart[existingItemIndex].quantity + 1, // Increment quantity
                    price: parsedPrice // Ensure price is updated
                };
                console.log("Cart after updating quantity:", updatedCart);
                return updatedCart; // Return the new array
            } else {
                // Add new item with name, quantity 1, and parsed price
                const newCart = [...prevCart, { name: item.name, quantity: 1, price: parsedPrice }];
                console.log("Cart after adding new item:", newCart);
                return newCart;
            }
        });
    };
    
    const removeFromCart = (itemName) => {
        setCart((prevCart) => {
            return prevCart.reduce((acc, cartItem) => {
                if (cartItem.name === itemName) {
                    // Decrease quantity or remove item if quantity is 1
                    if (cartItem.quantity > 1) {
                        acc.push({ name: cartItem.name, quantity: cartItem.quantity - 1, price: cartItem.price });
                    }
                } else {
                    acc.push(cartItem);
                }
                return acc;
            }, []);
        });
    };

    const handleCategoryChange = (categoryIndex) => {
        setSelectedCategory(categoryIndex);
    };

    // Filter products based on selected category
    const currentProducts = productList.find(category => category._id === selectedCategory)?.products || [];

    return (
        <div className="container mx-auto p-4">
            <Taskbar isAdmin={false} isLoggedIn={true} />
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
                        {currentProducts.length === 0 ? (
                            <p>No food present in this category</p>
                        ) : (
                            currentProducts.map((item, index) => (
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
