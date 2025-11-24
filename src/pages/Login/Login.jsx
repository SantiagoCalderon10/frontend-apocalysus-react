import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Ingresa tu correo" />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" />
          </div>

          <button className={styles.button} type="submit">Entrar</button>
        </form>

        <p className={styles.switch}>
          ¿No tienes cuenta? <a href="/register">Registrarse</a>
        </p>
      </div>
    </div>
  );
}
export default Login;