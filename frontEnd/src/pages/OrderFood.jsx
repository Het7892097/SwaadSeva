import React, { useState } from 'react';
import OrderFoodCard from '../components/OrderFoodCard'; 
import Cart from '../components/Cart'; 
import ItemLimitModal from '../components/ItemLimitModal'; 
import Taskbar from '../components/taskbar';
import axios from 'axios';
import { cartAtom } from '../store/atoms/cart';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
// const productList = [
//   {
//     _id: 1,
//     products: [
//       { name: "Coke", price: 50, isAvailable: true },
//       { name: "Pepsi", price: 50, isAvailable: true }
//     ]
//   },
//   {
//     _id: 2,
//     products: [
//       { name: "Spring Rolls", price: 100, isAvailable: true },
//       { name: "Garlic Bread", price: 80, isAvailable: true }
//     ]
//   },
//   {
//     _id: 3,
//     products: [
//       { name: "Burger", price: 150, isAvailable: true },
//       { name: "Fries", price: 70, isAvailable: true }
//     ]
//   },
//   {
//     _id: 4,
//     products: [
//       { name: "Butter Chicken", price: 300, isAvailable: true },
//       { name: "Paneer Tikka", price: 250, isAvailable: true }
//     ]
//   },
//   {
//     _id: 5,
//     products: [
//       { name: "Dosa", price: 120, isAvailable: true },
//       { name: "Idli", price: 100, isAvailable: true }
//     ]
//   },
//   {
//     _id: 6,
//     products: [
//       { name: "Fried Rice", price: 200, isAvailable: true },
//       { name: "Noodles", price: 180, isAvailable: true }
//     ]
//   },
//   {
//     _id: 7,
//     products: [
//       { name: "Pasta", price: 250, isAvailable: true },
//       { name: "Lasagna", price: 300, isAvailable: true }
//     ]
//   },
//   {
//     _id: 8,
//     products: [
//       { name: "Ice Cream", price: 100, isAvailable: true },
//       { name: "Brownie", price: 150, isAvailable: true }
//     ]
//   }
// ];

const OrderPage = () => {
    const [cart, setCart] = useRecoilState(cartAtom);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productList,setProductList]=useState([]);
    // console.log(cart);
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

    //fetching list only once in refresh
    useEffect(() => {
        axios.get("http://localhost:3050/api/v1/product/categLister")
          .then((response) => {
            console.log(response.data.productList); // Log response data for debugging purpose
             setProductList(()=>response.data.productList);
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

      const addToCart = (item) => {
        setCart((prevCart) => {
          const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
          if (existingItem) {
            // Update the quantity of the existing item
            const updatedCart = prevCart.map(cartItem =>
              cartItem.name === item.name
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
            console.log("Cart after updating quantity:", updatedCart);
            return updatedCart;
          } else {
            // Add new item with name and quantity 1
            const newCart = [...prevCart, { name: item.name, quantity: 1 }];
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
                        acc.push({ name: cartItem.name, quantity: cartItem.quantity - 1 });
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
