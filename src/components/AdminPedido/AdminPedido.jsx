import React from 'react'
import { formatearDinero } from '../../helpers';
import useUmamy from "../../hooks/useUmamy";

import './AdminPedido.css'

export default function AdminPedido({ pedido }) {

    const { handleCompletarPedido, handleCobrarPedido } = useUmamy();

    const { id, user, productos, total, estado, cobrado } = pedido;

    console.log(estado, cobrado)

    return (
      <article className='admin-pedido'>
        <h3>Pedido #{id}</h3>
        <p className='admin-pedido__p'>Cliente: <span className='admin-pedido__span'>{user.name}</span></p>
  
        <ul className='admin-pedido__lista'>
          {productos.map(producto => (
            <li key={producto.id}>
              <p>{producto.nombre}: <span className='admin-pedido-producto__span'>{producto.pivot.cantidad}</span></p>
            </li>
          ))}
        </ul>
        <p>TOTAL A PAGAR: <span>{formatearDinero(total)}</span></p>
        {
            estado == 0 && cobrado == 0 && (
                <button 
                    type='button'
                    className='pedido__boton'
                    onClick={() => handleCompletarPedido(id)}
                >
                    Completar
                </button>
            )
        }
        {
            estado == 1 && cobrado == 0 &&( 
                <button 
                    type='button'
                    className='pedido__boton'
                    onClick={() => handleCobrarPedido(id)}
                >
                    Cobrar
                </button>
            )
        }

      </article>
    );
  }