import styles from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logoApocalyisus.png";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.contrasena !== formData.confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const result = await register({
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      contrasena: formData.contrasena,
    });

    if (result.success) {
      alert("Registro exitoso. Ahora puedes iniciar sesión");
      navigate("/login");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          <img src={logo} width="50px" height="50px" alt="" /> Registrarse
        </h2>

        {error && <div className={styles.error}>{error}</div>}

        {/* 🔥 EL CAMBIO AQUÍ 🔥 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required />
          </div>

          <div className={styles.inputGroup}>
            <label>Apellido</label>
            <input type="text" id="apellido" name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" id="email" name="email"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>

          <div className={styles.inputGroup}>
            <label>Telefono</label>
            <input type="tel" id="telefono" name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input type="password" id="contrasena" name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required minLength={6} />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirma contraseña</label>
            <input type="password" id="confirmarContrasena" name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              required />
          </div>

          <button className={styles.button} disabled={loading} type="submit">
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className={styles.switch}>
          ¿Ya tienes cuenta?  
          <a onClick={() => navigate("/login")}> Iniciar Sesión</a>
        </p>
      </div>
    </div>
  );
}
