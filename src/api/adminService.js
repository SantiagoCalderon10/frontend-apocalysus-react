import axiosInstance from "./config/axiosConfig";

const adminService = {
  // GET /api/carrito/{idUsuario} - Obtener carrito del usuario
  getStats: async () => {
    try {
      const response = await axiosInstance.get(`/admin/estadisticas`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las estadisticas:", error);
      throw error;
    }
  }}

  export default adminService;
