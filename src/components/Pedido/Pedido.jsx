import React from 'react'
import useUmamy from '../../hooks/useUmamy';

import './Pedido.css'
import ResumenProducto from '../ResumenProducto/ResumenProducto';
import { formatearDinero } from '../../helpers';

export default function Resumen() {

  const { pedido, total } = useUmamy();

  const comprobarPedido = () => pedido.length === 0;

  return (
    <aside className='pedido'>
      <h2>Mi Pedido</h2>
      <section className='pedido__productos'>
        <article>
          {pedido.length === 0 ? (
            <p>Tu pedido está vacio</p>
          ) : (
            pedido.map(producto => (
              <ResumenProducto
                key={producto.id}
                producto={producto}
              />
            ))
          )
        }
        </article>
      </section>
      <section className='pedido__footer'>
        <article className='pedido__importe'>
          <p>Importe total: </p>
          <p>{formatearDinero(total)}</p>
        </article>
        <form className='pedido__form'>
          <input 
            type="submit" 
            className='enviar-pedido'
            value='Confirmar pedido'
            disabled={comprobarPedido()}
          />
        </form>
      </section>
    </aside>
  )
}
