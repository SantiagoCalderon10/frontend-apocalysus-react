import React, { useEffect, useState } from "react";
import productService from "../../api/services/productService";
import styles from "./ProductModal.module.css";
import Swal from "sweetalert2";

const ProductModal = ({
  isOpen,
  closeModal,
  product,
  categories,
  reloadProducts,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagenUrl: "",
    idCategoria: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        cantidadDisponible: product.cantidadDisponible,
        imagenUrl: product.imagenUrl,
        idCategoria: product.idCategoria || "",
      });
    } else {
      setFormData({
        nombre: "",
        precio: "",
        descripcion: "",
        cantidadDisponible: "",
        imagenUrl: "",
        idCategoria: "",
      });
    }
  }, [product]);

  if (!isOpen) return null; // No renderizar nada si no está abierto

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product) {
        await productService.updateProduct(product.id, formData);
        Swal.fire({
          title: "¡Éxito!",
          text: "El registro se actualizó correctamente!",
          icon: "success",
          backdrop: true,
          customClass: {
            popup: "swal-front",
          },
        });
      } else {
        await productService.createProduct(formData);
        Swal.fire({
          title: "El registro se creó correctamente!.",
          icon: "success",
        });
      }
      reloadProducts();
      closeModal();
      

    } catch (error) {
      Swal.fire({
        title: "!Oh, oh!",
        text: "Ha ocurrido un error.",
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Encabezado */}
        <div className={styles.header}>
          <h2>{product ? "Editar Producto" : "Nuevo Producto"}</h2>
          <button className={styles.closeButton} onClick={closeModal}>
            ✖
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
          />

          <label>Cantidad Disponible</label>
          <input
            type="number"
            name="cantidadDisponible"
            value={formData.cantidadDisponible}
            onChange={handleChange}
          />

          <label>Imagen (URL)</label>
          <input
            type="text"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
          />

          <label>Categoría</label>
          <select
            name="idCategoria"
            value={formData.idCategoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <button type="submit" className={styles.saveButton}>
            {product ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
