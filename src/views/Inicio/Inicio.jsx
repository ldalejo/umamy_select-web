import React from 'react'
import Producto from '../../components/Producto/Producto'
import Sidebar from '../../components/Sidebar/Sidebar'

import { productos as data } from '../../data/productos'
import useUmamy from '../../hooks/useUmamy'

import './Inicio.css'

export default function Inicio() {
  
  const { categoriaActual } = useUmamy();

  const productos = data.filter(producto => producto.categoria_id === categoriaActual.id)

  return (
    <>
      <section>
        <Sidebar />
        <h1>{categoriaActual.nombre}</h1>
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
