import React from 'react'
import useSWR from "swr";
import Axios from "../../config/axios";
import { formatearDinero } from "../../helpers";
import useUmamy from "../../hooks/useUmamy";
import Producto from '../../components/Producto/Producto';
import Sidebar from '../../components/Sidebar/Sidebar';

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

    if (isLoading) {
        return 'Cargando...'
    }

    const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

  return (
    <>
      <section className=''>
        <Sidebar />
        <h1>{categoriaActual.nombre}</h1>
        <p>Vista para administrar los productos.</p>

        <article className="contenedor__productos">
          {productos.map((producto) => (
            <Producto 
                key={producto.id} 
                producto={producto} 
                botonDisponibilidad={producto.disponible}
            />
          ))}
        </article>
      </section>
    </>
  );
}
