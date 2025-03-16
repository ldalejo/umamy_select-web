import React from 'react'
import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertaErroresFormulario from '../components/AlertaErroresFormulario/AlertaErroresFormulario';
import useAuth from '../hooks/useAuth';

export default function Login() {

  const [errores, setErrores] = useState();

  const emailRef = createRef();
  const passwordRef = createRef();

  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    login(datos, setErrores);

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
