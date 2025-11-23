import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout";
import ProductosAdmin from "./pages/Admin/AdminProductos/AdminProducts.jsx";
import PedidosAdmin from "./pages/Admin/AdminPedidos/AdminPedidos.jsx";
import UsuariosAdmin from "./pages/Admin/AdminUsuario/AdminUsuario.jsx";
import { Footer } from "./components/layout/Footer/Footer";
import { Outlet } from "react-router-dom";
import AboutClub from "./pages/About/AboutClub.jsx";
import Home from "./pages/home/Home.jsx";
import AdminDashboard from "./pages/Admin/AdminPrincipal.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Order from "./pages/Chekout/Order.jsx";

// Layout público (Navbar + Footer)
function PublicLayout() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "120vh", background: "#0a0a0a" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route element={<PublicLayout />}>
            <Route path="/about" element={<AboutClub />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/order" elemente ={<Order/>}/>
          </Route>

          {/* RUTAS ADMIN (sin navbar) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />{" "}
            {/* Ruta por defecto */}
            <Route path="usuarios" element={<UsuariosAdmin />} />
            <Route path="productos" element={<ProductosAdmin />} />
            <Route path="pedidos" element={<PedidosAdmin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
