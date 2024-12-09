import React from 'react'
import "./Header.css";

export default function Header() {
  return (
    <header className="header">

        <div className="header__logo">
            <img
                src="../../../img/logo_pequeno.svg" 
                alt="Logo"
                className="header__logoImage"
            />
        </div>

        <form className="header__busqueda">
            <input
                type="text"
                className="header__busqueda-input"
                placeholder="Buscar productos..."
            />
            <button className="header__busqueda-boton">
                🔍
            </button>
        </form>

        <nav>
            <button 
                className="header__boton" 
                aria-label="Abrir el modal de Pedido"
            >
                Pedido
            </button>
        </nav>

    </header>
  )
}
