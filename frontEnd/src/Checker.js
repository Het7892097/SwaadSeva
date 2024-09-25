import axios from "axios";

  axios.post("http://localhost:3050/api/v1/user/signin", {
    mobNo:"+918200749460",
    password:"Het#7920"
})
  .then((response) => {
    console.log(response.data); // Log response data
  })
  .catch((error) => {
    if(error.response){console.error("Error in POST request1:", error.response.status);} // Log error}
       else if(error.request){console.error("Error in POST request2:", error.request); // Log error} 
        }
    else {console.error(e.message)} });

