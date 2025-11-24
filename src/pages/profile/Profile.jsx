import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import orderService from "../../api/services/orderService";
import userService from "../../api/services/userService";
import Swal from "sweetalert2";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    calle: "",
    ciudad: "",
    departamento: "",
    pais: "Colombia",
  });

  // Simulación de usuario (reemplazar con datos reales del contexto/auth)
  useEffect(() => {
    loadUserData();
    loadUserOrders();
  }, []);

  const loadUserData = async () => {
    try {
      // Aquí deberías obtener el usuario actual del contexto o localStorage
      // const userData = await userService.getCurrentUser();
      
      // Simulación de datos (reemplazar con llamada real)
      const mockUser = {
        idUsuario: 3,
        nombre: "Alba Luz",
        apellido: "Almario",
        correo: "alba@gmail.com",
        telefono: "3229360394",
        fechaRegistro: "2025-11-16T15:45:57.030814",
        rolNombre: "ADMINISTRADOR",
        direcciones: [
          {
            id: 3,
            calle: "Carrera 1b #3-24",
            ciudad: "Garzón",
            departamento: "Huila",
            pais: "Colombia",
          },
        ],
      };
      setUser(mockUser);
    } catch (error) {
      console.error("Error cargando usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserOrders = async () => {
    try {
      // Obtener pedidos del usuario actual
      const data = await orderService.getUserOrders();
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

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
    // Limpiar formulario al cerrar
    if (showAddressForm) {
      setAddressData({
        calle: "",
        ciudad: "",
        departamento: "",
        pais: "Colombia",
      });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí conectarás con el backend
      // await userService.addAddress(addressData, user.idUsuario);
      
      console.log("Datos de dirección a enviar:", addressData);
      console.log("ID Usuario:", user.idUsuario);

      Swal.fire({
        title: "✅ Dirección guardada",
        text: "La dirección se ha agregado correctamente",
        icon: "success",
        background: "#0a0a0a",
        color: "white",
        confirmButtonColor: "#ff6600",
      });

      // Recargar datos del usuario
      await loadUserData();
      
      // Cerrar formulario y limpiar
      toggleAddressForm();
    } catch (error) {
      Swal.fire({
        title: "❌ Error",
        text: "No se pudo guardar la dirección",
        icon: "error",
        background: "#0a0a0a",
        color: "white",
      });
    }
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
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return <div className={styles.error}>No se pudo cargar el perfil</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header del Perfil */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {user.nombre.charAt(0)}
            {user.apellido.charAt(0)}
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>
              {user.nombre} {user.apellido}
            </h1>
            <span className={styles.roleBadge}>{user.rolNombre}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Información Personal */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>📋 Información Personal</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{user.correo}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Teléfono</span>
              <span className={styles.infoValue}>{user.telefono}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Miembro desde</span>
              <span className={styles.infoValue}>
                {formatDate(user.fechaRegistro)}
              </span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>ID Usuario</span>
              <span className={styles.infoValue}>#{user.idUsuario}</span>
            </div>
          </div>
        </div>

        {/* Direcciones */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>📍 Direcciones de Envío</h2>
            <button
              className={styles.addButton}
              onClick={toggleAddressForm}
            >
              {showAddressForm ? "Cancelar" : "+ Agregar Dirección"}
            </button>
          </div>

          {/* Formulario de Nueva Dirección */}
          {showAddressForm && (
            <div className={styles.addressForm}>
              <h3 className={styles.formTitle}>Nueva Dirección</h3>
              <form onSubmit={handleAddressSubmit}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Calle/Dirección</label>
                    <input
                      type="text"
                      name="calle"
                      placeholder="Ej: Carrera 1b #3-24"
                      value={addressData.calle}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      placeholder="Ej: Bogotá"
                      value={addressData.ciudad}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Departamento</label>
                    <input
                      type="text"
                      name="departamento"
                      placeholder="Ej: Cundinamarca"
                      value={addressData.departamento}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>País</label>
                    <input
                      type="text"
                      name="pais"
                      placeholder="Colombia"
                      value={addressData.pais}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Guardar Dirección
                </button>
              </form>
            </div>
          )}

          {/* Lista de Direcciones */}
          {user.direcciones.length > 0 ? (
            <div className={styles.addressesGrid}>
              {user.direcciones.map((address, index) => (
                <div key={index} className={styles.addressCard}>
                  <div className={styles.addressHeader}>
                    <span className={styles.addressNumber}>
                      Dirección {index + 1}
                    </span>
                  </div>
                  <p className={styles.addressLine}>{address.calle}</p>
                  <p className={styles.addressLine}>
                    {address.ciudad}, {address.departamento}
                  </p>
                  <p className={styles.addressLine}>{address.pais}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noData}>No hay direcciones registradas</p>
          )}
        </div>

        {/* Historial de Pedidos */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>🛍️ Historial de Pedidos</h2>
          {orders.length > 0 ? (
            <div className={styles.ordersContainer}>
              {orders.map((order) => (
                <div key={order.idPedido} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderMainInfo}>
                      <h3 className={styles.orderCode}>
                        {order.codigoPedido}
                      </h3>
                      <span className={styles.orderDate}>
                        {formatDate(order.fecha)}
                      </span>
                    </div>
                    <div className={styles.orderSummary}>
                      <span className={styles.orderTotal}>
                        {formatCurrency(order.precioTotal)}
                      </span>
                      <span className={styles.paymentMethod}>
                        {order.metodoPago}
                      </span>
                    </div>
                  </div>

                  <div className={styles.orderInfo}>
                    <span className={styles.orderItems}>
                      {order.items.length} producto(s)
                    </span>
                    <button
                      className={styles.detailsButton}
                      onClick={() => toggleOrderDetails(order.idPedido)}
                    >
                      {expandedOrderId === order.idPedido
                        ? "Ocultar detalles"
                        : "Ver detalles"}
                    </button>
                  </div>

                  {expandedOrderId === order.idPedido && (
                    <div className={styles.orderDetails}>
                      <div className={styles.shippingInfo}>
                        <strong>Dirección de envío:</strong> {order.direccion}
                      </div>
                      <div className={styles.itemsList}>
                        {order.items.map((item, index) => (
                          <div key={index} className={styles.orderItem}>
                            <img
                              src={item.imagenUrl}
                              alt={item.nombreProducto}
                              className={styles.itemImage}
                            />
                            <div className={styles.itemInfo}>
                              <h4>{item.nombreProducto}</h4>
                              <p>Cantidad: {item.cantidad}</p>
                              <p>
                                Precio: {formatCurrency(item.precioUnitario)}
                              </p>
                            </div>
                            <div className={styles.itemSubtotal}>
                              {formatCurrency(item.subtotal)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noData}>No has realizado pedidos aún</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;