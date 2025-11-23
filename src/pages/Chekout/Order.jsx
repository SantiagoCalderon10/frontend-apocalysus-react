import React, { useState } from 'react';

// Order.jsx
export default function Order() {
  // Datos simulados del carrito (después los traerás de tu estado global o API)
  const [cartItems] = useState([
    {
      id: 1,
      nombre: 'Botella Deportiva Premium',
      precio: 25.99,
      cantidad: 2,
      imagen: '🍾',
      talla: 'N/A',
      color: 'Azul'
    },
    {
      id: 2,
      nombre: 'Bolso Deportivo Adidas',
      precio: 89.99,
      cantidad: 1,
      imagen: '💼',
      talla: 'Única',
      color: 'Negro'
    },
    {
      id: 3,
      nombre: 'Gorra Apocalysus Original',
      precio: 19.99,
      cantidad: 3,
      imagen: '🧢',
      talla: 'Ajustable',
      color: 'Negro'
    }
  ]);

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: ''
  });

  const [metodoPago, setMetodoPago] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [procesando, setProcesando] = useState(false);

  // Cálculos del pedido
  const subtotal = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const envio = 10.00;
  const impuestos = subtotal * 0.19; // 19% IVA
  const total = subtotal + envio + impuestos;

  const handleInputChange = (e) => {
    setDatosEnvio({
      ...datosEnvio,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmarPedido = () => {
    if (!metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    if (!aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Validar campos requeridos
    const camposRequeridos = ['nombre', 'email', 'telefono', 'direccion', 'ciudad'];
    const camposVacios = camposRequeridos.filter(campo => !datosEnvio[campo]);

    if (camposVacios.length > 0) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setProcesando(true);

    // Simular procesamiento
    setTimeout(() => {
      alert('¡Pedido confirmado exitosamente!');
      setProcesando(false);
      // Aquí redirigirias a la página de éxito o procesarías el pago
    }, 2000);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    // Esta función la implementarías con tu gestión de estado
    console.log(`Actualizar item ${id} a cantidad ${nuevaCantidad}`);
  };

  const eliminarItem = (id) => {
    // Esta función la implementarías con tu gestión de estado
   
  };

  return (
    <>
      <link rel="stylesheet" href="Order.module.css" />
      
      <div className="order-container">
        
        {/* Header */}
        <div className="order-header">
          <div className="header-content">
            <div className="logo-header">
              <div className="logo-circle-small">🦂</div>
              <h1 className="order-main-title">APOCALYSUS</h1>
            </div>
            <div className="breadcrumb">
              <span className="breadcrumb-item">Carrito</span>
              <span className="breadcrumb-separator">→</span>
              <span className="breadcrumb-item active">Confirmación</span>
              <span className="breadcrumb-separator">→</span>
              <span className="breadcrumb-item">Pago</span>
            </div>
          </div>
        </div>

        <div className="order-content">
          
          {/* Columna Izquierda - Formulario */}
          <div className="order-form-section">
            
            {/* Información de Envío */}
            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">📍</div>
                <h2 className="card-title">Información de Envío</h2>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={datosEnvio.nombre}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={datosEnvio.email}
                    onChange={handleInputChange}
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={datosEnvio.telefono}
                    onChange={handleInputChange}
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="direccion">Dirección Completa *</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={datosEnvio.direccion}
                    onChange={handleInputChange}
                    placeholder="Calle 123 #45-67, Apto 101"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ciudad">Ciudad *</label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={datosEnvio.ciudad}
                    onChange={handleInputChange}
                    placeholder="Neiva"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="codigoPostal">Código Postal</label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={datosEnvio.codigoPostal}
                    onChange={handleInputChange}
                    placeholder="410001"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notas">Notas del Pedido (Opcional)</label>
                  <textarea
                    id="notas"
                    name="notas"
                    value={datosEnvio.notas}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales para la entrega..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">💳</div>
                <h2 className="card-title">Método de Pago</h2>
              </div>

              <div className="payment-methods">
                <label className={`payment-option ${metodoPago === 'tarjeta' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={metodoPago === 'tarjeta'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <div className="payment-content">
                    <div className="payment-icon">💳</div>
                    <div className="payment-info">
                      <span className="payment-name">Tarjeta de Crédito/Débito</span>
                      <span className="payment-description">Visa, Mastercard, American Express</span>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${metodoPago === 'pse' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="pse"
                    checked={metodoPago === 'pse'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <div className="payment-content">
                    <div className="payment-icon">🏦</div>
                    <div className="payment-info">
                      <span className="payment-name">PSE</span>
                      <span className="payment-description">Pago Seguro en Línea</span>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${metodoPago === 'efectivo' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="efectivo"
                    checked={metodoPago === 'efectivo'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <div className="payment-content">
                    <div className="payment-icon">💵</div>
                    <div className="payment-info">
                      <span className="payment-name">Pago Contraentrega</span>
                      <span className="payment-description">Paga cuando recibas tu pedido</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Columna Derecha - Resumen del Carrito */}
          <div className="order-summary-section">
            
            {/* Productos en el Carrito */}
            <div className="summary-card">
              <div className="card-header">
                <h2 className="card-title">Tu Carrito ({cartItems.length} productos)</h2>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      {item.imagen}
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.nombre}</h3>
                      <div className="item-specs">
                        <span className="spec">Talla: {item.talla}</span>
                        <span className="spec-separator">•</span>
                        <span className="spec">Color: {item.color}</span>
                      </div>
                      <div className="item-price">${item.precio.toFixed(2)}</div>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.cantidad}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="delete-btn"
                        onClick={() => eliminarItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen de Costos */}
            <div className="summary-card totals-card">
              <div className="card-header">
                <h2 className="card-title">Resumen del Pedido</h2>
              </div>

              <div className="totals-section">
                <div className="total-row">
                  <span className="total-label">Subtotal</span>
                  <span className="total-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span className="total-label">Envío</span>
                  <span className="total-value">${envio.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span className="total-label">Impuestos (19%)</span>
                  <span className="total-value">${impuestos.toFixed(2)}</span>
                </div>
                <div className="total-divider"></div>
                <div className="total-row total-final">
                  <span className="total-label">Total</span>
                  <span className="total-value">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="terms-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                  />
                  <span className="checkbox-text">
                    Acepto los <a href="#" className="link-terms">términos y condiciones</a> y la <a href="#" className="link-terms">política de privacidad</a>
                  </span>
                </label>
              </div>

              {/* Botón de Confirmar */}
              <button 
                className="confirm-button"
                onClick={handleConfirmarPedido}
                disabled={procesando}
              >
                {procesando ? (
                  <>
                    <span className="spinner"></span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🔒</span>
                    Confirmar Pedido
                  </>
                )}
              </button>

              {/* Garantías */}
              <div className="guarantees">
                <div className="guarantee-item">
                  <span className="guarantee-icon">✓</span>
                  <span className="guarantee-text">Pago 100% Seguro</span>
                </div>
                <div className="guarantee-item">
                  <span className="guarantee-icon">✓</span>
                  <span className="guarantee-text">Envío Rápido</span>
                </div>
                <div className="guarantee-item">
                  <span className="guarantee-icon">✓</span>
                  <span className="guarantee-text">Garantía de Calidad</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @import url('Order.module.css');
      `}</style>
    </>
  );
}