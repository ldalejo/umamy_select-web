import React from 'react';
import { useState } from 'react';
import { MdCancel, MdAddCircle, MdRemoveCircle  } from "react-icons/md";
import useUmamy from '../../hooks/useUmamy';
import { formatearDinero } from '../../helpers';

import './ModalProducto.css'

export default function ModalProducto() {

    const [cantidad, setCantidad] = useState(1);

    const { producto, handleClickModal } = useUmamy();

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

  return (
    <div>
        <button
            onClick={handleClickModal}
            className='modal__icono-cerrar'
        >
            <MdCancel  size={40} />
        </button>
        <div>
            <h2>{producto.nombre}</h2>
            <img 
                alt={`Imagen producto ${producto.nombre}`} 
                src={`${producto.imagen}`}
                className='imagen'
            />
            <p>{formatearDinero(producto.precio)}</p>
            <div className='modal__cantidad-container'>
                <button
                    type='button'
                    className='modal_sumar-restar'
                    onClick={restarProducto}
                >
                    <MdRemoveCircle/>
                </button>
                <p className='modal__parrafo'>{cantidad}</p>
                <button
                    type='button'
                    className='modal_sumar-restar'
                    onClick={sumarProducto}
                >
                    <MdAddCircle/>
                </button>
                <button
                    type='button'
                    className='modal__anadir-producto'
                >
                    Añadir
                </button>
            </div>
        </div>
    </div>
  )
}
