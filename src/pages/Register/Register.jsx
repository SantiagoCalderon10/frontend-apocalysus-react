import { Navigate } from "react-router-dom";
import styles from "../Login/Login.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Crear Cuenta</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre</label>
            <input type="text" placeholder="Tu nombre" />
          </div>

          <div className={styles.inputGroup}>
            <label>Apellido</label>
            <input type="text" placeholder="Tu apellido" />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Tu correo" />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input type="password" placeholder="Crea una contraseña" />
          </div>

          <button className={styles.button} type="submit">Registrarse</button>
        </form>

        <p className={styles.switch}>
          ¿Ya tienes cuenta? <a href="/login"> Iniciar Sesión</a>
        </p>
      </div>
    </div>
  );
}
