import React from "react";
import styles from "./Home.module.css";
import productService from "../../api/productService";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { IoPeople } from "react-icons/io5";

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
            style={{ backgroundImage: "url()" }}
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
                  <IoStorefrontSharp size={40}/>

                  <h3>Tienda Deportiva</h3>
                  <p>
                    Encuentra implementos de alta calidad para tus
                    entrenamientos.
                  </p>
                </div>

                <div className={styles.featuresItem}>
                  <IoPeople size={40}/>

                  <h3>Club Exclusivo</h3>
                  <p>Accede a programas de entrenamiento y comunidad.</p>
                </div>

                <div className={styles.featuresItem}>
                  <MdOutlineSecurity size={40} />

                  <h3>Seguridad</h3>
                  <p>
                    Compra con confianza con nuestros métodos de pago seguros.
                  </p>
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
                  src="https://cdn.shopify.com/s/files/1/0750/5936/4118/files/CATALOGO_DE_PRODUCTOS_STARK_alta_imagenes-04_1024x1024.png?v=1724443278"
                  className={styles.productImg}
                  alt="Producto 3"
                />
                <div className={styles.cardBody}>
                  <h5>Suplementos</h5>
                  <p>
                    Alcanza tu maximo nivel con diversa suplementación de la más
                    alta calidad, solo en APOCALYSUS
                  </p>
                  <a href="/shop" className={styles.buyBtn}>
                    Ver más
                  </a>
                </div>
              </div>
              {/* Producto 2 */}
              {/* Producto 3 */}
              <div className={styles.productCard}>
                <img
                  src="data:image/jpeg;base64,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"
                  className={styles.productImg}
                  alt="Producto 3"
                />
                <div className={styles.cardBody}>
                  <h5>Equipamento</h5>
                  <p>Amplia gama de equipamentos para Crossfit</p>
                  <a href="/shop" className={styles.buyBtn}>
                    Ver más
                  </a>
                </div>
              </div>
              {/* Producto 3 */}
              <div className={styles.productCard}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLG4QbNS7t5dkyj3Py38lMyLQwCng1Hy9a8A&s"
                  className={styles.productImg}
                  alt="Producto 3"
                />
                <div className={styles.cardBody}>
                  <h5>Ropa Deportiva</h5>
                  <p>
                    Tenemos un amplio catalogo de ropa y accesorios deportivos
                    para tu comodidad <br />
                    Consiguelo en APOCALYSUS
                  </p>
                  <a href="/shop" className={styles.buyBtn}>
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Home;
