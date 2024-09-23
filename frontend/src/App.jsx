import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchUserProfile } from './slices/authSlice.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage'; 
import Login from './components/auth/Login.jsx'; 
import Signup from './components/auth/Signup.jsx';
import Profile from './components/user/Profile.jsx';
import UpdateProfile from './components/auth/UpdateProfile.jsx';
import UpdatePassword from './components/auth/UpdatePassword.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddNewProduct from './components/product/AddNewProduct.jsx';
import ProductsGetAll from './components/product/ProductsGetAll.jsx';
import ProductDetails from './components/product/ProductDetails.jsx';
import UsersGetAll from './components/user/UsersGetAll.jsx';
import UpdateUser from './components/user/UpdateUser.jsx';
import UpdateProduct from './components/product/UpdateProduct.jsx';
import ReviewsGetAll from './components/product/ReviewsGetAll.jsx';
import Cart from './components/order/Cart.jsx';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(fetchUserProfile())
            .catch(err => {
                // Handle error (e.g., redirect to login)
                console.error('Failed to fetch user profile:', err);
            });
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/update-profile' element={<UpdateProfile />} />
        <Route path='/update-password' element={<UpdatePassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addNewProduct' element={<AddNewProduct />} />
        <Route path='/admin/products' element={<ProductsGetAll />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/admin/users' element={<UsersGetAll />} />
        <Route path='/admin/reviews' element={<ReviewsGetAll />} />
        <Route path='/admin/edituser/:id' element={<UpdateUser />} />
        <Route path='/admin/updateproduct/:id' element={<UpdateProduct />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;