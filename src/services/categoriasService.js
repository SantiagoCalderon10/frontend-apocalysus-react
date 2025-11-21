const API_URL = "http://localhost:8080/api/categorias";

export const getCategorias = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener categorías");
  return await response.json();
};
