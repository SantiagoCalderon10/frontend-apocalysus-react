import axiosInstance from "../config/axiosConfig";

const userService = {
  // Crear nuevo pedido (checkout)
  addAddress: async (address, idUsuario) => {
    try {
      const response = await axiosInstance.post(
        `/usuarios/agregardireccion/${idUsuario}`,
        address
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAddressByUser: async (idUsuario) => {
    try {
      const response = await axiosInstance.get(
        `/usuarios/direcciones/${idUsuario}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
