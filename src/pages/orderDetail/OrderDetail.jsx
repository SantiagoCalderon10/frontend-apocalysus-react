import React from "react";
import styles from "../Chekout/Order.module.css"; // IMPORT CORRECTO
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



function OrderDetail() {
  const navigate = useNavigate();
  const {state} = useLocation();

  // Validación de seguridad en caso de acceso indebido
  if (!state) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>No hay información del pedido</h2>
        <p style={{ color: "#ccc", textAlign: "center" }}>
          Parece que no has realizado un pedido recientemente.
        </p>
        <button
          className={styles.confirmBtn}
          onClick={() => navigate("/shop")}
        >
          Volver a comprar
        </button>
      </div>
    );
  }

    const { code, productos, total, direccion, metodoPago } = state;

    console.log(state)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resumen de tu pedido</h2>

      {/* Código del pedido */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Código del pedido</h3>
        <p style={{ color: "#ccc", fontSize: "1.1rem", textAlign: "center" }}>
          {code ?? "Desconocido"}
        </p>
      </div>

      {/* Productos */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Productos adquiridos</h3>

        <ul className={styles.productsList}>
          {productos.map((item, i) => (
            <li key={i} className={styles.item}>
              <div className={styles.itemInfo}>
                <img
                  className={styles.itemImg}
                  src={
                    item.imagenUrl ||
                    "https://via.placeholder.com/80?text=Producto"
                  }
                  alt={item.nombreProducto || "Producto"}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/80?text=Producto")
                  }
                />
                <span className={styles.itemName}>
                  {item.nombreProducto ?? "Producto sin nombre"}
                </span>
                <span className={styles.itemQty}>x{item.cantidad ?? 1}</span>
              </div>

              <span className={styles.itemPrice}>
                ${item.subtotal?.toLocaleString() ?? "0"}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.total}>
          <span>Total:</span>
          <span className={styles.totalAmount}>
            ${total?.toLocaleString() ?? "0"}
          </span>
        </div>
      </div>

      {/* Dirección */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Dirección de entrega</h3>
        {direccion? (
          <p style={{ color: "#ccc", textAlign: "center", lineHeight: "1.4rem" }}>
            {direccion}
          </p>
        ) : (
          <p style={{ color: "#ccc" }}>No hay dirección disponible</p>
        )}
      </div>

      {/* Método de pago */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Método de pago</h3>
        {metodoPago? (
          <p style={{ color: "#ccc", textAlign: "center" }}>
            {metodoPago}
          </p>
        ) : (
          <p style={{ color: "#ccc" }}>No hay método seleccionado</p>
        )}
      </div>

      {/* Botón */}
      <div className={styles.footerLayout}>
        <button className={styles.confirmBtn} onClick={() => navigate("/shop")}>
          Volver a comprar
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
