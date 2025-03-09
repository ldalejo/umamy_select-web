import React from 'react'
import { MdEdit,  MdDelete} from "react-icons/md";
import { formatearDinero } from '../../helpers';

import './ResumenProducto.css'

export default function ResumenProducto({producto}) {

    const { id, nombre, imagen, precio, cantidad } = producto;

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
                    className='resumenPedido__iconos'
                    aria-label='Editar producto'
                >
                    <MdEdit aria-hidden="true"/>
                </button>
                <button 
                    className='resumenPedido__iconos'
                    aria-label='Eliminar producto'
                >
                    <MdDelete aria-hidden="true"/>
                </button>
            </div>
        </section>
        <p className='resumenPedido__precio-p'>{formatearDinero(precio)}</p>
      </article>
    </section>
  )
}
