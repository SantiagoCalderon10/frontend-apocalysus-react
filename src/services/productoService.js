const API_URL = "http://localhost:8080/api/productos";

// GET: Obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (error) {
    console.error("Error en getProductos:", error);
    throw error;
  }
};

// POST: Crear producto
export const crearProducto = async (producto) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const mensaje = await response.text();
      throw new Error(mensaje || "Error al crear producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en crearProducto:", error);
    throw error;
  }
};

// PUT: Actualizar producto
export const actualizarProducto = async (id, producto) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const mensaje = await response.text();
      throw new Error(mensaje || "Error al actualizar producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    throw error;
  }
};

// DELETE: Eliminar producto
export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const mensaje = await response.text();
      throw new Error(mensaje || "Error al eliminar producto");
    }

    return true;
  } catch (error) {
    console.error("Error en eliminarProducto:", error);
    throw error;
  }
};

// PATCH: Actualizar stock
export const actualizarStock = async (id, cantidad) => {
  try {
    const response = await fetch(`${API_URL}/${id}/stock?cantidad=${cantidad}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      const mensaje = await response.text();
      throw new Error(mensaje || "Error al actualizar stock");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en actualizarStock:", error);
    throw error;
  }

}