// src/api/services/cartService.js
import axiosInstance from '../config/axiosConfig';

const cartService = {
  
  // Obtener carrito del usuario autenticado
  getCart: async () => {
    try {
      const response = await axiosInstance.get('/carrito');
      return response.data;
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      throw error;
    }
  },

  // Agregar producto al carrito
  addToCart: async (idProducto, cantidad = 1) => {
    try {
      const response = await axiosInstance.post(`/carrito/agregar`, null, {
        params: { idProducto, cantidad }
      });
      return response.data;
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      throw error;
    }
  },

  // Actualizar cantidad de un producto
  updateCartItem: async (idProducto, cantidad) => {
    try {
      const response = await axiosInstance.put(`/carrito/actualizar`, null, {
        params: { idProducto, cantidad }
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      throw error;
    }
  },

  // Eliminar producto del carrito
  removeFromCart: async (idProducto) => {
    try {
      const response = await axiosInstance.delete(`/carrito/eliminar`, {
        params: { idProducto }
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error;
    }
  },

  // Vaciar carrito
  clearCart: async () => {
    try {
      const response = await axiosInstance.delete(`/carrito/vaciar`);
      return response.data;
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      throw error;
    }
  }
};

export default cartService;
