import React, { useState } from 'react'
import useUmamy from "../../hooks/useUmamy";
import useSWR from "swr";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertaErroresFormulario from '../../components/AlertaErroresFormulario/AlertaErroresFormulario';

import './AdminAnadirProductos.css';

export default function AdminAnadirProductos() {

    const [disabled, setDisabled] = useState(false);
    const [valueButton, setValueButton] = useState('Añadir');

    const { categorias, handleAnadirProductoSubmit } = useUmamy();

    const token = localStorage.getItem('AUTH_TOKEN');

    // Esquema de validación con Yup
    const validacion = Yup.object({
        categoria: Yup.string()
            .required('Seleccione una categoría.'),
        nombre: Yup.string()
            .required('El nombre es obligatorio'),
        precio: Yup.number()
            .typeError("El precio debe ser un número válido")
            .positive("El precio debe ser mayor a 0")
            .max(100, "El precio no puede superar los 100€")
            .required('El precio es obligatorio'),
        imagen: Yup.mixed()
            .test("required", "Debes subir una imagen", (value) => {
                return value && value.length > 0;
            })
            .test("fileType", "Solo se permiten imágenes (jpg, png, jpeg)", (value) => {
                return value && value[0] && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
            })
    });

    // Usamos react-hook-form con yupResolver
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validacion),
        mode: 'onBlur',
    });

    const fetcher = () =>
        Axios.get('/api/producto/anadir-producto', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
    });

    const { data, error, isLoading } = useSWR('/api/producto/anadir-producto', fetcher, { revalidateOnFocus: false });

    const onSubmit = async (data) => {
        setDisabled(true);
        setValueButton('Añadiendo...');

        // Lo guardamos con un FormData porque de la anterior manera daba error en la imagen
        const formData = new FormData();
        formData.append('categoria_id', data.categoria_id);
        formData.append('nombre', data.nombre);
        formData.append('precio', data.precio);
        formData.append('imagen', data.imagen[0]); 


        handleAnadirProductoSubmit(formData, reset);
        setValueButton('Confirmar');
        setDisabled(false);
    };

    return (
        <>
            <h1 className='h1__producto'>Añadir nuevo producto</h1>
            <section className="formulario-producto__contenedor">
                <form onSubmit={handleSubmit(onSubmit)} className="formulario-producto-grid" encType="multipart/form-data">
                    <div className="formulario-producto__grupo">
                        <label className="formulario-producto__label">Elige una categoria:</label>
                        <select
                            name="categoria_id"
                            placeholder="Categoria"
                            className="formulario-producto__input"
                            {...register('categoria_id')}
                        >
                            <option 
                                value="" 
                                className="formulario-producto__input"
                            >
                                Seleccione una categoría
                            </option>
                            {
                                categorias.map(categoria => (
                                    <option 
                                        key={categoria.id} 
                                        value={categoria.id} 
                                        className="formulario-producto__input"
                                    >
                                        {categoria.nombre}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.categoria && <AlertaErroresFormulario>{errors.categoria.message}</AlertaErroresFormulario>}
                    </div>

                    <div className="formulario-producto__grupo">
                        <label className="formulario-producto__label">Nombre producto:</label>
                        <input 
                            type="text" 
                            name="nombre"
                            placeholder="Nombre del producto"
                            className="formulario-producto__input"
                            {...register('nombre')}
                        />
                        {errors.nombre && <AlertaErroresFormulario>{errors.nombre.message}</AlertaErroresFormulario>}
                    </div>

                    <div className="formulario-producto__grupo">
                        <label className="formulario-producto__label">Precio:</label>
                        <input 
                            type="number" 
                            name="precio"
                            placeholder="Precio del producto"
                            className="formulario-producto__input-distinto"
                            {...register('precio')}
                        />
                        {errors.precio && <AlertaErroresFormulario>{errors.precio.message}</AlertaErroresFormulario>}
                    </div>

                    <div className="formulario-producto__grupo">
                        <label className="formulario-producto__label">Guarda una imagen:</label>
                        <input 
                            type="file" 
                            name="imagen"
                            className="formulario-producto__input-distinto"
                            {...register('imagen')}
                        />
                        {errors.imagen && <AlertaErroresFormulario>{errors.imagen.message}</AlertaErroresFormulario>}
                    </div>

                    <div className="formulario-producto__contenedor-button">
                        <button 
                            className="formulario-producto__boton" 
                            disabled={disabled}
                        >
                            {valueButton}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
