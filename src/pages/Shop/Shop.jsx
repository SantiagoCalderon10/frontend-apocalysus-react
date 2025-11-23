import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  AlertCircle,
  Loader,
} from "lucide-react";
import productService from "../../api/services/productService";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useContext(CartContext);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudieron cargar los productos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtro de precio
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((product) => {
        const price = product.price;
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1);
      // Mostrar notificación de éxito (puedes implementar un toast)
      Swal.fire({
        title: "¡Producto agregado al carrito!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar al carrito");
    }
  };

  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div style={styles.loading}>
        <Loader size={48} style={styles.spinner} />
        <p style={styles.loadingText}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <AlertCircle size={48} style={styles.errorIcon} />
        <p style={styles.errorText}>{error}</p>
        <button style={styles.retryBtn} onClick={loadProducts}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Tienda Apocalysus</title>
      </head>
      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>TIENDA APOCALYSUS</h1>
            <p style={styles.heroSubtitle}>
              Equípate con lo mejor para alcanzar tu máximo nivel
            </p>
          </div>
        </section>

        <div style={styles.mainContent}>
          {/* Sidebar Filters */}
          <aside
            style={{
              ...styles.sidebar,
              ...(showFilters ? styles.sidebarActive : {}),
            }}
          >
            <div style={styles.filterHeader}>
              <Filter size={20} />
              <h3 style={styles.filterTitle}>Filtros</h3>
              <button
                style={styles.closeMobileFilters}
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>
            </div>

            {/* Categorías */}
            <div style={styles.filterGroup}>
              <h4 style={styles.filterLabel}>Categoría</h4>
              <div style={styles.filterOptions}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={styles.radioInput}
                  />
                  <span>Todos</span>
                </label>
                {categories.map((category) => (
                  <label key={category} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={styles.radioInput}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rango de precio */}
            <div style={styles.filterGroup}>
              <h4 style={styles.filterLabel}>Precio</h4>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={styles.select}
              >
                <option value="all">Todos los precios</option>
                <option value="0-50000">Menos de $50.000</option>
                <option value="50000-100000">$50.000 - $100.000</option>
                <option value="100000-200000">$100.000 - $200.000</option>
                <option value="200000">Más de $200.000</option>
              </select>
            </div>

            {/* Botón limpiar filtros */}
            <button
              style={styles.clearBtn}
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange("all");
                setSearchTerm("");
                setSortBy("default");
              }}
            >
              Limpiar filtros
            </button>
          </aside>

          {/* Products Section */}
          <main style={styles.productsSection}>
            {/* Search and Sort Bar */}
            <div style={styles.toolbar}>
              <div style={styles.searchContainer}>
                <Search size={20} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              <div style={styles.toolbarRight}>
                <button
                  style={styles.mobileFilterBtn}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  Filtros
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="default">Ordenar por</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                  <option value="name-desc">Nombre: Z-A</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div style={styles.resultsCount}>
              Mostrando <strong>{filteredProducts.length}</strong> productos
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div style={styles.noProducts}>
                <AlertCircle size={48} style={styles.noProductsIcon} />
                <p style={styles.noProductsText}>
                  No se encontraron productos con esos filtros
                </p>
              </div>
            ) : (
              <div style={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <div key={product.id} style={styles.productCard}>
                    <div style={styles.productImageContainer}>
                      <img
                        src={
                          product.imagenUrl || "https://via.placeholder.com/300"
                        }
                        alt={product.nombre}
                        style={styles.productImage}
                      />
                      {product.cantidadDisponible < 10 &&
                        product.cantidadDisponible > 0 && (
                          <span style={styles.lowStockBadge}>
                            ¡Últimas unidades!
                          </span>
                        )}
                      {product.stock === 0 && (
                        <span style={styles.outOfStockBadge}>Agotado</span>
                      )}
                    </div>

                    <div style={styles.productInfo}>
                      <h3 style={styles.productName}>{product.nombre}</h3>
                      <p style={styles.productDescription}>
                        {product.descripcion || "Producto de alta calidad"}
                      </p>

                      <div style={styles.productFooter}>
                        <div style={styles.priceContainer}>
                          <span style={styles.productPrice}>
                            ${product.precio?.toLocaleString("es-CO")}
                          </span>
                        </div>

                        <button
                          style={{
                            ...styles.addToCartBtn,
                            ...(product.stock === 0
                              ? styles.addToCartBtnDisabled
                              : {}),
                          }}
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart size={18} />
                          {product.stock === 0 ? "Agotado" : "Agregar"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

// ========== ESTILOS ==========
const styles = {
  container: {
    background: "#0a0a0a",
    paddingTop: "80px",
    padding: "0",
  },
  hero: {
    background:
      "linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 10, 10, 0.8) 100%)",
    padding: "60px 20px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 102, 0, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontFamily: "Anton, sans-serif",
    fontSize: "3rem",
    background: "linear-gradient(to bottom, #ffffff, #ff9500)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    letterSpacing: "3px",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#b9bbbd",
    fontWeight: "600",
  },
  mainContent: {
    display: "flex",
    gap: "2rem",
    maxWidth: "1400px",
    margin: "2rem auto",
    padding: "0 2rem",
  },
  sidebar: {
    width: "280px",
    background: "rgba(20, 20, 20, 0.9)",
    borderRadius: "15px",
    padding: "1.5rem",
    height: "fit-content",
    position: "sticky",
    top: "100px",
    border: "1px solid rgba(255, 102, 0, 0.2)",
  },
  sidebarActive: {
    display: "block",
  },
  filterHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
    color: "#ff9500",
  },
  filterTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#ffffff",
    flex: 1,
  },
  closeMobileFilters: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "#b9bbbd",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  filterGroup: {
    marginBottom: "1.5rem",
  },
  filterLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#ff9500",
    marginBottom: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  filterOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#b9bbbd",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  radioInput: {
    accentColor: "#ff6600",
    cursor: "pointer",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    background: "rgba(10, 10, 10, 0.8)",
    border: "1px solid rgba(255, 102, 0, 0.3)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "0.9rem",
    cursor: "pointer",
    outline: "none",
  },
  clearBtn: {
    width: "100%",
    padding: "0.75rem",
    background: "transparent",
    border: "1px solid rgba(255, 102, 0, 0.3)",
    borderRadius: "10px",
    color: "#ff9500",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  productsSection: {
    flex: 1,
  },
  toolbar: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchContainer: {
    position: "relative",
    flex: "1",
    minWidth: "250px",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#b9bbbd",
  },
  searchInput: {
    width: "100%",
    padding: "0.75rem 0.75rem 0.75rem 45px",
    background: "rgba(20, 20, 20, 0.9)",
    border: "1px solid rgba(255, 102, 0, 0.3)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
  },
  toolbarRight: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  mobileFilterBtn: {
    display: "none",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.25rem",
    background: "rgba(255, 102, 0, 0.1)",
    border: "1px solid rgba(255, 102, 0, 0.3)",
    borderRadius: "10px",
    color: "#ff9500",
    fontWeight: "600",
    cursor: "pointer",
  },
  sortSelect: {
    padding: "0.75rem 1rem",
    background: "rgba(20, 20, 20, 0.9)",
    border: "1px solid rgba(255, 102, 0, 0.3)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "0.9rem",
    cursor: "pointer",
    outline: "none",
  },
  resultsCount: {
    color: "#b9bbbd",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
  },
  productCard: {
    background: "rgba(20, 20, 20, 0.9)",
    border: "1px solid rgba(255, 102, 0, 0.3)",
    borderRadius: "15px",
    overflow: "hidden",
    transition: "all 0.4s ease",
    cursor: "pointer",
  },
  productImageContainer: {
    position: "relative",
    width: "100%",
    height: "250px",
    overflow: "hidden",
    background: "rgba(10, 10, 10, 0.5)",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  lowStockBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#f59e0b",
    color: "#000",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "700",
  },
  outOfStockBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#ef4444",
    color: "#fff",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "700",
  },
  productInfo: {
    padding: "1.5rem",
  },
  productName: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "0.5rem",
  },
  productDescription: {
    fontSize: "0.9rem",
    color: "#b9bbbd",
    marginBottom: "1rem",
    lineHeight: "1.5",
  },
  productFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  productPrice: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#ff9500",
  },
  productStock: {
    fontSize: "0.8rem",
    color: "#b9bbbd",
  },
  addToCartBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.25rem",
    background: "linear-gradient(135deg, #ff6600, #c37d22)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },


  
  addToCartBtnDisabled: {
    background: "rgba(100, 100, 100, 0.5)",
    cursor: "not-allowed",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "1rem",
  },
  spinner: {
    color: "#ff9500",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#b9bbbd",
    fontSize: "1.2rem",
  },
  error: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "1rem",
    padding: "2rem",
  },
  errorIcon: {
    color: "#ef4444",
  },
  errorText: {
    color: "#b9bbbd",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  retryBtn: {
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(135deg, #ff6600, #c37d22)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  noProducts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
    gap: "1rem",
  },
  noProductsIcon: {
    color: "#ff9500",
  },
  noProductsText: {
    color: "#b9bbbd",
    fontSize: "1.2rem",
  },
};

export default Shop;
