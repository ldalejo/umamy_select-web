import React, {useState} from 'react'
import { formatearDinero } from '../../helpers';
import useUmamy from '../../hooks/useUmamy';

import './Producto.css'

export default function Producto({producto}) {

    const { handleClickModal, handleSetProducto } = useUmamy();
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
                    className='producto__boton'
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }
                    }
                >
                    PEDIR
                </button>
            </section>
        </article>
    )
}