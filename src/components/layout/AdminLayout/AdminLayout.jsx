import { Outlet, NavLink } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import { FaBox, FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import React from "react";
import { BsClipboardMinusFill } from "react-icons/bs";

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <img
          src={require("../../../logoApocalyisus.png")}
          width="100rem"
          height="100rem"
          alt="logoApocalysus"
        />
        <h2 className={styles.title}>Panel Admin</h2>

        <nav>
          <ul className={styles.menu}>
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <BsClipboardMinusFill />
                Principal
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productos"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <FaBox /> Productos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/pedidos"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <FaShoppingCart /> Pedidos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/usuarios"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <FaUser /> Usuarios
              </NavLink>
            </li>
          </ul>

          <li className="nav-item">
            <a className={`btn ms-2 ${styles.btnIngreso}`} href="/shop">
              Regresar
            </a>
          </li>
        </nav>
      </aside>

      {/* Contenido del admin */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
