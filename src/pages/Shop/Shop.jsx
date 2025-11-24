  import React, { useState, useEffect, useContext } from "react";
  import { Search, ShoppingCart, AlertCircle, Loader } from "lucide-react";
  import productService from "../../api/services/productService";
  import { CartContext } from "../../context/CartContext";
  import Swal from "sweetalert2";
  import styles from "./Shop.module.css";
  import { LoaderAP } from "../../components/common/Loader/LoaderAP";

  const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
      loadInitialData();
    }, []);

    useEffect(() => {
      applyFilters();
    }, [products, searchTerm, selectedCategory]);

    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudieron cargar los productos. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    const applyFilters = () => {
      let filtered = [...products];

      // Filtro de búsqueda
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filtro de categoría
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.idCategoria === selectedCategory.id
        );
      }

      setFilteredProducts(filtered);
    };

    const handleAddToCart = async (product) => {
      try {
        await addToCart(product.id, 1);
        
        // Opción 1: Toast pequeño y discreto (RECOMENDADO)
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: "linear-gradient(145deg, #1f1f1f, #2a2a2a)",
          color: "#fff",
          iconColor: "#ff6600",
          didOpen: (toast) => {
            toast.style.border = "2px solid #ff6600";
            toast.style.boxShadow = "0 8px 20px rgba(255, 102, 0, 0.3)";
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Producto agregado",
          text: `${product.nombre}`,
        });

      } catch (error) {
        console.error("Error al agregar al carrito:", error);
        
        
        // Toast de error también discreto
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "linear-gradient(145deg, #1f1f1f, #2a2a2a)",
          color: "#fff",
          iconColor: "#ef4444",
          didOpen: (toast) => {
            toast.style.border = "2px solid #ef4444";
            toast.style.boxShadow = "0 8px 20px rgba(239, 68, 68, 0.3)";
          },
        });

        Toast.fire({
          icon: "error",
          title: "Debes iniciar sesión",
          text: "Intenta nuevamente",
        });
      }
    };

    if (loading) {
      return (
        <>
        <LoaderAP text='Cargando Productos'/></>
        
      );
    }

    if (error) {
      return (
        <div className={styles.error}>
          <AlertCircle size={48} />
          <p>{error}</p>
          <button className={styles.retryBtn} onClick={loadInitialData}>
            Intentar de nuevo
          </button>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>TIENDA APOCALYSUS</h1>
            <p className={styles.heroSubtitle}>
              Equípate con lo mejor para alcanzar tu máximo nivel
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Categories */}
        <div className={styles.categoriesSection}>
          <h2 className={styles.categoriesTitle}>Categorías</h2>
          <div className={styles.categoriesGrid}>
            <button
              className={`${styles.categoryCard} ${
                !selectedCategory ? styles.categoryActive : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              <div className={styles.categoryIcon}>🎯</div>
              <h3>Todas</h3>
              <span className={styles.categoryCount}>{products.length}</span>
            </button>

            {categories.map((category) => {
              const count = products.filter(
                (p) => p.idCategoria === category.id
              ).length;
              return (
                <button
                  key={category.id}
                  className={`${styles.categoryCard} ${
                    selectedCategory?.id === category.id
                      ? styles.categoryActive
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className={styles.categoryIcon}>
                    {category.icono || "📦"}
                  </div>
                  <h3>{category.nombre}</h3>
                  <span className={styles.categoryCount}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Section */}
        <div className={styles.productsSection}>
          <div className={styles.productsHeader}>
            <h2 className={styles.productsTitle}>
              {selectedCategory ? selectedCategory.nombre : "Todos los Productos"}
            </h2>
            <span className={styles.resultsCount}>
              {filteredProducts.length} producto(s)
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className={styles.noProducts}>
              <AlertCircle size={48} />
              <p>No se encontraron productos</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    <img
                      src={product.imagenUrl || "https://via.placeholder.com/300"}
                      alt={product.nombre}
                      className={styles.productImage}
                    />
                    {product.cantidadDisponible < 10 &&
                      product.cantidadDisponible > 0 && (
                        <span className={styles.lowStockBadge}>
                          ¡Últimas unidades!
                        </span>
                      )}
                    {product.cantidadDisponible === 0 && (
                      <span className={styles.outOfStockBadge}>Agotado</span>
                    )}
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>
                      {product.nombreCategoria}
                    </span>
                    <h3 className={styles.productName}>{product.nombre}</h3>
                    <p className={styles.productDescription}>
                      {product.descripcion || "Producto de alta calidad"}
                    </p>

                    <div className={styles.productFooter}>
                      <div className={styles.priceContainer}>
                        <span className={styles.productPrice}>
                          ${product.precio?.toLocaleString("es-CO")}
                        </span>
                        <span className={styles.productStock}>
                          Stock: {product.cantidadDisponible}
                        </span>
                      </div>

                      <button
                        className={`${styles.addToCartBtn} ${
                          product.cantidadDisponible === 0
                            ? styles.addToCartBtnDisabled
                            : ""
                        }`}
                        onClick={() => handleAddToCart(product)}
                        disabled={product.cantidadDisponible === 0}
                      >
                        <ShoppingCart size={18} />
                        {product.cantidadDisponible === 0 ? "Agotado" : "Agregar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default Shop;