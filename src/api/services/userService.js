import axiosInstance from "../config/axiosConfig";

const userService = {
  // Crear nuevo pedido (checkout)
  getAddresses: async () => {
  return axiosInstance.get("/usuarios/direcciones");
},

addAddress: async (direccion) => {
  return axiosInstance.post("/usuarios/agregardireccion", direccion);
},

};

export default userService;
