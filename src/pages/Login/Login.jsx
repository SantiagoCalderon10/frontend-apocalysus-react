import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logoApocalyisus.png";
import { LoaderAP } from "../../components/common/Loader/LoaderAP";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from 'react-icons/fa';



function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      if (result.data.roles.includes('ROLE_ADMINISTRADOR')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
    }

    setLoading(false);
  }; // <-- ESTA LLAVE FALTABA 🚨🚨🚨

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}> 
          <img src={logo} width="50px" height="50px" alt="" />  
          Iniciar Sesión
        </h2>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Ingresa tu correo" value={formData.email}
              onChange={handleChange}
              required/>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Ingresa tu contraseña" 
            />
          </div>

          <button className={styles.button} type="submit">
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          
        </form>

        <p className={styles.switch}>
          ¿No tienes cuenta? 
          <a onClick={() => navigate("/register")}> Registrarse</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
