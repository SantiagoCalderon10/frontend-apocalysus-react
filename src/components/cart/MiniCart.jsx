import { useCart } from "../../context/CartContext";
import styles from "./MiniCart.module.css";
import Swal from "sweetalert2";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

export default function MiniCart({ open, close }) {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const confirmClearCart = async (idUsuario) => {
    Swal.fire({
      title: "¿Estás seguro de qué quieres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clearCart(idUsuario);
          Swal.fire({
            title: "¡Se ha limpiado el carrito!",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "¡Oh, oh, ha ocurrido un error!",
            text: "Regresa",
            icon: "error",
          });
        }
      } else {
        return;
      }
    });
  };

  const navigate = useNavigate();
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

        {loading ? (
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
                    {" "}
                    ${p.subtotal?.toLocaleString("es-CO")}
                  </span>
                  <div className={styles.valores}>
                    <button
                      className={styles.cambioCantidad}
                      onClick={() =>
                        updateQuantity(p.idProducto, p.cantidad - 1)
                      }
                    >
                      {" "}
                      <FaMinus />
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={p.cantidad}
                      onChange={(e) =>
                        updateQuantity(p.idProducto, parseInt(e.target.value))
                      }
                      className={styles.quantity}
                    />
                    <button
                      onClick={() =>
                        updateQuantity(p.idProducto, p.cantidad + 1)
                      }
                      className={styles.cambioCantidad}
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

        <div className={styles.footer}>
          <p className={styles.total}>
            Total: ${cart.total?.toLocaleString("es-CO")}
          </p>
          {!cart.productos?.length ? (
            <button className={styles.payBtn} onClick={() => navigate("/shop")}>
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
              <button
                className={styles.emptyCart}
                onClick={() => confirmClearCart(3)}
              >
                Vaciar Carrito
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
