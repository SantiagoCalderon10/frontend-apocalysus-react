// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import cartService from "../api/cartService";

export const CartContext = createContext();

const normalizeCart = (data) => {
  return {
    productos: data.items || data.productos || [],
    total: data.total || 0,
    cantidadTotal: data.cantidadTotal || (data.items?.length ?? 0),
  };
};


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ productos: [], total: 0, cantidadTotal: 0 });
  const [loading, setLoading] = useState(true);

  const userId = 3; // luego se reemplaza con el authContext

  const loadCart = async () => {
  try {
    setLoading(true);
    const data = await cartService.getCart(userId);
    setCart(normalizeCart(data));
  } catch (error) {
    console.error("Error al cargar carrito:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (idProducto, cantidad = 1) => {
    try {
      const data = await cartService.addToCart(userId, idProducto, cantidad);
      setCart(normalizeCart(data));
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (idProducto, cantidad) => {
    try {
      const data = await cartService.updateCartItem(userId, idProducto, cantidad);
      setCart(normalizeCart(data));
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (idProducto) => {
    try {
      const data = await cartService.removeFromCart(userId, idProducto);
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart(userId);
      setCart({ productos: [], total: 0, cantidadTotal: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const cartCount = cart?.cantidadTotal || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
