import React from 'react'
import useUmamy from '../../hooks/useUmamy';

import './categoria.css'

export default function Categoria({categoria}) {

    const {handleClickCategoria, categoriaActual} = useUmamy();

    // Aplicamos destructuring
    const {icono, nombre, id} = categoria;

    const resaltarCategoriaSeleccionada = () => categoriaActual.id === id ? 'aside__categoria-seleccionada' : 'aside__categoria'
    
    return (
        <li className='menu__item'>
            {/* <img
                className='aside__categoria-img'
                src={icono} 
                alt='Icono categoría'
            /> */}
            <button 
                className={`${resaltarCategoriaSeleccionada()}`}
                type='button'
                onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
        </li>
    )
}
