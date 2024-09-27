import { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Explore from "./pages/Explore";
import OrderPage from "./pages/OrderFood";
import EditFoodPage from "./pages/FoodListEditor";
import OrdersToday from "./pages/Orders";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Checkout from "./pages/Checkouter";
import PaymentPage from "./pages/PaymentPage";
import { useRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
import axios from "axios";
import RestrictedAccess from "./authentication/RestrictedAccess";

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("authtoken"); // Retrieve the token

    if (!token) {
      console.error("No token found");
      return; // Exit early if no token is found
    }

    axios
      .post(
        "http://localhost:3050/api/v1/user/detailer",
        {},
        {
          headers: {
            authtoken: token, // Use the retrieved token for authtoken
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const result = response.data.result;

        // Update the user state
        setUser({
          name: result.name || "", // Default to an empty string if undefined
          mobNo: result.mobNo || "",
          isAdmin: result.isAdmin || false, // Default to false if undefined
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error in response:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      });
  }, []); // Empty dependency array to run only once

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Redirect to home if user is logged in */}
        <Route
          path="/signin"
          element={user.name ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route
          path="/signup"
          element={user.name ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route path="/about" element={<HomePage />} />{" "}
        {/* Redirecting to HomePage */}
        <Route path="/explore" element={<Explore />} />
        {/* Show RestrictedAccess for unauthorized access */}
        <Route
          path="/order"
          element={user.name ? <OrderPage /> : <RestrictedAccess />}
        />
        <Route
          path="/admin/editfood"
          element={
            user.name && user.isAdmin ? <EditFoodPage /> : <RestrictedAccess />
          }
        />
        <Route
          path="/admin/orders"
          element={
            user.name && user.isAdmin ? <OrdersToday /> : <RestrictedAccess />
          }
        />
        <Route
          path="/checkout"
          element={user.name ? <Checkout /> : <RestrictedAccess />}
        />
        <Route
          path="/checkout/payment"
          element={user.name ? <PaymentPage /> : <RestrictedAccess />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
