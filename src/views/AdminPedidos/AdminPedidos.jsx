import React from "react";
import useSWR from "swr";
import Axios from "../../config/axios";
import { formatearDinero } from "../../helpers";
import useUmamy from "../../hooks/useUmamy";

export default function AdminPedidos() {

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => Axios.get('/api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, {refreshInterval: 1000});

  const { handleCompletarPedido } = useUmamy();

  if (isLoading) {
    return 'Cargando...'
  }

  return (
    <div>
      <h1>Pedidos</h1>
      <p>Vista para administrar los pedidos.</p>

      <div>
        {
          data.data.data.map(pedido => (
            <div key={pedido.id}>
              <h3>Pedido <span>#{pedido.id}</span> </h3>
              <p>Cliente: <span>{pedido.user.name}</span></p>
              {
                pedido.productos.map(producto => (
                  <div key={producto.id}>
                    <p>{producto.nombre}</p>
                    <p>Cantidad: <span>{producto.pivot.cantidad}</span></p>
                  </div>
                ))
              }
              <p>Total a pagar: <span>{formatearDinero(pedido.total)}</span></p>

              <button 
                type='button'
                onClick={() => handleCompletarPedido(pedido.id)}
              >
                Completar
              </button>
            </div>
          ))
        }
      </div>

    </div>
  );
}
