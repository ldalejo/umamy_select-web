import React from "react";
import { useState, useEffect } from 'react'
import useSWR from "swr";
import Axios from "../../config/axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useUmamy from "../../hooks/useUmamy";
import AlertaErroresFormulario from "../../components/AlertaErroresFormulario/AlertaErroresFormulario";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './DatosPersonales.css'

export default function DatosPersonales() {

    const [datosUsuario, setDatosUsuario] = useState(null);
    const [datosFormulario, setDatosFormulario] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [valueButton, setValueButton]= useState('Confirmar');

    const { handleDatosUsuarioSubmit } = useUmamy();

    const token = localStorage.getItem('AUTH_TOKEN');
    const { usuario_id } = useParams();

    // Esquema de validación con Yup
    const validacion = yup.object().shape({
        nombre: yup.string().required("El nombre es obligatorio"),
        apellido: yup.string().required("El apellido es obligatorio"),
        telefono: yup
            .string()
            .matches(/^\d{9}$/, "El teléfono debe tener 9 números")
            .required("El teléfono es obligatorio"),
        direccion: yup.string().required("La dirección es obligatoria"),
        ciudad: yup.string().required("La ciudad es obligatoria"),
        pais: yup.string().required("El país es obligatorio"),
        codigo_postal: yup
            .string()
            .matches(/^\d{5}$/, "El código postal debe tener 5 números")
            .required("El código postal es obligatorio"),
    });

    // Usamos react-hook-form con yupResolver
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validacion),
        mode: 'onBlur',
    });
    

    const fetcher = () =>
        Axios.get(`/api/datos-usuario/${usuario_id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
    });

    const { data, error, isLoading } = useSWR(`/api/datos-usuario/${usuario_id}`, fetcher, { revalidateOnFocus: false });

    useEffect(() => {
        if (data) {
            const usuario = data.data.usuario;
            Object.keys(usuario).forEach((key) => setValue(key, usuario[key]));
        }
    }, [data, setValue]);

    if (isLoading || !data) {
        return <Loader/>
    }

    const onSubmit = async (data) => {
        setDisabled(true);
        setValueButton('Registrando...');
        const datos = {
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            direccion: data.direccion,
            ciudad: data.ciudad,
            /* provincia: data.provincia, */
            pais: data.pais,
            codigo_postal: data.codigo_postal
        };
        handleDatosUsuarioSubmit(usuario_id, datos);
        setValueButton('Confirmar');
        setDisabled(false);
    };

    return (
      <>
        <h1>Datos personales</h1>
        <section className="formulario-personal__contenedor">
            <form onSubmit={handleSubmit(onSubmit)} className="formulario-grid">
                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="formulario-personal__input"
                        {...register("nombre")}
                    />
                    {errors.nombre && <AlertaErroresFormulario>{errors.nombre.message}</AlertaErroresFormulario>}
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        className="formulario-personal__input"
                        {...register("apellido")}
                    />
                    {errors.apellido && <AlertaErroresFormulario>{errors.apellido.message}</AlertaErroresFormulario>}
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        className="formulario-personal__input"
                        {...register("telefono")}
                    />
                        {errors.telefono && <AlertaErroresFormulario>{errors.telefono.message}</AlertaErroresFormulario>}
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        className="formulario-personal__input"
                        {...register("direccion")}
                    />
                        {errors.direccion && <AlertaErroresFormulario>{errors.direccion.message}</AlertaErroresFormulario>}
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Ciudad:</label>
                    <input
                        type="text"
                        name="ciudad"
                        placeholder="Ciudad"
                        className="formulario-personal__input"
                        {...register("ciudad")}
                    />
                        {errors.ciudad && <AlertaErroresFormulario>{errors.ciudad.message}</AlertaErroresFormulario>}
                </div>

                {/* <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Provincia:</label>
                    <input
                        type="text"
                        name="provincia"
                        placeholder="Provincia"
                        className="formulario-personal__input"
                        {...register("provincia")}
                    />
                        {errors.provincia && <AlertaErroresFormulario>{errors.provincia.message}</AlertaErroresFormulario>}
                </div> */}

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">
                        País:
                    </label>
                    <input
                        type="text"
                        name="pais"
                        placeholder="País"
                        className="formulario-personal__input"
                        {...register("pais")}
                    />
                        {errors.pais && <AlertaErroresFormulario>{errors.pais.message}</AlertaErroresFormulario>}
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">
                        Código Postal:
                    </label>
                    <input
                        type="text"
                        name="codigo_postal"
                        placeholder="Códio postal"
                        className="formulario-personal__input"
                        {...register("codigo_postal")}
                    />
                        {errors.codigo_postal && <AlertaErroresFormulario>{errors.codigo_postal.message}</AlertaErroresFormulario>}
                </div>

                <div className="formulario-personal__contenedor-button">
                    <button 
                        className="formulario-personal__boton" 
                        disabled={disabled}
                    >
                        {valueButton}
                    </button>
                </div>
            </form>
        </section>
      </>
    );
}
