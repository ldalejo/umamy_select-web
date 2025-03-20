import React from 'react'
import useSWR from "swr";
import Axios from "../../config/axios";
import useUmamy from "../../hooks/useUmamy";
import Producto from '../../components/Producto/Producto';
import Sidebar from '../../components/Sidebar/Sidebar';
import Loader from "../../components/Loader/Loader";

import './AdminProductos.css'

export default function AdminProductos() {

  const { categoriaActual } = useUmamy();

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => Axios.get('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(datos => datos.data);

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {refreshInterval: 1000});

  if (isLoading || !data) {
    return <Loader/>
  }

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

  return (
    <>
      <section className='admin-productos__section'>
        <article className='admin-productos__section-sidebar'>
          <Sidebar />
        </article>
        <article className='admin-productos__contenedor-productos'>
          <h1 className='admin-productos__h1'>{categoriaActual.nombre}</h1>
          <p className='admin-productos__p'>Vista para administrar los productos.</p>
          <article className="admin-productos__productos">
            {productos.map((producto) => (
              <Producto 
                  key={producto.id} 
                  producto={producto} 
                  botonDisponibilidad={Boolean(producto.disponible)}
              />
            ))}
          </article>
        </article>
      </section>
    </>
  );
}
