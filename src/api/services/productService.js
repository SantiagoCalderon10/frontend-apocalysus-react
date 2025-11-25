// src/api/productService.js
import axiosInstance from '../config/axiosConfig';

const productService = {
  // GET /api/productos - Obtener todos los productos (PÚBLICO)
  getAllProducts: async () => {
    try {
      console.log('📦 Obteniendo todos los productos...');
      const response = await axiosInstance.get('/productos');
      console.log('✅ Productos obtenidos:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      throw error;
    }
  },

  // GET /api/productos/{id} - Obtener producto por ID (PÚBLICO)
  getProductById: async (id) => {
    try {
      console.log('📦 Obteniendo producto con ID:', id);
      const response = await axiosInstance.get(`/productos/${id}`);
      console.log('✅ Producto obtenido:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener producto:', error);
      throw error;
    }
  },

  // POST /api/productos - Crear producto (ADMIN - REQUIERE TOKEN)
  createProduct: async (productData) => {
    try {
      console.log('➕ Creando producto:', productData);
      console.log('🔑 Token presente:', !!localStorage.getItem('token'));
      
      const response = await axiosInstance.post('/productos', productData);
      console.log('✅ Producto creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  // PUT /api/productos/{id} - Actualizar producto completo (ADMIN - REQUIERE TOKEN)
  updateProduct: async (id, productData) => {
    try {
      console.log('✏️ Actualizando producto ID:', id, 'con datos:', productData);
      console.log('🔑 Token presente:', !!localStorage.getItem('token'));
      
      const response = await axiosInstance.put(`/productos/${id}`, productData);
      console.log('✅ Producto actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  // DELETE /api/productos/{id} - Eliminar producto (ADMIN - REQUIERE TOKEN)
  deleteProduct: async (id) => {
    try {
      console.log('🗑️ Eliminando producto con ID:', id);
      console.log('🔑 Token presente:', !!localStorage.getItem('token'));
      
      const response = await axiosInstance.delete(`/productos/${id}`);
      console.log('✅ Producto eliminado correctamente');
      return response.data;
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  // GET /api/categorias - Obtener categorías (PÚBLICO)
  getCategories: async () => {
    try {
      console.log('🏷️ Obteniendo categorías...');
      const response = await axiosInstance.get(`/categorias`);
      console.log('✅ Categorías obtenidas:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ Error al cargar categorías:', error);
      throw error;
    }
  },

  // PATCH /api/productos/{id}/stock - Actualizar solo stock (ADMIN - REQUIERE TOKEN)
  updateStock: async (id, cantidad) => {
    try {
      console.log('📊 Actualizando stock del producto ID:', id, 'a cantidad:', cantidad);
      console.log('🔑 Token presente:', !!localStorage.getItem('token'));
      
      const response = await axiosInstance.patch(`/productos/${id}/stock`, null, {
        params: { cantidad }
      });
      console.log('✅ Stock actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al actualizar stock:', error);
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },
};

export default productService;