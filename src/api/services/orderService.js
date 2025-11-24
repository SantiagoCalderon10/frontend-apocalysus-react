import axiosInstance from '../config/axiosConfig';

const orderService = {
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/pedidos/crear', orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await axiosInstance.get('/pedidos/historial');
    return response.data;
  },

  getAllOrders: async () => {
    const response = await axiosInstance.get('/pedidos');
    return response.data;
  },

  getPayMethods: async () => {
    const response = await axiosInstance.get('/pedidos/metodospago');
    return response.data;
  },
};

export default orderService;
