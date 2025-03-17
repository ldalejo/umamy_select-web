import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import useAuth from '../../hooks/useAuth';

import './AdminHeader.css';

export default function AdminHeader() {

  const [menuUserVisible, setMenuUserVisible] = useState(false);

  const { user, logout } = useAuth({middleware: 'auth'});

  /* Manejador del menu usuario */
  const handlerMenuUser = () => {
    setMenuUserVisible(!menuUserVisible);
  }

  return (
    <header className="admin-header">
      <div className="admin-header__contenido">

        {/* Logo */}
        <div className="admin-header__logo">
          <img
            src="/img/logo_pequeno.svg"
            alt="Logo"
            className="admin-header__logo-imagen"
          />
        </div>

        {/* Usuario y cesta */}
        <div className="admin-header__usuario-cesta">
          <button 
            className="header__usuario" 
            aria-label="Usuario"
            onClick={handlerMenuUser}
          >
            <MdAccountCircle size={40} />
          </button>

          {/* Menú desplegable de usuario */}
          {menuUserVisible && (
            <nav className="header__user-menu">
              <ul>
                <li className="header__user-nombre">{user?.name}</li>
                <li>
                  <Link to="/admin">Pedidos</Link>
                </li>
                <li>
                  <Link to="/admin/productos">Productos</Link>
                </li>
                <li>
                  <button onClick={logout}>Cerrar Sesión</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
