import axiosInstance from '../config/axiosConfig';

const orderService = {
  createOrder: async (orderData) => {
    try {
      console.log('📦 Creando pedido...');
      console.log('Data del pedido:', orderData);
      
      // 🔥 NO validamos aquí - axiosConfig se encarga del token
      const response = await axiosInstance.post('/pedidos/nuevo', orderData);
      
      console.log('✅ Pedido creado exitosamente:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Error al crear pedido:', error);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      }
      
      throw error;
    }
  },

  getUserOrders: async () => {
    try {
      const response = await axiosInstance.get('/pedidos/historial');
      return response.data;
    } catch (error) {
      console.error('Error al obtener historial de pedidos:', error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await axiosInstance.get('/pedidos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
      throw error;
    }
  },

  getPayMethods: async () => {
    try {
      const response = await axiosInstance.get('/pedidos/metodospago');
      return response.data;
    } catch (error) {
      console.error('Error al obtener métodos de pago:', error);
      throw error;
    }
  },
};

export default orderService;