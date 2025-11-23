// src/components/Invoice/Invoice.jsx
import React from "react";
import styles from "../Order/Order.module.css";

export default function OrderDetail({ productos, total, direccion, metodoPago }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resumen de tu compra</h2>

      {/* Productos */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Productos</h3>
        <ul className={styles.productsList}>
          {productos.map((item) => (
            <li key={item.idProducto} className={styles.item}>
              <div className={styles.itemInfo}>
                <img
                  className={styles.itemImg}
                  src={item.imagenUrl}
                  alt={item.nombre}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/80?text=Producto")}
                />
                <span className={styles.itemName}>{item.nombre}</span>
                <span className={styles.itemQty}>x{item.cantidad}</span>
              </div>
              <span className={styles.itemPrice}>
                ${item.subtotal.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.total}>
          <span>Total a pagar:</span>
          <span className={styles.totalAmount}>${total.toLocaleString()}</span>
        </div>
      </div>

      {/* Dirección */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Dirección de entrega</h3>
        {direccion ? (
          <p style={{ color: "#ccc", textAlign: "center", lineHeight: "1.5rem" }}>
            {direccion.calle}, {direccion.ciudad}, {direccion.departamento}, {direccion.pais}
          </p>
        ) : (
          <p style={{ color: "#ccc", textAlign: "center" }}>No hay dirección seleccionada</p>
        )}
      </div>

      {/* Método de pago */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Método de pago</h3>
        {metodoPago ? (
          <p style={{ color: "#ccc", textAlign: "center", lineHeight: "1.5rem" }}>
            {metodoPago.nombre}
          </p>
        ) : (
          <p style={{ color: "#ccc", textAlign: "center" }}>No hay método de pago seleccionado</p>
        )}
      </div>
    </div>
  );
}
