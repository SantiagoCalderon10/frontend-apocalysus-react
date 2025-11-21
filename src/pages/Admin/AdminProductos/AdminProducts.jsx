import React, { useEffect, useState } from "react";
import productService from "../../../api/productService";
import ProductModal from "../../../components/products/ProductModal";
import styles from "./AdminProductos.module.css";
import Swal from "sweetalert2";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      alert("❌ Error cargando productos");
    }
  };

  const loadCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (error) {
      alert("❌ Error cargando categorías");
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {

    Swal.fire({
      title: "¿Estás seguro de qué quieres eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }      
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
      await productService.deleteProduct(id);
      Swal.fire({
          title: "¡Se ha eliminado el registro correctamente!",
        icon: "success",
      });
      loadProducts();
    } catch (error) {
      Swal.fire({
        title: "¡Oh, oh, ha ocurrido un error!",
        text: "Regresa",
        icon: "error",
      });
    }
      }else{
        return
      }
    
    
    });  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Administrar Productos</h1>

      <button className={styles.addButton} onClick={openCreateModal}>
        + Agregar Producto
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.imagenUrl ? (
                  <img
                    src={product.imagenUrl}
                    alt={product.nombre}
                    className={styles.img}
                  />
                ) : (
                  <span className={styles.noImg}>Sin imagen</span>
                )}
              </td>

              <td>{product.nombre}</td>
              <td>${product.precio}</td>
              <td>{product.nombreCategoria}</td>
              <td>{product.cantidadDisponible}</td>

              <td className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => openEditModal(product)}
                >
                  Editar
                </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          product={selectedProduct}
          categories={categories}
          reloadProducts={loadProducts}
        />
      )}
    </div>
  );
};

export default AdminProducts;
