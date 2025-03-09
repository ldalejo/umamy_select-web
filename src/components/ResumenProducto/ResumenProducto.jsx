import React from 'react'
import { MdEdit,  MdDelete} from "react-icons/md";
import { formatearDinero } from '../../helpers';
import { useState, useEffect } from 'react';

import './ResumenProducto.css'

export default function ResumenProducto({producto}) {
  const [importe, setImporte] = useState(0);
  
  const { id, nombre, imagen, precio, cantidad } = producto;

  /* Tenemos el importe siempre actualizado a la cantidad de producto*/
  useEffect(() => {
      actualizarImporte();
  }, [cantidad]);

  const actualizarImporte = () => {
    setImporte(cantidad * producto.precio);
}

  return (
    <section className='resumenPedido__container'>
      <article className='resumenPedido__resumen'>
            <img 
                src={imagen} 
                alt={`imagen ${nombre}`}
                className='resumenPedido__imagen'
            />
        <p>{nombre}</p>
      </article>

      <article className='resumenPedido__container-botones'>
        <section className='resumenPedido__container-cantidad'>
            <p className='resumenPedido__p'>{cantidad}</p>
            <div className='resumenPedido__container-botones'>
                <button 
                    className='resumenPedido__icono-editar'
                    aria-label='Editar producto'
                >
                    <MdEdit aria-hidden="true"/>
                </button>
                <button 
                    className='resumenPedido__icono-eliminar'
                    aria-label='Eliminar producto'
                >
                    <MdDelete aria-hidden="true"/>
                </button>
            </div>
        </section>
        <p className='resumenPedido__precio-p'>{formatearDinero(importe)}</p>
      </article>
    </section>
  )
}
