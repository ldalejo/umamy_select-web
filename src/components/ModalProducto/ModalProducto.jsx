import React from 'react';
import { useState, useEffect } from 'react';
import { MdCancel, MdAddCircle, MdRemoveCircle  } from 'react-icons/md';
import useUmamy from '../../hooks/useUmamy';
import { formatearDinero } from '../../helpers';

import './ModalProducto.css'

export default function ModalProducto() {

    const [cantidad, setCantidad] = useState(1);
    const [importe, setImporte] = useState(0);
    const [edicion, setEdicion] = useState(false);

    const { producto, handleClickModal, handleAgregarPedido, pedido } = useUmamy();

    /* Tenemos el importe siempre actualizado a la cantidad de producto*/
    useEffect(() => {
        actualizarImporte();
    }, [cantidad]);

    /* Controla si el producto seleccionado esta en el pedido lo modifica*/
    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            modificarPedido();
        }
    }, [pedido]);

    const restarProducto = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    }

    const sumarProducto = () => {
        if (cantidad < 10) {
            setCantidad(cantidad + 1);
        }
    }

    const actualizarImporte = () => {
        setImporte(cantidad * producto.precio);
    }

    const modificarPedido = () => {
        const productoEditar = pedido.filter(pedidoState => pedidoState.id === producto.id)[0];
        setCantidad(productoEditar.cantidad);
        setEdicion(true);
    }

  return (
    <div role='dialog' aria-modal='true'>
        <button
            onClick={handleClickModal}
            className='modal__icono-cerrar'
            aria-label='Cerrar modal'
        >
            <MdCancel size={40} />
        </button>
    <section>
            <h2>{producto.nombre}</h2>
        <img 
            alt={`Imagen producto ${producto.nombre}`} 
            src={producto.imagen}
            className='imagen'
        />
      <section className='modal__botones-container'>
            <article className='modal__cantidad-container'>
                <button
                    type='button'
                    className='modal_sumar-restar'
                    onClick={restarProducto}
                    aria-label='Disminuir cantidad'
                >
                    <MdRemoveCircle />
                </button>
                <output className='modal__parrafo' aria-live='polite'>
                    {cantidad}
                </output>
                <button
                    type='button'
                    className='modal_sumar-restar'
                    onClick={sumarProducto}
                    aria-label='Aumentar cantidad'
                >
                <MdAddCircle />
                </button>
            </article>
            <button 
                type='button' 
                className='modal__anadir-producto'
                onClick={() => handleAgregarPedido({...producto, cantidad})}
            >
                {edicion ? 'Editar' : 'Añadir'} {formatearDinero(importe)}
            </button>
        </section>
    </section>
  </div>
  )
}
