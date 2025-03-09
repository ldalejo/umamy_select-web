import React from 'react'
import useUmamy from '../../hooks/useUmamy';

import './Pedido.css'
import ResumenProducto from '../ResumenProducto/ResumenProducto';
import { formatearDinero } from '../../helpers';

export default function Resumen() {

  const { pedido, total } = useUmamy();

  return (
    <aside className='pedido'>
      <h2>Mi Pedido</h2>
      <section>
        <article>
          {pedido.length === 0 ? (
            <p>Tu carrito está vacio</p>
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
      <section>
        <p>Importe total : {formatearDinero(total)}</p>
      </section>
        <section>
          <form>
            <input 
              type="submit" 
              className='enviar-pedido'
              value='Confirmar pedido'
            />
          </form>
        </section>
    </aside>
  )
}

    {/* <section className='pedido'>
      <article >
        <h1>Tu Pedido</h1>
        <p>Tu carrito está vacio</p>
      </article>
      <article>
        <p>Importe total : </p>
      </article>
    </section> */}
