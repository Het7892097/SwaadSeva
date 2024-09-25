import React, { useState } from "react";
import { FaShoppingCart, FaCreditCard, FaDice } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Taskbar from "../components/taskbar";

const cartItems = [
  { name: "Paneer Tikka", quantity: 2, price: 12.99 },
  { name: "Veg Biryani", quantity: 1, price: 8.99 },
  { name: "Mango Lassi", quantity: 3, price: 3.49 },
  { name: "Samosa", quantity: 4, price: 1.99 },
  { name: "Chocolate Cake", quantity: 1, price: 5.49 },
];

const CartItem = ({ name, quantity, price }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-800">{name}</span>
    <span className="text-gray-600">x{quantity}</span>
    <span className="font-semibold">${price.toFixed(2)}</span>
  </div>
);

const OrderPage = ({ orderId }) => (
  <div className="glass p-6 text-center">
    <h1 className="text-2xl font-bold">Thank You!</h1>
    <p className="mt-4">Your Order ID is: {orderId}</p>
  </div>
);

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null); // State to track selected payment option

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  // Use a sample Mongoose ObjectId
  const userId = "507f191e810c19729de860ea"; // Example ObjectId
  const navigate = useNavigate(); // Initialize useNavigate
  const handleLuckPayment = () => {
    setIsLoading(true);
    setSelectedPayment("luck");
    const newOrderId = `${userId}-${new Date().toISOString()}`;

    setTimeout(() => {
      setOrderId(newOrderId);
      setIsOrderPlaced(true);
      setIsLoading(false);

      // Redirect to the home page
      navigate("/home"); //using hooks for redirecting instead of window-object
      //   window.location.href = "/home"; // Change this to your home page URL
    }, 1500);
  };

  const handleCashFreePayment = () => {
    //logic for cashfree-payment

    //only enabling below statements after successful payments
    // setIsLoading(true);
    // setSelectedPayment("cashfree");
    // const newOrderId = `${userId}-${new Date().toISOString()}`;

    setTimeout(() => {
      setOrderId(newOrderId);
      setIsOrderPlaced(true);
      setIsLoading(false);

      //Redirecting to home page after sucessful payment
      navigate("/home");
    }, 1500);
  };

  // Render the Order Page if the order is placed
  if (isOrderPlaced) {
    return <OrderPage orderId={orderId} />;
  }

  return  <>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Checkout
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaShoppingCart className="mr-2" /> Cart
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {cartItems.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Taxes:</span>
                  <span className="font-semibold">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2 text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLuckPayment}
                  className={`mt-2 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ${
                    selectedPayment === "luck" && isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={selectedPayment === "cashfree" && isLoading}
                  aria-label="Pay with luck"
                >
                  {isLoading && selectedPayment === "luck" ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    "Pay $" + total.toFixed(2) + " with Luck"
                  )}
                </motion.button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <FaCreditCard className="mr-2" /> Pay with CashFree
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCashFreePayment}
                  className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ${
                    selectedPayment === "cashfree" && isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={selectedPayment === "luck" && isLoading}
                  aria-label="Pay with CashFree"
                >
                  {isLoading && selectedPayment === "cashfree" ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    "Pay $" + total.toFixed(2) + " with CashFree"
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  
};

export default CheckoutForm;
