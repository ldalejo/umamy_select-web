import React from 'react'
import { Link } from 'react-router-dom'

export default function Registro() {
  return (
    <>
        <h1>Crear cuenta</h1>
        <div className="formulario-contenedor">
            <form>
                <div className="formulario-apartado">
                    <label
                        className="formulario-label"
                        htmlFor="nombre"
                    >
                        Nombre:
                    </label>
                    <input 
                        type="text" 
                        id="nombre"
                        className="formulario-input"
                        name="nombre"
                        placeholder="Nombre"
                    />
                </div>

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

                <div className="formulario-apartado">
                    <label
                        className="formulario-label"
                        htmlFor="password_confirmation"
                    >
                        Repetir Password:
                    </label>
                    <input 
                        type="password" 
                        id="password_confirmation"
                        className="formulario-input"
                        name="password_confirmation"
                        placeholder="Repetir Password"
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
