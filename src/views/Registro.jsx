import React from 'react'
import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../config/axios';
import AlertaErroresFormulario from '../components/AlertaErroresFormulario/AlertaErroresFormulario';

export default function Registro() {

    const [errores, setErrores] = useState();

    const nombreRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const confirmacionPasswordRef = createRef();

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            nombre: nombreRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmacionPasswordRef.current.value
        }

        try {
            const { data } = await Axios.post('/api/registro', datos);

            console.log(data.token);
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

  return (
    <>
        <h1>Crear cuenta</h1>
        <div className="formulario-contenedor">
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                {
                    errores 
                    ? 
                    errores.map(error => 
                        <AlertaErroresFormulario key={error}>{error}</AlertaErroresFormulario>
                    ) 
                    : 
                    null
                }

                <div className="formulario-apartado">
                    {/* <label
                        className="formulario-label"
                        htmlFor="nombre"
                    >
                        Nombre:
                    </label> */}
                    <input 
                        type="text" 
                        id="nombre"
                        className="formulario-input"
                        name="nombre"
                        placeholder="Nombre"
                        ref={nombreRef}
                    />
                </div>

                <div className="formulario-apartado">
                    {/* <label
                        className="formulario-label"
                        htmlFor="email"
                    >
                        Email:
                    </label> */}
                    <input 
                        type="email" 
                        id="email"
                        className="formulario-input"
                        name="email"
                        placeholder="Email"
                        ref={emailRef}
                    />
                </div>

                <div className="formulario-apartado">
                    {/* <label
                        className="formulario-label"
                        htmlFor="password"
                    >
                        Password:
                    </label> */}
                    <input 
                        type="password" 
                        id="password"
                        className="formulario-input"
                        name="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                </div>

                <div className="formulario-apartado">
                    {/* <label
                        className="formulario-label"
                        htmlFor="confirmacion_password"
                    >
                        Repetir Password:
                    </label> */}
                    <input 
                        type="password" 
                        id="confirmacion_password"
                        className="formulario-input"
                        name="confirmacion_password"
                        placeholder="Repetir Password"
                        ref={confirmacionPasswordRef}
                    />
                </div>

                <button
                    className='formulario-boton'
                >
                    Continuar
                </button>

            </form>
        </div>
        <nav className='enlace-registro'>
          Tienes cuenta? <Link to="/auth/login">Inicia sesión</Link>
        </nav>
    </>
  )
}
