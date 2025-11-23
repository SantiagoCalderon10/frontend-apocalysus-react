// src/api/cartService.js
import axiosInstance from "../config/axiosConfig";

const cartService = {
  // GET /api/carrito/{idUsuario} - Obtener carrito del usuario
  getCart: async (idUsuario = 3) => {
    try {
      const response = await axiosInstance.get(`/carrito/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      throw error;
    }
  },

  // POST /api/carrito/{idUsuario}/agregar - Agregar producto al carrito
  addToCart: async (idUsuario = 3, idProducto, cantidad = 1) => {
    try {
      const response = await axiosInstance.post(
        `/carrito/${idUsuario}/agregar`,
        null,
        {
          params: { idProducto, cantidad },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      throw error;
    }
  },

  // PUT /api/carrito/{idUsuario}/actualizar - Actualizar cantidad
  updateCartItem: async (idUsuario = 3, idProducto, cantidad) => {
    try {
      const response = await axiosInstance.put(
        `/carrito/${idUsuario}/actualizar`,
        null,
        {
          params: { idProducto, cantidad },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      throw error;
    }
  },

  // DELETE /api/carrito/{idUsuario}/eliminar - Eliminar producto del carrito
  removeFromCart: async (idUsuario = 3, idProducto) => {
    try {
      console.log("idUsuario:", idUsuario, "idProducto:", idProducto);

      const response = await axiosInstance({
        method: "delete",
        url: `/carrito/${idUsuario}/eliminar`,
        params: { idProducto },
      });


      return response.data;
    } catch (error) {
      alert("Error al eliminar del carrito:", error);
      console.error(error)
      throw error;
    }
  },

  // DELETE /api/carrito/{idUsuario}/vaciar - Vaciar carrito completo
  clearCart: async (idUsuario = 3) => {
    try {
      const response = await axiosInstance.delete(
        `/carrito/${idUsuario}/vaciar`
      );
      return response.data;
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      throw error;
    }
  },
};

export default cartService;
