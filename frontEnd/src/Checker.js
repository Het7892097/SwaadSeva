import axios from "axios";
axios.post("http://localhost:3050/api/v1/user/detailer", {
  // Request body data here (if any)
}, {
  headers: {
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JObyI6Iis5MTgyMDA3NDk0NjAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjcyODgxNTEsImV4cCI6MTcyODE1MjE1MX0.OuIhYElY4xf-rXFJLVaorpeOEPv2KfdMKtkMPmPLkeA"  }
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
