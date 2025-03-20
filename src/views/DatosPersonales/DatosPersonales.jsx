import React from "react";
import { useState, useEffect } from 'react'
import useSWR from "swr";
import Axios from "../../config/axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useUmamy from "../../hooks/useUmamy";

import './DatosPersonales.css'

export default function DatosPersonales() {

    const [datosUsuario, setDatosUsuario] = useState(null);
    const [datosFormulario, setDatosFormulario] = useState({});
    const [disabled, setDisabled] = useState(false);

    const { handleDatosUsuarioSubmit } = useUmamy();

    const token = localStorage.getItem('AUTH_TOKEN');
    const { usuario_id } = useParams();

    const fetcher = () =>
        Axios.get(`/api/datos-usuario/${usuario_id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
    });

    const { data, error, isLoading } = useSWR(`/api/datos-usuario/${usuario_id}`, fetcher, { revalidateOnFocus: false });

    useEffect(() => {
        if (data) {
            setDatosUsuario(data.data.usuario);
            setDatosFormulario(data.data.usuario);
        }
    }, [data])

  // Manejar cambios en los inputs
    const handleChange = (e) => {
        setDatosFormulario({
        ...datosFormulario,
        [e.target.name]: e.target.value,
        });
    };

    if (isLoading || !data) {
        return <Loader/>
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setDisabled(true);
        handleDatosUsuarioSubmit(usuario_id, datosFormulario);
        setDisabled(false);
    };

    return (
      <>
        <h1>Datos personales</h1>
        <section className="formulario-personal__contenedor">
            <form onSubmit={handleSubmit} className="formulario-grid">
                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="formulario-personal__input"
                        value={datosFormulario.nombre ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        className="formulario-personal__input"
                        value={datosFormulario.apellido ?? ''}
                        onChange={handleChange}
                    />
                </div>

                {/* <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="formulario-personal__input"
                        value={datosFormulario.email}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        className="formulario-personal__input"
                        value={datosFormulario.telefono ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        className="formulario-personal__input"
                        value={datosFormulario.direccion ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Ciudad:</label>
                    <input
                        type="text"
                        name="ciudad"
                        placeholder="Ciudad"
                        className="formulario-personal__input"
                        value={datosFormulario.ciudad ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">Provincia:</label>
                    <input
                        type="text"
                        name="provincia"
                        placeholder="Provincia"
                        className="formulario-personal__input"
                        value={datosFormulario.provincia ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">
                        País:
                    </label>
                    <input
                        type="text"
                        name="pais"
                        placeholder="País"
                        className="formulario-personal__input"
                        value={datosFormulario.pais ?? ''}
                        onChange={handleChange}
                    />
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
                        value={datosFormulario.codigo_postal ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__contenedor-button">
                    <button className="formulario-personal__boton" disabled={disabled}>
                        {disabled ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </section>
      </>
    );
}
