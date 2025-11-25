import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Order.module.css";
import orderService from "../../api/services/orderService";
import userService from "../../api/services/userService";
import { useAuth } from "../../context/AuthContext";
import authService from "../../api/services/authService";

function Order() {
  const { cart, loading, clearCart } = useCart();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const [direcciones, setDirecciones] = useState([]);
  const [direccion, setDireccion] = useState(null);
  const [metodos, setMetodos] = useState([]);
  const [metodoSeleccion, setMetodosSeleccion] = useState(null);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(true);

  // 🔥 PRIMERO: Verificar autenticación
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('❌ No hay token, redirigiendo a login');
        Swal.fire({
          icon: "error",
          title: "Sesión expirada",
          text: "Por favor, inicia sesión",
          background: "#0a0a0a",
          color: "white",
        });
        navigate('/login');
        return;
      }

      console.log('✅ Token presente, verificando validez...');
      setIsVerifyingAuth(false);
    };
    
    verifyAuth();
  }, [navigate]);

  // Cargar direcciones del usuario
  useEffect(() => {
    const loadAddresses = async () => {
      if (isVerifyingAuth || !authUser) return;
      
      try {
        const response = await userService.getAddresses();
        setDirecciones(response.data || []);
      } catch (error) {
        console.error("Error cargando direcciones", error);
        
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Sesión expirada",
            text: "Por favor, inicia sesión nuevamente",
            background: "#0a0a0a",
            color: "white",
          });
          authService.logout();
        }
      }
    };
    loadAddresses();
  }, [authUser, isVerifyingAuth]);

  // Cargar métodos de pago
  useEffect(() => {
    const loadPayMethods = async () => {
      if (isVerifyingAuth) return;
      
      try {
        const data = await orderService.getPayMethods();
        setMetodos(data);
      } catch (error) {
        console.error("Error cargando métodos de pago:", error);
      }
    };
    loadPayMethods();
  }, [isVerifyingAuth]);

  // Evitar acceso sin productos
  useEffect(() => {
    if (!loading && cart.productos.length === 0 && !pedidoFinalizado) {
      navigate("/shop");
    }
  }, [loading, cart, pedidoFinalizado, navigate]);

  const handleConfirm = async () => {
    // 🔥 VALIDACIÓN CRÍTICA DEL TOKEN ANTES DE ENVIAR
    const token = localStorage.getItem('token');
    
    console.log('🔍 Verificando token antes de crear pedido...');
    console.log('Token presente:', !!token);
    console.log('Token preview:', token ? token.substring(0, 30) + '...' : 'NO HAY TOKEN');
    
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Sesión expirada",
        text: "Por favor, inicia sesión nuevamente",
        background: "#0a0a0a",
        color: "white",
      });
      navigate('/login');
      return;
    }

    if (!authUser) {
      Swal.fire({
        icon: "error",
        title: "Usuario no autenticado",
        background: "#0a0a0a",
        color: "white",
      });
      return;
    }

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

    const orderData = {
      idUsuario : 0,
      idDireccion: direccion.id,
      idMetodoPago: metodoSeleccion.idMetodoPago,
    };

    Swal.fire({
      title: "¿Confirmar pedido?",
      html: `
        <p style="color:#ccc">Método de pago: <strong>${metodoSeleccion.nombre}</strong></p>
        <p style="color:#ccc">Dirección: <strong>${direccion.calle}, ${direccion.ciudad}, ${direccion.departamento}, ${direccion.pais}</strong></p>
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
        try {
          // 🔥 VERIFICAR TOKEN JUSTO ANTES DE LA LLAMADA
          const tokenBeforeCall = localStorage.getItem('token');
          console.log('🚀 Enviando pedido...');
          console.log('Token justo antes de la llamada:', !!tokenBeforeCall);
          
          const response = await orderService.createOrder(orderData);

          Swal.fire({
            title: "Pedido confirmado",
            text: "Tu pedido ha sido registrado exitosamente.",
            icon: "success",
            background: "#0a0a0a",
            color: "white",
          });

          await clearCart();
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
          console.error('❌ Error al crear pedido:', error);
          
          let errorMessage = "No se pudo completar el pedido";
          
          if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            
            if (error.response.status === 401) {
              errorMessage = "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
              setTimeout(() => {
                authService.logout();
              }, 2000);
            } else if (error.response.status === 403) {
              errorMessage = "No tienes permisos para realizar esta acción";
            } else if (error.response.data?.message) {
              errorMessage = error.response.data.message;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            background: "#0a0a0a",
            color: "white",
          });
        }
      }
    });
  };

  if (isVerifyingAuth || loading) {
    return (
      <div className={styles.container}>
        <p style={{ color: "#ccc", textAlign: "center" }}>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      {!pedidoFinalizado && (
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
                      alt={item.nombre}
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
                <label key={mp.idMetodoPago} className={styles.method}>
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