// src/api/orderService.js
import axiosInstance from '../config/axiosConfig';

const orderService = {
  // Crear nuevo pedido (checkout)
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/pedidos/crear', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los pedidos del usuario
  getUserOrders: async () => {
    try {
      const response = await axiosInstance.get('/orders/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener pedido por ID
  getOrdersById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/pedidos/historial/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los pedidos (ADMIN)
  getAllOrders: async () => {
    try {
      const response = await axiosInstance.get('/pedidos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar estado del pedido (ADMIN)
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
        status
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },



  


   getPayMethods: async () => {
    try {
      const response = await axiosInstance.get('/pedidos/metodospago');
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  
};

export default orderService;