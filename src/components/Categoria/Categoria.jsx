import React from 'react'

import './categoria.css'

export default function Categoria({categoria}) {
    // Aplicamos destructuring
    const {icono, nombre, id} = categoria;
    
    return (
        <li className='menu__item'>
            {/* <img
                className='aside__categoria-img'
                src={icono} 
                alt='Icono categoría'
            /> */}
            <p className='aside__categoria-p'>{nombre}</p>
        </li>
    )
}
