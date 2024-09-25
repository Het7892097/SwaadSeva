import axios from "axios";
axios.get("http://localhost:3050/api/v1/product/categLister", {
  // Request body data here (if any)
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
