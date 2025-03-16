import React from 'react'
import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../config/axios';
import AlertaErroresFormulario from '../components/AlertaErroresFormulario/AlertaErroresFormulario';

export default function Login() {

  const [errores, setErrores] = useState();

    const emailRef = createRef();
    const passwordRef = createRef();

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
          const { data } = await Axios.post('/api/iniciar-sesion', datos);
          localStorage.setItem('AUTH_TOKEN', data.token);
          setErrores([]);
        } catch (error) {
          setErrores(Object.values(error.response.data.errors));
        }
    }

  return (
    <>
        <h1>Iniciar sesión</h1>
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

              <button
                  className='formulario-boton'
              >
                  Iniciar sesión
              </button>
            </form>
        </div>
        <nav className='enlace-registro'>
          No tienes cuenta? <Link to="/auth/registro">Regístrate</Link>
        </nav>
    </>
  )
}
