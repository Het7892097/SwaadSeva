import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaCreditCard, FaDice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CartItem = ({ name, quantity, price }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-800">{name}</span>
    <span className="text-gray-600">x{quantity}</span>
    <span className="font-semibold">₹{(price * quantity).toFixed(2)}</span>
  </div>
);

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const token=localStorage.getItem("authorization");
  useEffect(() => {
    // Retrieve cart from localStorage
    const savedCart = localStorage.getItem("cartList");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  const userId = "507f191e810c19729de860ea"; // Example ObjectId
  const navigate = useNavigate();

  const handlePayment = async (paymentMethod) => {
    if (total === 0) {
      alert("Your cart is empty. Please add items to your cart before proceeding to payment.");
      return;
    }
  
    setIsLoading(true);
    setSelectedPayment(paymentMethod);
  
    try {
      const response = await axios.post("http://localhost:3050/api/v1/user/order", {userOrder:cart}, {
        headers: {
          authorization: token ? token : ""
        },
      });
  
      if (response.status === 200) {
        setOrderId(response.data.orderId); // Ensure orderId is from response
        setIsOrderPlaced(true);
        
        // Clear the cart from localStorage
        localStorage.removeItem("cartList");
        // Clear the cart state
        setCart([]);
        // Optionally navigate to home page or stay on the checkout page
        setTimeout(()=>{
          navigate("/order");
        },1500)
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      // Handle error as before
      if (error.response) {
        if (error.response.status === 400) {
          alert("Invalid order details. Please check your items and try again.");
        } else if (error.response.status === 500) {
          alert("Order failed. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        alert("An error occurred while processing your payment. Please try again.");
        console.error("Payment error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  if (isOrderPlaced) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="bg-white p-12 rounded-lg shadow-2xl text-center max-w-3xl w-full border-4 border-black-800"> {/* Increased border thickness and color */}
          <h2 className="text-4xl font-bold mb-8">Thank You!</h2> {/* Larger font size and margin */}
          <p className="text-2xl mb-6">Your order has been placed successfully.</p> {/* Larger font size and margin */}
          <p className="text-xl font-semibold">Order ID: {orderId}</p> {/* Larger font size */}
        </div>
      </div>
    );
  }
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaShoppingCart className="mr-2" /> Cart
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartItem key={index} {...item} />
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>GST(18%):</span>
                <span className="font-semibold">₹{taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-bold">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FaDice className="mr-2" /> Pay with Luck
              </h3>
              <button
                onClick={() => handlePayment("luck")}
                className={`mt-2 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ${selectedPayment === "luck" && isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading && selectedPayment !== "luck"}
              >
                {isLoading && selectedPayment === "luck" ? (
                  <span className="loading loading-ring loading-lg"></span>
                ) : (
                  `Pay ₹${total.toFixed(2)} with Luck`
                )}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FaCreditCard className="mr-2" /> Pay with CashFree
              </h3>
              <button
                onClick={() => handlePayment("cashfree")}
                className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ${selectedPayment === "cashfree" && isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading && selectedPayment !== "cashfree"}
              >
                {isLoading && selectedPayment === "cashfree" ? (
                  <span className="loading loading-ring loading-lg"></span>
                ) : (
                  `Pay ₹${total.toFixed(2)} with CashFree`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
