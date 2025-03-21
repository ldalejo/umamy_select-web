import React from 'react';
import useSWR from 'swr';
import Axios from '../../config/axios';
import AdminPedido from '../../components/AdminPedido/AdminPedido';

import './AdminPedidos.css'
import Loader from '../../components/Loader/Loader';

export default function AdminPedidos() {

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => Axios.get('/api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, { refreshInterval: 1000 });

  if (isLoading || !data) {
    return <Loader/>
  }

  return (
    <section className=''>
      <h1>Pedidos</h1>
      <p>Vista para administrar los pedidos.</p>

      <article className='contenedor__admin-pedidos'>
        {data.data.data.length > 0 ? (
          data.data.data.map((pedido) => (
            <AdminPedido key={pedido.id} pedido={pedido} />
          ))
        ) : (
          <p>No hay pedidos.</p>
        )}
      </article>
    </section>
  );
}
