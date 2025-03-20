import React, { useEffect, useState } from 'react'
import useUmamy from '../../hooks/useUmamy';

import './Pedido.css'
import ResumenProducto from '../ResumenProducto/ResumenProducto';
import { formatearDinero } from '../../helpers';

export default function Resumen() {

  const [disabled, setDisabled] = useState(true);
  const [valorBoton, setValorBoton] = useState('');

  const { pedido, total, handleSubmitNuevoPedido } = useUmamy();

  useEffect(() => {
    comprobarPedido();

  }, [pedido]);

  const comprobarPedido = () => {
    if (pedido.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setValorBoton("CONFIRMAR");
  }

  const handleSubmit = e => {
    setValorBoton('PROCESANDO...');
    e.preventDefault();
    setDisabled(true);
    handleSubmitNuevoPedido();
  }

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
        <form 
          className='pedido__form'
          onSubmit={handleSubmit}  
        >
          <input 
            type="submit" 
            className='enviar-pedido'
            value={valorBoton}
            disabled={disabled}
          />
        </form>
      </section>
    </aside>
  )
}
