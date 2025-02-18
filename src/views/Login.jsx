import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
        <h1>Iniciar sesión</h1>
        <div className="formulario-contenedor">
            <form>
              <div className="formulario-apartado">
                <label
                    className="formulario-label"
                    htmlFor="email"
                >
                    Email:
                </label>
                <input 
                    type="email" 
                    id="email"
                    className="formulario-input"
                    name="email"
                    placeholder="Email"
                />
              </div>

              <div className="formulario-apartado">
                <label
                    className="formulario-label"
                    htmlFor="password"
                >
                    Password:
                </label>
                <input 
                    type="password" 
                    id="password"
                    className="formulario-input"
                    name="password"
                    placeholder="Password"
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
