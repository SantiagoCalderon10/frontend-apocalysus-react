// src/pages/Chekout/Order.jsx

import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Order.module.css";
import orderService from "../../api/orderService";

function Order() {
  const { cart, loading } = useCart();
  const navigate = useNavigate();
  
  const [metodos, setMetodos] = useState([]);
  const [metodoSeleccion , setMetodosSeleccion] = useState("")
  const [direccion, setDireccion] = useState("Cra 12 # 45-67, Medellín");

  // Evitar acceso sin productos
  useEffect(() => {
    if (!loading && cart.productos.length === 0) {
      navigate("/shop");
    }
  }, [loading, cart]);

   useEffect(() => {
    const loadPayMethod = async () => {
      try {
        const data = await orderService.getPayMethods();
        setMetodos(data);
      } catch (error) {
        console.error("Error cargando métodos de pago:", error);
      }
    };

        loadPayMethod();
  }, []);


  const handleConfirm = () => {
    if (!metodoSeleccion) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona un método de pago",
        background: "#0a0a0a",
        color: "white",
      });
      return;
    }

    Swal.fire({
      title: "¿Confirmar pedido?",
      html: `
        <p style="color:#ccc">Método de pago: <strong>${metodoSeleccion}</strong></p>
        <p style="color:#ccc">Dirección: <strong>${direccion}</strong></p>
        <p style="color:#ccc">Total: <strong>$${cart.total.toLocaleString()}</strong></p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff6600",
      cancelButtonColor: "#555",
      background: "#0a0a0a",
      color: "white",
      confirmButtonText: "Sí, realizar pedido",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Pedido confirmado",
          text: "Tu pedido ha sido registrado exitosamente.",
          icon: "success",
          background: "#0a0a0a",
          color: "white",
          confirmButtonColor: "#ff6600",
        })
      }
    });
  };


  return (
  
    <div className={styles.container}>
      <h2 className={styles.title}>Confirma tu pedido</h2>

      {/* Productos */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Productos</h3>
        <ul className={styles.productsList}>
          {cart.productos.map((item) => (
            <li key={item.idProducto} className={styles.item}>
              <div className={styles.itemInfo}>
               <img className={styles.itemImg}
               src={item.imagenUrl} alt="imagenProducto" />
                <span className={styles.itemName}>{item.nombre}</span>
                <span className={styles.itemQty}>x{item.cantidad}</span>
              </div>
              <span className={styles.itemPrice}>
                ${(item.subtotal).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.total}>
          <span>Total:</span>
          <span className={styles.totalAmount}>
            ${cart.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Dirección */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Dirección de entrega</h3>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* Método de pago */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Método de pago</h3>

  <div className={styles.methods}>
    {metodos.map((mp) => (
      <label key={mp.id} className={styles.method}>
        <input
          type="radio"
          name="payment"
          value={mp.nombre}
          onChange={(e) => setMetodosSeleccion(e.target.value)}
        />
        {mp.nombre}
      </label>
    ))}
    </div>
</div>
      <button className={styles.confirmBtn} onClick={handleConfirm}>
        Confirmar Pedido
      </button>
    </div>
  );
}


export default Order;