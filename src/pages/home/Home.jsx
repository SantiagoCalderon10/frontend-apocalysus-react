import React from 'react'
import styles from './Home.module.css'
import productService from '../../api/productService';

export const Home = () => {

  

  return (
    <>
    
    <head>
      <title>Apocalysus Club Deportivo</title>
    </head>
    <main className={styles.main}>

  {/* ================= HERO ================= */}
  <section className={styles.hero}>
    <div
      className={styles.heroSlide}
      style={{ backgroundImage: "url('GrupoApocalysus.png')" }}
    ></div>
   

    <div className={styles.overlay}></div>

    <div className={styles.heroContent}>
      <h1>BIENVENIDO A APOCALYSUS</h1>
      <p>Tu club y tienda deportiva para alcanzar el máximo nivel</p>
      <a href="/shop" className={styles.explorarBtn}>
        Explorar tienda
      </a>
    </div>
  </section>

  {/* ================= FEATURES ================= */}
  <section className={styles.sectionCrossfit}>
    <section className={styles.features}>
      <div className={styles.containerCenter}>
        <div className={styles.featuresRow}>

          <div className={styles.featuresItem}>
            <i className="bi bi-basket"></i>
            <h3>Tienda Deportiva</h3>
            <p>Encuentra implementos de alta calidad para tus entrenamientos.</p>
          </div>

          <div className={styles.featuresItem}>
            <i className="bi bi-people"></i>
            <h3>Club Exclusivo</h3>
            <p>Accede a programas de entrenamiento y comunidad.</p>
          </div>

          <div className={styles.featuresItem}>
            <i className="bi bi-shield-check"></i>
            <h3>Seguridad</h3>
            <p>Compra con confianza con nuestros métodos de pago seguros.</p>
          </div>

        </div>
      </div>
    </section>
  </section>

  {/* ================= PRODUCTOS ================= */}
  <section id="productos" className={styles.productosSection}>
    <div className={styles.containerProductos}>
      <h2 className={styles.storeTitle}>Nuestros Productos</h2>

      <div className={styles.productGrid}>

        {/* Producto 1 */}
         {/* Producto 3 */}
        <div className={styles.productCard}>
          <img
            src="/IMG/product-placeholder.jpg"
            className={styles.productImg}
            alt="Producto 3"
          />
          <div className={styles.cardBody}>
            <h5>Producto 3</h5>
            <p>$85.000</p>
            <a href="#" className={styles.buyBtn}>Comprar</a>
          </div>
        </div>
        {/* Producto 2 */}
     {/* Producto 3 */}
        <div className={styles.productCard}>
          <img
            src="/IMG/product-placeholder.jpg"
            className={styles.productImg}
            alt="Producto 3"
          />
          <div className={styles.cardBody}>
            <h5>Producto 3</h5>
            <p>$85.000</p>
            <a href="#" className={styles.buyBtn}>Comprar</a>
          </div>
        </div>
        {/* Producto 3 */}
        <div className={styles.productCard}>
          <img
            src="/IMG/product-placeholder.jpg"
            className={styles.productImg}
            alt="Producto 3"
          />
          <div className={styles.cardBody}>
            <h5>Producto 3</h5>
            <p>$85.000</p>
            <a href="#" className={styles.buyBtn}>Comprar</a>
          </div>
        </div>

      </div>
    </div>
  </section>
</main>
</>
  );
}
export default Home;