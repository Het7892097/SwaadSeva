import React, { useState } from "react";
import { FaShoppingCart, FaCreditCard, FaDice } from "react-icons/fa";
// import { motion } from "framer-motion"; // Uncomment if you're using framer-motion
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartAtom } from "../store/atoms/cart";
import OrderPage from "./OrderFood"; // Ensure you import OrderPage correctly

const CartItem = ({ name, quantity, price }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-800">{name}</span>
    <span className="text-gray-600">x{quantity}</span>
    <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
  </div>
);

export default function Checkout() {
  console.log("User is fucked uip");

  const cart = useRecoilValue(cartAtom);
  
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  console.log(cart);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  const userId = "507f191e810c19729de860ea"; // Example ObjectId
  const navigate = useNavigate();

  const handlePayment = (paymentMethod) => {
    setIsLoading(true);
    setSelectedPayment(paymentMethod);
    const newOrderId = `${userId}-${new Date().toISOString()}`;

    setTimeout(() => {
      setOrderId(newOrderId);
      setIsOrderPlaced(true);
      setIsLoading(false);
      navigate("/"); // Redirect to home page
    }, 1500);
  };

  if (isOrderPlaced) {
    return <OrderPage orderId={orderId} />;
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
            {cart.map((item, index) => (
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
              <button
                onClick={() => handlePayment("luck")}
                className={`mt-2 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ${selectedPayment === "luck" && isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading && selectedPayment !== "luck"}
              >
                {isLoading && selectedPayment === "luck" ? (
                  <span className="loading loading-ring loading-lg"></span>
                ) : (
                  `Pay $${total.toFixed(2)} with Luck`
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
                  `Pay $${total.toFixed(2)} with CashFree`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};