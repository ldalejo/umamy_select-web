import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { MdSearch, MdShoppingCart, MdAccountCircle } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

import './Header.css';

export default function Header() {

    const [menuUserVisible, setMenuUserVisible] = useState(false);

    const { user, logout } = useAuth({middleware: 'auth'});

    /* Manejador del menu usuario */
    const handlerMenuUser = () => {
        setMenuUserVisible(!menuUserVisible);
    }

  return (
    <header className='header'>

        <div className='header__contenido'>
            {/* Logo */}
            <Link 
                className='header__logo'
                to='/'  
            >
                <img
                    src='/img/logo_pequeno.svg' 
                    alt='Logo'
                    className='header__logo-imagen'
                />
            </Link>

            {/* Barra de búsqueda */}
            {/* <form className='header__busqueda'>
                <div className='header__busqueda-contenedor'>
                    <input
                        type='text'
                        className='header__busqueda-input'
                        placeholder='Buscar productos...'
                        aria-label='Buscar productos'
                    />
                    <button 
                        className='header__busqueda-boton' 
                        aria-label='Buscar'
                    >
                        <MdSearch size={24} />
                    </button>
                </div>
            </form> */}

            {/* Usuario y cesta */}
            <div className='header__usuario-cesta'>
                <button 
                    className='header__usuario' 
                    aria-label='Usuario'
                    onClick={handlerMenuUser}
                >
                    <MdAccountCircle size={40} />
                </button>
                          
                {/* Menú desplegable de usuario */}
                {menuUserVisible && (
                    <nav className='header__user-menu'>
                    <ul>
                        <li className='header__user-nombre'>{user?.name}</li>
                        <Link
                            to={`/datos-personales/${user.id}`}
                            className='link'
                        >
                            <li>Datos Personales</li>
                        </Link>
                        <Link
                            to={`/historial-pedidos/${user.id}`} 
                            className='link'
                        >
                            <li>Historial</li>
                        </Link>
                        <li>
                            <button
                                className='header__user-menu-button'
                                onClick={logout}
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                    </nav>
                )}

                <button className='header__pedido-boton' aria-label='Abrir el modal de Pedido'>
                    <MdShoppingCart size={40} />
                </button>

            </div>
        </div>

    </header>
  )
}
