import React, { useEffect, useState } from "react";
import orderService from "../../../api/services/orderService";
import styles from "./AdminPedidos.module.css";
import Swal from "sweetalert2";

const AdminPedidos = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      Swal.fire({
        title: "❌ Error cargando pedidos",
        text: error.message,
        icon: "error",
        background: "#0a0a0a",
        color: "white",
      });
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Administrar Pedidos</h1>

      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Pedidos</span>
          <span className={styles.statValue}>{orders.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Ventas Totales</span>
          <span className={styles.statValue}>
            {formatCurrency(
              orders.reduce((sum, order) => sum + order.precioTotal, 0)
            )}
          </span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Método Pago</th>
            <th>Total</th>
            <th>Items</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.idPedido}>
              <tr className={styles.orderRow}>
                <td className={styles.orderCode}>{order.codigoPedido}</td>
                <td>{order.nombreUsuario}</td>
                <td>{formatDate(order.fecha)}</td>
                <td>
                  <span className={styles.paymentBadge}>
                    {order.metodoPago}
                  </span>
                </td>
                <td className={styles.totalPrice}>
                  {formatCurrency(order.precioTotal)}
                </td>
                <td className={styles.itemsCount}>{order.items.length}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.detailsButton}
                    onClick={() => toggleOrderDetails(order.idPedido)}
                  >
                    {expandedOrderId === order.idPedido
                      ? "Ocultar"
                      : "Ver Detalle"}
                  </button>
                </td>
              </tr>

              {expandedOrderId === order.idPedido && (
                <tr className={styles.expandedRow}>
                  <td colSpan="7">
                    <div className={styles.orderDetails}>
                      <div className={styles.detailsHeader}>
                        <h3>Detalle del Pedido #{order.codigoPedido}</h3>
                        <div className={styles.shippingInfo}>
                          <p>
                            <strong>Dirección de envío:</strong>{" "}
                            {order.direccion}
                          </p>
                        </div>
                      </div>

                      <div className={styles.itemsGrid}>
                        {order.items.map((item, index) => (
                          <div key={index} className={styles.itemCard}>
                            <img
                              src={item.imagenUrl}
                              alt={item.nombreProducto}
                              className={styles.itemImage}
                            />
                            <div className={styles.itemInfo}>
                              <h4>{item.nombreProducto}</h4>
                              <p className={styles.itemQuantity}>
                                Cantidad: <strong>{item.cantidad}</strong>
                              </p>
                              <p className={styles.itemPrice}>
                                Precio Unit:{" "}
                                {formatCurrency(item.precioUnitario)}
                              </p>
                              <p className={styles.itemSubtotal}>
                                Subtotal: {formatCurrency(item.subtotal)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPedidos;