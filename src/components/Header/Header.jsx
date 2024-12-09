import React from 'react'
import { MdSearch } from "react-icons/md";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">

        <div className="header__logo">
            <img
                src="../../../img/logo_pequeno.svg" 
                alt="Logo"
                className="header__logo-imagen"
            />
        </div>

        <form className="header__busqueda">
            <input
                type="text"
                className="header__busqueda-input"
                placeholder="Buscar productos..."
            />
            <button className="header__busqueda-boton">
                <MdSearch size={24} />
            </button>
        </form>

        <nav className='header__pedido'>
            <button 
                className="header__pedido-boton" 
                aria-label="Abrir el modal de Pedido"
            >
                Pedido
            </button>
        </nav>

    </header>
  )
}
