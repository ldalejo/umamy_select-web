import React, {useState} from 'react'
import { MdDelete, MdStarBorder, MdStar} from "react-icons/md";
import { formatearDinero } from '../../helpers';
import useUmamy from '../../hooks/useUmamy';

import './Producto.css'

export default function Producto({producto, botonAgregar = false, botonDisponibilidad = false}) {

    const { handleClickModal, handleSetProducto, handleDisponibilidadProducto, handleEliminarProducto } = useUmamy();
    
    // Aplicamos destructuring
    const {id, imagen, nombre, precio} = producto;

    return (
      <article className="producto">
        <img src={imagen} alt={`imagen ${nombre}`} className="imagen" />
        <section className="producto__contenido">
          <p className="contenido__nombre">{nombre}</p>
          <p className="contenido__precio">{formatearDinero(precio)}</p>
          {botonAgregar && (
            <button
              type="button"
              className="producto__boton"
              onClick={() => {
                handleClickModal();
                handleSetProducto(producto);
              }}
            >
              PEDIR
            </button>
            
          )}
          {botonDisponibilidad && (
            <article className='contenedor__botones-producto'>
              <button
                type="button"
                className="producto__boton"
                onClick={() => handleDisponibilidadProducto(producto.id)}
              >
                DISPONIBLE
              </button>
              <button
                type="button"
                className="producto__boton-eliminar"
                onClick={() => handleEliminarProducto(producto.id)}
              >
                <MdDelete aria-hidden="true"/>
              </button>
            </article>
          )}
          {Boolean(!botonDisponibilidad && !botonAgregar) && (
            <article className='contenedor__botones-producto'>
              <button
                type="button"
                className="producto__boton-agotado"
                onClick={() => handleDisponibilidadProducto(producto.id)}
              >
                AGOTADO
              </button>
              <button
                type="button"
                className="producto__boton-eliminar"
                onClick={() => handleEliminarProducto(producto.id)}
              >
                <MdDelete aria-hidden="true"/>
              </button>
            </article>
          )}
        </section>
      </article>
    );
}