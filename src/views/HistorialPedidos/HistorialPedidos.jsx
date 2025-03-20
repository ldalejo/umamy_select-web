import React from "react";
import useSWR from "swr";
import Axios from "../../config/axios";
import ClientePedido from "../../components/ClientePedido/ClientePedido";
import { useParams } from "react-router-dom";

import './HistorialPedidos.css'

export default function HistorialPedidos() {

    const token = localStorage.getItem('AUTH_TOKEN');
    const { usuario_id } = useParams();

    const fetcher = () => Axios.get(`/api/pedidos-usuario/${usuario_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const { data, error, isLoading } = useSWR(`/api/pedidos-usuario/${usuario_id}`, fetcher, { revalidateOnFocus: false });
  
    if (isLoading) {
      return 'Cargando...';
    }

    console.log(data.data.data);

    return (
      <section className=''>
        <h1>Historial de Pedidos</h1>
  
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
