import React, { useEffect, useState } from "react";
import userService from "../../../api/services/userService";
import styles from "./AdminUsuario.module.css";
import Swal from "sweetalert2";

const AdminUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    administradores: 0,
    clientes: 0,
  });

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response);

      // Calcular estadísticas
      const admins = response.filter((u) => u.rolNombre === "ADMINISTRADOR").length;
      const clients = response.filter((u) => u.rolNombre === "CLIENTE").length;

      setStats({
        totalUsuarios: response.length,
        administradores: admins,
        clientes: clients,
      });
    } catch (error) {
      Swal.fire({
        title: "❌ Error cargando usuarios",
        text: error.message,
        icon: "error",
        background: "#0a0a0a",
        color: "white",
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleUserDetails = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleBadgeClass = (role) => {
    return role === "ADMINISTRADOR" ? styles.adminBadge : styles.clientBadge;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Administrar Usuarios</h1>

      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Usuarios</span>
          <span className={styles.statValue}>{stats.totalUsuarios}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Administradores</span>
          <span className={styles.statValue}>{stats.administradores}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Clientes</span>
          <span className={styles.statValue}>{stats.clientes}</span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Pedidos</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.idUsuario}>
              <tr className={styles.userRow}>
                <td className={styles.userId}>#{user.idUsuario}</td>
                <td className={styles.userName}>
                  {user.nombre} {user.apellido}
                </td>
                <td>{user.correo}</td>
                <td>{user.telefono}</td>
                <td>
                  <span className={getRoleBadgeClass(user.rolNombre)}>
                    {user.rolNombre}
                  </span>
                </td>
                <td className={styles.ordersCount}>
                  {user.pedidosIds.length}
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.detailsButton}
                    onClick={() => toggleUserDetails(user.idUsuario)}
                  >
                    {expandedUserId === user.idUsuario
                      ? "Ocultar"
                      : "Ver Detalle"}
                  </button>
                </td>
              </tr>

              {expandedUserId === user.idUsuario && (
                <tr className={styles.expandedRow}>
                  <td colSpan="7">
                    <div className={styles.userDetails}>
                      <div className={styles.detailsHeader}>
                        <h3>
                          Información de {user.nombre} {user.apellido}
                        </h3>
                        <p className={styles.registrationDate}>
                          <strong>Fecha de registro:</strong>{" "}
                          {formatDate(user.fechaRegistro)}
                        </p>
                      </div>

                      <div className={styles.detailsGrid}>
                        {/* Información de Contacto */}
                        <div className={styles.detailSection}>
                          <h4>📧 Contacto</h4>
                          <div className={styles.infoItem}>
                            <span className={styles.label}>Email:</span>
                            <span className={styles.value}>{user.correo}</span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.label}>Teléfono:</span>
                            <span className={styles.value}>
                              {user.telefono}
                            </span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.label}>Rol:</span>
                            <span
                              className={`${styles.value} ${getRoleBadgeClass(
                                user.rolNombre
                              )}`}
                            >
                              {user.rolNombre}
                            </span>
                          </div>
                        </div>

                        {/* Direcciones */}
                        <div className={styles.detailSection}>
                          <h4>📍 Direcciones</h4>
                          {user.direcciones.length > 0 ? (
                            user.direcciones.map((address, index) => (
                              <div key={index} className={styles.addressCard}>
                                <p>
                                  <strong>Dirección {index + 1}:</strong>
                                </p>
                                <p>{address.calle}</p>
                                <p>
                                  {address.ciudad}, {address.departamento}
                                </p>
                                <p>{address.pais}</p>
                              </div>
                            ))
                          ) : (
                            <p className={styles.noData}>
                              Sin direcciones registradas
                            </p>
                          )}
                        </div>

                        {/* Estadísticas */}
                        <div className={styles.detailSection}>
                          <h4>📊 Estadísticas</h4>
                          <div className={styles.infoItem}>
                            <span className={styles.label}>
                              Total de pedidos:
                            </span>
                            <span className={styles.value}>
                              {user.pedidosIds.length}
                            </span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.label}>ID Carrito:</span>
                            <span className={styles.value}>
                              {user.idCarrito || "N/A"}
                            </span>
                          </div>
                          <div className={styles.infoItem}>
                            <span className={styles.label}>
                              Direcciones registradas:
                            </span>
                            <span className={styles.value}>
                              {user.direcciones.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lista de IDs de Pedidos */}
                      {user.pedidosIds.length > 0 && (
                        <div className={styles.ordersSection}>
                          <h4>🛍️ IDs de Pedidos</h4>
                          <div className={styles.ordersList}>
                            {user.pedidosIds.map((orderId) => (
                              <span key={orderId} className={styles.orderBadge}>
                                #{orderId}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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

export default AdminUsuarios;