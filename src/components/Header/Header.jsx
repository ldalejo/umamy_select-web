import React, {useState} from 'react'
import { MdSearch, MdShoppingCart, MdAccountCircle } from "react-icons/md";
import "./Header.css";

export default function Header() {
    const [menuUserVisible, setMenuUserVisible] = useState(false);

    /* Manejador del menu usuario */
    const handlerMenuUser = () => {
        setMenuUserVisible(!menuUserVisible);
    }

  return (
    <header className="header">

        <div className="header__contenido">
            {/* Logo */}
            <div className="header__logo">
                <img
                    src="/img/logo_pequeno.svg" 
                    alt="Logo"
                    className="header__logo-imagen"
                />
            </div>

            {/* Barra de búsqueda */}
            <form className="header__busqueda">
                <div className="header__busqueda-contenedor">
                    <input
                        type="text"
                        className="header__busqueda-input"
                        placeholder="Buscar productos..."
                        aria-label="Buscar productos"
                    />
                    <button 
                        className="header__busqueda-boton" 
                        aria-label="Buscar"
                    >
                        <MdSearch size={24} />
                    </button>
                </div>
            </form>

            {/* Usuario y cesta */}
            <div className="header__usuario-cesta">
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
                        <li>Nombre de Usuario</li>
                        <li>Datos Personales</li>
                        <li>Historial</li>
                        <li><button>Cerrar Sesión</button></li>
                    </ul>
                    </nav>
                )}

                <button className="header__pedido-boton" aria-label="Abrir el modal de Pedido">
                    <MdShoppingCart size={40} />
                </button>

            </div>
        </div>

    </header>
  )
}
