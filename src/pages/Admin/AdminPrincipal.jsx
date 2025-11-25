import { useEffect, useState } from "react";
import styles from "./AdminPrincipal.module.css";
import adminService from "../../api/services/adminService";
import { LoaderAP } from "./../../components/common/Loader/LoaderAP";
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pedidos: 0,
    usuarios: 0,
    productos: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Error al obtener estadísticas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoaderAP text="Cargando estadisticas"></LoaderAP>;

  return (

    
    <div className={styles.container}>
      <h1 className={styles.title}>Panel de Administración</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.number}>{stats.pedidos}</h2>
          <p className={styles.label}>Pedidos realizados</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.number}>{stats.usuarios}</h2>
          <p className={styles.label}>Usuarios registrados</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.number}>{stats.productos}</h2>
          <p className={styles.label}>Productos disponibles</p>
        </div>
      </div>
    </div>
  );
}
