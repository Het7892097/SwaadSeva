import axios from "axios";
// import { body } from "framer-motion/client";

// console.log(localStorage.getItem("authorization"));

axios.patch("http://localhost:3050/api/v1/user/completer",{orderId:"66f52fc4e383bd3f4cc677bc-15:27:19"}, {
  headers: {
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JObyI6Iis5MTgyMDA3NDk0NjAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjczMzE2NTUsImV4cCI6MTcyODE5NTY1NX0.1geC9McByxDGZUIfr3aRDgG-weRGEtFlT8GCAmLW4Ew" // Use the retrieved token for authorization
  }
})
.then((response) => {
  console.log(response.data); // Log response data
})
.catch((error) => {
  if (error.response) {
      console.error("Error in POST request", error.response); // Log error response status
  } else if (error.request) {
      console.error("Error inrequest"); // Log error request details
  } else {
      console.error("Error:"); // Log any other errors
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
