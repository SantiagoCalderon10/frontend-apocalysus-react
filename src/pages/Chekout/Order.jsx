import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Order.module.css";
import orderService from "../../api/services/orderService";
import userService from "../../api/services/userService";
import cartService from "../../api/services/cartService";
import { CartContext } from "./../../context/CartContext";
import OrderDetail from "../orderDetail/OrderDetail";

function Order() {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();
  const [metodos, setMetodos] = useState([]);
  const [metodoSeleccion, setMetodosSeleccion] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [direccion, setDireccion] = useState(null);
  const [orderCreated, setOrderCreated] = useState(null);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  // Cargar direcciones
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const data = await userService.getAddressByUser(3); // cambiar luego por usuario real
        setDirecciones(data);
      } catch (error) {
        console.error("Error cargando direcciones", error);
      }
    };
    loadAddress();
  }, []);

  // Evitar acceso sin productos
  useEffect(() => {
    if (!loading && cart.productos.length === 0 && !pedidoFinalizado) {
      navigate("/shop");
    }
  }, [loading, cart, pedidoFinalizado]);

  // Cargar métodos de pago
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

  const handleConfirm = async () => {
    if (!metodoSeleccion) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona un método de pago",
        background: "#0a0a0a",
        color: "white",
      });
      return;
    }

    if (!direccion) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona una dirección",
        background: "#0a0a0a",
        color: "white",
      });
      return;
    }

    // OBJETO FINAL que debe recibir tu backend:
    const orderData = {
      idUsuario: 3, // cambiar por ID real (JWT luego)
      idDireccion: direccion.id,
      idMetodoPago: metodoSeleccion.idMetodoPago,
    };
    Swal.fire({
      title: "¿Confirmar pedido?",
      html: `
    <p style="color:#ccc">Método de pago: <strong>${
      metodoSeleccion.nombre
    }</strong></p>
    <p style="color:#ccc">Dirección: <strong>
      ${direccion.calle}, ${direccion.ciudad}, ${direccion.departamento}, ${
        direccion.pais
      }
    </strong></p>
    <p style="color:#ccc">Total: <strong>$${cart.total.toLocaleString()}</strong></p>
  `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff6600",
      cancelButtonColor: "#555",
      background: "#0a0a0a",
      color: "white",
      confirmButtonText: "Sí, realizar pedido",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(orderData);
        try {
          const response = await orderService.createOrder(orderData);
          setOrderCreated(response);

          console.log(response);

          Swal.fire({
            title: "Pedido confirmado",
            text: "Tu pedido ha sido registrado exitosamente.",
            icon: "success",
            background: "#0a0a0a",
            color: "white",
          });
          await clearCart(3);
          setPedidoFinalizado(true);
          navigate("/orderdetail", {
            state: {
              code: response.codigoPedido,
              productos: response.items,
              total: response.precioTotal,
              direccion: response.direccion,
              metodoPago: response.metodoPago,
            },
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo crear el pedido",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      {orderCreated ? null  : (
        // Aquí va el contenido actual de Order.jsx
        <div className={styles.container}>
          <h2 className={styles.title}>Confirma tu pedido</h2>

          {/* Productos */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Productos</h3>
            <ul className={styles.productsList}>
              {cart.productos.map((item) => (
                <li key={item.idProducto} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <img
                      className={styles.itemImg}
                      src={item.imagenUrl}
                      alt="imagenProducto"
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
              <span>Total:</span>
              <span className={styles.totalAmount}>
                ${cart.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Direcciones */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Dirección de entrega</h3>
            <select
              className={styles.input}
              value={direccion ? JSON.stringify(direccion) : ""}
              onChange={(e) => setDireccion(JSON.parse(e.target.value))}
            >
              <option value="">Selecciona una dirección</option>
              {direcciones.map((dir) => (
                <option key={dir.id} value={JSON.stringify(dir)}>
                  {dir.calle}, {dir.ciudad}, {dir.departamento}, {dir.pais}
                </option>
              ))}
            </select>
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
                    value={JSON.stringify(mp)}
                    onChange={(e) =>
                      setMetodosSeleccion(JSON.parse(e.target.value))
                    }
                  />
                  {mp.nombre}
                </label>
              ))}
            </div>
          </div>

          <span className={styles.footerLayout}>
            <button className={styles.confirmBtn} onClick={handleConfirm}>
              Confirmar Pedido
            </button>
            <button
              className={styles.backBtn}
              onClick={() => navigate("/shop")}
            >
              Volver
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export default Order;
