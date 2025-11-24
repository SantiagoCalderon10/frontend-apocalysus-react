// src/components/layout/Navbar/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import React, { useState, useContext } from "react";
import logo from "../../../assets/img/logoApocalyisus.png";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../../context/CartContext";
import MiniCart from "../../cart/MiniCart";
import { useAuth } from "../../../context/AuthContext";
import { FaUser } from "react-icons/fa";


const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav
      className={`${styles.navbar} navbar navbar-expand-lg navbar-dark fixed-top`}
    >
      <div className="container">
        <img
          src={logo}
          alt="logo-apocalyisus"
          width="50"
          height="50"
          className="d-inline-block align-text-top me-2"
        />

        <a
          className={`navbar-brand ${styles.eslogan}`}
          onClick={() => navigate("/")}
        >
          APOCALYSUS
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${styles.navLink}`}
                onClick={() => navigate("/shop")}
              >
                Tienda
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${styles.navLink}`}
                onClick={() => navigate("/about")}
              >
                Acerca del Club
              </a>
            </li>
{isAuthenticated() ? (
  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
    <button
      onClick={() => navigate("/profile")}
     
    >
     <FaUser/>
    </button>

    <button
      className="btn btn-link text-white"
      onClick={() => {
        logout();
        navigate("/");
      }}
    >
      Salir
    </button>
  </div>
) : (
  <a
    onClick={() => navigate("/login")}
    className={`btn ms-2 ${styles.btnIngreso}`}
  >
    Ingrese
  </a>
)}
            {/*  CARRITO  */}
            <li
              className="nav-item d-flex align-items-center"
              style={{ position: "relative" }}
            >
              <div
                className={styles.cartIconWrapper}
                role="button"
                onClick={() => setOpenCart((prev) => !prev)}
                
                aria-label="Abrir carrito"
              >
                <FaShoppingCart className={styles.cartIcon} />
                {cartCount > 0 && (
                  <span className={styles.cartBubble}>{cartCount}</span>
                )}
              </div>

              <MiniCart open={openCart} close={() => setOpenCart(false)} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
