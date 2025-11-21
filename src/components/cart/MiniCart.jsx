import { useCart } from "../../context/CartContext";
import styles from "./MiniCart.module.css";

export default function MiniCart({ open, close }) {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();

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
                  <span className={styles.itemPrice}>${p.subtotal}</span>

                  <input
                    type="number"
                    min={1}
                    value={p.cantidad}
                    onChange={(e) =>
                      updateQuantity(p.idProducto, parseInt(e.target.value))
                    }
                    className={styles.quantity}
                  />
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(p.idProducto)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.total}>Total: ${cart.total}</p>
          <button className={styles.payBtn}>Ir a pagar</button>
        </div>
      </div>
    </div>
  );
}
