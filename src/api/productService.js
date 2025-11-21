// src/api/productService.js
import axiosInstance from './config/axiosConfig';

const productService = {
  // GET /api/productos - Obtener todos los productos
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  // GET /api/productos/{id} - Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // POST /api/productos - Crear producto (ADMIN)
  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/productos', productData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  // PUT /api/productos/{id} - Actualizar producto completo (ADMIN)
  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(`/productos/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  // DELETE /api/productos/{id} - Eliminar producto (ADMIN)
  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },


    getCategories: async () => {
    try {
      const response = await axiosInstance.get(`/categorias`);
      return response.data;
    } catch (error) {
      console.error('Error al cargar categorias:', error);
      throw error;
    }
  },


  // PATCH /api/productos/{id}/stock - Actualizar solo stock (ADMIN)
  updateStock: async (id, cantidad) => {
    try {
      const response = await axiosInstance.patch(`/productos/${id}/stock`, null, {
        params: { cantidad }
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      throw error;
    }
  },
};

export default productService;