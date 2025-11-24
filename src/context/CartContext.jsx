// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import cartService from "../api/services/cartService";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

const normalizeCart = (data) => {
  return {
    productos: data.items || data.productos || [],
    total: data.total || 0,
    cantidadTotal:
      data.cantidadTotal ||
      (data.items ? data.items.reduce((acc, i) => acc + i.cantidad, 0) : 0),
  };
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ productos: [], total: 0, cantidadTotal: 0 });
  const [loading, setLoading] = useState(true);

  // Obtener ID del usuario autenticado
  const userId = user?.id || null;

  // Cargar carrito solo si hay usuario autenticado
  const loadCart = async () => {
    if (!userId) {
      setCart({ productos: [], total: 0, cantidadTotal: 0 });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(normalizeCart(data));
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  // ------------------------
  // ACCIONES DEL CARRITO
  // ------------------------

  const addToCart = async (idProducto, cantidad = 1) => {
    if (!isAuthenticated()){
      throw new Error("NO_AUTH");
      
    } else{

    const data = await cartService.addToCart(idProducto, cantidad);
    setCart(normalizeCart(data));
    }

  };

  const updateQuantity = async (idProducto, cantidad) => {
    if (!isAuthenticated()) throw new Error("NO_AUTH");
    const data = await cartService.updateCartItem(idProducto, cantidad);
    setCart(normalizeCart(data));
  };

  const removeFromCart = async (idProducto) => {
    if (!isAuthenticated()) throw new Error("NO_AUTH");
    const data = await cartService.removeFromCart(idProducto);
    setCart(normalizeCart(data));
  };

  const clearCart = async () => {
    if (!isAuthenticated()) throw new Error("NO_AUTH");
    await cartService.clearCart();
    setCart({ productos: [], total: 0, cantidadTotal: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount: cart.cantidadTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
