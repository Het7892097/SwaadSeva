import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/home'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import Explore from './pages/Explore' //triggers error when category with empty list is opened
import OrderPage from './pages/OrderFood'
import EditFoodPage from './pages/FoodListEditor'
import OrdersToday from './pages/Orders'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutUs from './components/AboutUs'
import Checkout from './pages/Checkouter'
import PaymentPage from './pages/PaymentPage'
import { useRecoilState } from 'recoil'
import { userAtom } from './store/atoms/user'
import axios from 'axios'

function App() {
  const[user,setUser]=useRecoilState(userAtom);
 
  useEffect(() => {
    const token = localStorage.getItem('authorization'); // Retrieve the token

    if (token) {
      axios.post("http://localhost:3050/api/v1/user/detailer", {}, {
        headers: {
          authorization: token // Use the retrieved token for authorization
        }
      })
      .then((response) => {
        console.log(response.data.result); // Log response data
        const result = response.data.result;
        setUser({
          name: result.name,
          mobNo: result.mobNo,
          isAdmin: result.isAdmin // Assuming the API provides this field
        });
      })
      .catch(err => {
        console.error('Error fetching user details:', err.message);
      });
    }
  }, []);


    return <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signin" element={<SignInPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/about" element={<AboutUs/>} /> //change it to go to home's about us
      <Route path="/explore" element={<Explore/>} />
      <Route path="/order" element={<OrderPage/>} />
      <Route path="/admin/editfood" element={<EditFoodPage/>} />
      <Route path="/admin/orders" element={<OrdersToday/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/checkout/payment" element={<PaymentPage/>} />
    </Routes>
    </BrowserRouter>
  }


export default App
