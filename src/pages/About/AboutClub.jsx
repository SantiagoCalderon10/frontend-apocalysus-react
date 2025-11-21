import React, { useState } from 'react';
import "./AboutClub.css";

// About.jsx
export default function AboutClub() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    // Simular envío (aquí integrarías tu API)
    setTimeout(() => {
      setEnviando(false);
      setMensajeExito(true);
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });

      setTimeout(() => {
        setMensajeExito(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <link rel="stylesheet" href="About.module.css" />
      
      <div className="about-container">
        {/* Hero Section */}
        <section className="hero-section" style={{backgroundImage: `url("../../../public/Landing/IMG/hero2Apocalysus.jpeg")`}}>
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="logo-hero">
                <div className="logo-circle-hero">
                  <span className="scorpion-icon">🦂</span>
                </div>
              </div>
              <h1 className="hero-title">BIENVENIDO A APOCALYSUS</h1>
              <p className="hero-subtitle">
                Tu club y tienda deportiva para alcanzar el máximo nivel
              </p>
            </div>
          </div>
        </section>

        {/* About Cards Section */}
        <section className="cards-section">
          <div className="cards-container">
            
            {/* Card 1: Origen del Nombre */}
            <div className="info-card">
              <div className="card-icon orange">🦂</div>
              <h2 className="card-title">El Origen de Apocalysus</h2>
              <p className="card-text">
                Nuestro nombre combina "Apocalipsis" con "Lysus" (libertad en griego), 
                representando la transformación total que experimentas al unirte a nuestra 
                comunidad. El escorpión simboliza la fuerza, resistencia y determinación 
                que caracteriza a cada miembro de nuestro club.
              </p>
            </div>

            {/* Card 2: Misión */}
            <div className="info-card">
              <div className="card-icon orange">🎯</div>
              <h2 className="card-title">Nuestra Misión</h2>
              <p className="card-text">
                Proporcionar un espacio inclusivo donde deportistas de todos los niveles 
                puedan alcanzar su máximo potencial a través del entrenamiento de calidad, 
                equipamiento profesional y una comunidad que inspira y motiva. Creemos en 
                la transformación física y mental a través del deporte.
              </p>
            </div>

            {/* Card 3: Visión */}
            <div className="info-card">
              <div className="card-icon orange">🌟</div>
              <h2 className="card-title">Nuestra Visión</h2>
              <p className="card-text">
                Ser el club deportivo líder en la región, reconocido por formar atletas 
                de alto rendimiento y por nuestra comunidad sólida. Aspiramos a expandir 
                nuestra presencia y convertirnos en referente de excelencia deportiva, 
                innovación y compromiso con el bienestar integral.
              </p>
            </div>

          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Miembros Activos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Años de Experiencia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Productos Disponibles</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </section>

        {/* Valores Section */}
        <section className="valores-section">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="valores-grid">
            
            <div className="valor-card">
              <div className="valor-icon">💪</div>
              <h3 className="valor-title">Excelencia</h3>
              <p className="valor-text">
                Buscamos la mejora continua en cada aspecto de nuestro servicio
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-icon">🤝</div>
              <h3 className="valor-title">Comunidad</h3>
              <p className="valor-text">
                Fomentamos un ambiente de apoyo mutuo y camaradería
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-icon">🎓</div>
              <h3 className="valor-title">Disciplina</h3>
              <p className="valor-text">
                Promovemos la constancia y el compromiso con los objetivos
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-icon">🔥</div>
              <h3 className="valor-title">Pasión</h3>
              <p className="valor-text">
                Vivimos el deporte con intensidad y dedicación total
              </p>
            </div>

          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="contact-section">
          <div className="contact-container">
            
            <div className="contact-info">
              <h2 className="contact-title">Contáctanos</h2>
              <p className="contact-description">
                ¿Tienes preguntas sobre nuestro club o productos? Estamos aquí para ayudarte. 
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Ubicación</h4>
                    <p>Calle Principal #123, Neiva, Huila</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Teléfono</h4>
                    <p>+57 300 123 4567</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@apocalysus.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">⏰</div>
                  <div>
                    <h4>Horario</h4>
                    <p>Lun - Vie: 6:00 AM - 10:00 PM<br/>Sáb - Dom: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <div className="contact-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <button 
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={enviando || !formData.nombre || !formData.email || !formData.mensaje}
                >
                  {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

                {mensajeExito && (
                  <div className="success-message">
                    ✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

      </div>
</>
  );
}