import React from "react";
import useSWR from "swr";
import Axios from "../../config/axios";
import ClientePedido from "../../components/ClientePedido/ClientePedido";

import './HistorialPedidos.css'
import { useParams } from "react-router-dom";

export default function HistorialPedidos() {

    const token = localStorage.getItem('AUTH_TOKEN');
    const { usuario_id } = useParams();

    console.log(usuario_id)

    const fetcher = () => Axios.get(`/api/pedidos-usuario/${usuario_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const { data, error, isLoading } = useSWR(`/api/pedidos-usuario/${usuario_id}`, fetcher, { refreshInterval: 1000 });
  
    if (isLoading) {
      return 'Cargando...';
    }

    console.log(data.data.data);

    return (
      <section className=''>
        <h1>Pedidos</h1>
        <p>Vista para administrar los pedidos.</p>
  
        <article className="contenedor__admin-pedidos">
          {data.data.data.map(pedido => (
            <ClientePedido
              key={pedido.id} 
              pedido={pedido}
            />
          ))}
        </article>
      </section>
    );
}
