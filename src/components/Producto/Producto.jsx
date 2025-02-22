import React, {useState} from 'react'
import { formatearDinero } from '../../helpers';

import './Producto.css'

export default function Producto({producto}) {
    // Aplicamos destructuring
    const {id, imagen, nombre, precio} = producto;

    return (
        <article className='producto'>
            <img 
                src={imagen} 
                alt={`imagen ${nombre}`}
                className='imagen'
            />
            <section className='producto__contenido'>
                <p className='contenido__nombre'>{nombre}</p>
                <p className='contenido__precio'>{formatearDinero(precio)}</p>
                <button
                    type='button'
                    className='producto__boton'>
                    PEDIR
                </button>
            </section>
        </article>
    )
}