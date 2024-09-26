import { useEffect } from 'react';
import './App.css';
import HomePage from './pages/home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Explore from './pages/Explore'; // triggers error when category with empty list is opened
import OrderPage from './pages/OrderFood';
import EditFoodPage from './pages/FoodListEditor';
import OrdersToday from './pages/Orders';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkouter';
import PaymentPage from './pages/PaymentPage';
import { useRecoilState } from 'recoil';
import { userAtom } from './store/atoms/user';
import axios from 'axios';
import RestrictedAccess from './authentication/RestrictedAccess';

function App() {
  const [user, setUser] = useRecoilState(userAtom);
 
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
          name: result.name || "", // Default to an empty string if undefined
          mobNo: result.mobNo || "",
          isAdmin: result.isAdmin || false // Default to false if undefined
        });
      })
      .catch(err => {
        console.error('Error fetching user details:', err.message);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Redirect to home if user is logged in */}
        <Route path="/signin" element={user.name ? <Navigate to="/" /> : <SignInPage />} />
        <Route path="/signup" element={user.name ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/about" element={<HomePage />} /> {/* Redirecting to HomePage */}
        <Route path="/explore" element={<Explore />} />
        {/* Show RestrictedAccess for unauthorized access */}
        <Route path="/order" element={user.name ? <OrderPage /> : <RestrictedAccess />} />
        <Route path="/admin/editfood" element={user.name && user.isAdmin ? <EditFoodPage /> : <RestrictedAccess />} />
        <Route path="/admin/orders" element={user.name && user.isAdmin ? <OrdersToday /> : <RestrictedAccess />} />
        <Route path="/checkout" element={user.name ? <Checkout /> : <RestrictedAccess />} />
        <Route path="/checkout/payment" element={user.name ? <PaymentPage /> : <RestrictedAccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
