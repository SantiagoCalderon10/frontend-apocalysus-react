import axiosInstance from "../config/axiosConfig";

const userService = {
  getCurrentUser: async () => {
    return axiosInstance.get("/usuarios/me"); // Nuevo endpoint
  },
  getAddresses: async () => {
    return axiosInstance.get("/usuarios/direcciones");
  },

  addAddress: async (direccion) => {
    return axiosInstance.post("/usuarios/direcciones", direccion);
  },

   getUsers: async () => {
    const response = await axiosInstance.get("/usuarios/listar");
    return response.data
  },
};

export default userService;
