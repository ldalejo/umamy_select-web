import React from 'react'
import useSWR from 'swr'
import Producto from '../../components/Producto/Producto'
import Sidebar from '../../components/Sidebar/Sidebar'
import useUmamy from '../../hooks/useUmamy'
import Loader from '../../components/Loader/Loader';
import Axios from '../../config/axios'

import './Inicio.css'

export default function Inicio() {
  
  const { categoriaActual } = useUmamy();

  //Consulta SWR
  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => Axios('/api/productos-disponibles', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(data => data.data);
  
  const { data, error, isLoading } = useSWR('/api/productos-disponibles', fetcher,  {refreshInterval: 1000});

  const productos = data?.data?.filter(producto => producto.categoria_id === categoriaActual.id)

  if (isLoading || !data || productos.length === 0) {
    return <Loader/>
  }

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
            <Producto 
              key={producto.id} 
              producto={producto}
              botonAgregar={true}
            />
          ))}
        </article>
      </section>
    </>
  )
}
