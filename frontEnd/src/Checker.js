import axios from "axios";
// import { body } from "framer-motion/client";

// console.log(localStorage.getItem("authorization"));

axios.post("http://localhost:3050/api/v1/user/order", {
      userOrder: [{"name":"Bhel Puri","quantity":4,"price":60}] 
}, {
  headers: {
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JObyI6Iis5MTk0MjA0MjA0MjAiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzI3MzI0ODU4LCJleHAiOjE3MjgxODg4NTh9.i6kQoyytG5Ne5KnxOYRvvibZAPjLzHt_F3K_8R3-qv4" // Use the retrieved token for authorization
  }
})
.then((response) => {
  console.log(response.data); // Log response data
})
.catch((error) => {
  if (error.response) {
      console.error("Error in POST request1:", error.response.status); // Log error response status
  } else if (error.request) {
      console.error("Error in POST request2:", error.request); // Log error request details
  } else {
      console.error("Error:", error.message); // Log any other errors
  }
});

// function payNow() {
//   fetch('/create-order', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 50000 }), // amount in paise
//   })
//   .then(response => response.json())
//   .then(order => {
//       const options = {
//           key: 'YOUR_KEY_ID', // Razorpay Key ID
//           amount: order.amount, // Order amount
//           currency: order.currency,
//           name: 'Your Company Name',
//           description: 'Order Description',
//           order_id: order.id, // Order ID created in backend
//           handler: function (response) {
//               // Handle success
//               console.log(response);
//           },
//           prefill: {
//               name: 'Customer Name',
//               email: 'customer@example.com',
//               contact: '9999999999'
//           },
//           theme: {
//               color: '#F37254'
//           }
//       };
//       const rzp = new Razorpay(options);
//       rzp.open();
//   });
// }
