import React from 'react'
import { formatearDinero } from '../../helpers';
import useUmamy from '../../hooks/useUmamy';

import './ClientePedido.css'

export default function AdminPedido({ pedido }) {

    const { handleCompletarPedido, handleCobrarPedido } = useUmamy();

    const { id, user, productos, total, estado, cobrado } = pedido;

    console.log(estado, cobrado)

    return (
      <article className='admin-pedido'>
        <h3>Pedido #{id}</h3>
  
        <ul className='admin-pedido__lista'>
          {productos.map(producto => (
            <li key={producto.id}>
              <p>{producto.nombre}: <span className='admin-pedido-producto__span'>{producto.pivot.cantidad}</span></p>
            </li>
          ))}
        </ul>
        <p>TOTAL: <span>{formatearDinero(total)}</span></p>

      </article>
    );
  }