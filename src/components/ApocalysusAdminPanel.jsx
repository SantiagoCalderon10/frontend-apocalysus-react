import React, { useEffect, useState } from "react";
import "../styles/ApocalysusAdminPanel.css";
import { getProductos, crearProducto, eliminarProducto, actualizarProducto } from "../services/productoService";

const ApocalysusAdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    cantidadDisponible: 0,
    imagen: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        await actualizarProducto(productoEditando.idProducto, nuevoProducto);
      } else {
        await crearProducto(nuevoProducto);
      }
      setNuevoProducto({ nombre: "", descripcion: "", precio: 0, cantidadDisponible: 0, imagen: "" });
      setModoEdicion(false);
      setProductoEditando(null);
      await cargarProductos();
    } catch (error) {
      alert("Error al guardar el producto");
    }
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoEditando(producto);
    setNuevoProducto({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidadDisponible: producto.cantidadDisponible,
    });
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      try {
        await eliminarProducto(id);
        await cargarProductos();
      } catch {
        alert("Error al eliminar producto");
      }
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1>Panel Administrativo Apocalysus 🦂</h1>
        <button className="add-btn" onClick={() => setModoEdicion(false)}>+ Nuevo Producto</button>
      </div>

      <div className="panel-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input type="text" name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={handleChange} required />
          <input type="text" name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={handleChange} required />
          <input type="number" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" value={nuevoProducto.cantidadDisponible} onChange={handleChange} required />
          <button className="add-btn" type="submit">
            {modoEdicion ? "Actualizar" : "Agregar"}
          </button>
        </form>

        <div className="product-grid">
          {productosFiltrados.map((p) => (
            <div key={p.idProducto} className="product-card">
              <img src={p.imagen || "https://via.placeholder.com/150"} alt={p.nombre} style={{ width: "100%", borderRadius: "8px" }} />
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <p><strong>${p.precio?.toLocaleString("es-CO")}</strong></p>
              <p>Stock: {p.stock}</p>
              <button className="add-btn" onClick={() => handleEditar(p)}>Editar</button>
              <button
                className="add-btn"
                style={{ backgroundColor: "#d9534f", marginLeft: "5px" }}
                onClick={() => handleEliminar(p.idProducto)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApocalysusAdminPanel;
