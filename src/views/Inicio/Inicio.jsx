import React from 'react'
import Producto from '../../components/Producto/Producto'
import Sidebar from '../../components/Sidebar/Sidebar'
import { productos } from '../../data/productos'

import './Inicio.css'

export default function Inicio() {
  console.log(productos);

  return (
    <>
      <section>
        <Sidebar />
        <h1>Inicio</h1>
        <p>
          Elige y personaliza tu pedido.
        </p>

        <article className='contenedor__productos'>
          {productos.map((producto) => (
            <Producto key={producto.id} producto={producto}/>
          ))}
        </article>
      </section>
    </>
  )
}
