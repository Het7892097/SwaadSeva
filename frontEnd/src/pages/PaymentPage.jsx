// src/components/PaymentPage.js
import React, { useState } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderId: "order_" + new Date().getTime(),
    orderAmount: 100,
    customerName: "John Doe",
    customerEmail: "johndoe@example.com",
    customerPhone: "9999999999",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const initiatePayment = async () => {
    try {
      // Update the URL to point to localhost:3050
      const response = await axios.post(
        "http://localhost:3050/api/payments/create-order",
        orderDetails
      );

      if (response.data.paymentLink) {
        window.location.href = response.data.paymentLink; // Redirect to Cashfree payment page
      } else {
        console.error("Payment link generation failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="payment-page">
      <h2>Proceed with Payment</h2>
      <div>
        <input
          type="text"
          name="customerName"
          value={orderDetails.customerName}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="customerEmail"
          value={orderDetails.customerEmail}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          name="customerPhone"
          value={orderDetails.customerPhone}
          onChange={handleChange}
          placeholder="Your Phone Number"
          required
        />
        <input
          type="number"
          name="orderAmount"
          value={orderDetails.orderAmount}
          onChange={handleChange}
          placeholder="Order Amount"
          required
        />
        <button onClick={initiatePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentPage;
