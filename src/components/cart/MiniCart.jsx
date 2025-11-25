import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./MiniCart.module.css";
import Swal from "sweetalert2";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

export default function MiniCart({ open, close }) {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ALERTA PARA USUARIOS NO LOGUEADOS
  const requireLogin = () => {
    Swal.fire({
      title: "Debes iniciar sesión",
      text: "Inicia sesión para agregar productos al carrito o finalizar tu compra.",
      icon: "warning",
      confirmButtonColor: "#ff6600",
      background: "#0a0a0a",
      color: "white",
    });
  };

  // Confirmación para vaciar carrito
  const confirmClearCart = async () => {
    Swal.fire({
      title: "¿Quieres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6600",
      cancelButtonColor: "#555",
      background: "#0a0a0a",
      color: "white",
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clearCart();
          Swal.fire({
            title: "Carrito vacío",
            icon: "success",
            background: "#0a0a0a",
            color: "white",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo vaciar el carrito",
            icon: "error",
            background: "#0a0a0a",
            color: "white",
          });
        }
      }
    });
  };

  return (
    <div
      className={`${styles.overlay} ${open ? styles.show : ""}`}
      onClick={close}
    >
      <div
        className={`${styles.cartPanel} ${open ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.title}>Tu carrito</h3>

        {/* Si NO está autenticado */}
        {!isAuthenticated() ? (
          <p className={styles.empty}>
            Debes iniciar sesión para ver tu carrito.
            <br />
            <button
              className={styles.payBtn}
              onClick={() => navigate("/login")}
              style={{ marginTop: "10px" }}
            >
              Iniciar sesión
            </button>
          </p>
        ) : loading ? (
          <p className={styles.loading}>Cargando...</p>
        ) : !cart.productos?.length ? (
          <p className={styles.empty}>El carrito está vacío</p>
        ) : (
          <div className={styles.itemsContainer}>
            {cart.productos.map((p) => (
              <div key={p.idProducto} className={styles.item}>
                {p.imagenUrl && (
                  <img
                    src={p.imagenUrl}
                    alt={p.nombre}
                    className={styles.itemImg}
                  />
                )}

                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{p.nombre}</span>
                  <span className={styles.itemPrice}>
                    ${p.subtotal?.toLocaleString("es-CO")}
                  </span>

                  <div className={styles.valores}>
                    <button
                      className={styles.cambioCantidad}
                      onClick={() => {
                        if (p.cantidad !== 1) {
                          updateQuantity(p.idProducto, p.cantidad - 1);
                        }
                      }}
                    >
                      <FaMinus />
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={p.cantidad}
                      onChange={(e) =>
                        updateQuantity(
                          p.idProducto,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className={styles.quantity}
                    />

                    <button
                      className={styles.cambioCantidad}
                      onClick={() =>
                        updateQuantity(p.idProducto, p.cantidad + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(p.idProducto)}
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {isAuthenticated() && (
          <div className={styles.footer}>
            <p className={styles.total}>
              Total: ${cart.total?.toLocaleString("es-CO")}
            </p>

            {!cart.productos?.length ? (
              <button
                className={styles.payBtn}
                onClick={() => navigate("/shop")}
              >
                Agregar productos
              </button>
            ) : (
              <>
                <button
                  className={styles.payBtn}
                  onClick={() => navigate("/order")}
                >
                  Ir a pagar
                </button>

                <button className={styles.emptyCart} onClick={confirmClearCart}>
                  Vaciar Carrito
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
