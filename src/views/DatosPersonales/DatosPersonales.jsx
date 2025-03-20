import React from "react";
import { useState, useEffect } from 'react'
import useSWR from "swr";
import Axios from "../../config/axios";
import { useParams } from "react-router-dom";

import './DatosPersonales.css'
import useUmamy from "../../hooks/useUmamy";

export default function DatosPersonales() {

    const [datosUsuario, setDatosUsuario] = useState(null);
    const [datosFormulario, setDatosFormulario] = useState({});

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

    if (isLoading) {
      return "Cargando...";
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        handleDatosUsuarioSubmit(usuario_id, datosFormulario);
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
                        value={datosFormulario.nombre}
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
                        value={datosFormulario.apellido}
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
                        value={datosFormulario.telefono}
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
                        value={datosFormulario.direccion}
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
                        value={datosFormulario.ciudad}
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
                        value={datosFormulario.provincia}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__grupo">
                    <label className="formulario-personal__label">
                        Código Postal:
                    </label>
                    <input
                        type="text"
                        name="codigoPostal"
                        placeholder="Códio postal"
                        className="formulario-personal__input"
                        value={datosFormulario.codigoPostal}
                        onChange={handleChange}
                    />
                </div>

                <div className="formulario-personal__contenedor-button">
                    <button className="formulario-personal__boton">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </section>
      </>
    );
}
