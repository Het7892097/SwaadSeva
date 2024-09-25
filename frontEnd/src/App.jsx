import { useState } from 'react'
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
function App() {
  const [count, setCount] = useState(0)
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
    </Routes>
    </BrowserRouter>
  }


export default App
