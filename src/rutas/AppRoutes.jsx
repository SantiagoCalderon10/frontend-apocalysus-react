// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar/Navbar';
import Shop from '../pages/Shop/Shop';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import AdminDashboard from '../pages/Admin/AdminDashboard/AdminDashboard';
import AdminProducts from '../pages/Admin/AdminProducts/AdminProducts';
import AboutClub from '../pages/About/AboutClub';
import Home from '../pages/home/home'; 

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutClub />} />
        <Route path='/admin/products' element={<AdminProducts></AdminProducts>}></Route>
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
