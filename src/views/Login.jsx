import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertaErroresFormulario from '../components/AlertaErroresFormulario/AlertaErroresFormulario';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Login() {

  const [errores, setErrores] = useState();

  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Esquema de validación con Yup
  const validacion = Yup.object({
    email: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Za-z]/, 'La contraseña debe contener al menos una letra')
      .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
      .matches(/[\W_]/, 'La contraseña debe contener al menos un símbolo')
      .required('La contraseña es obligatoria'),
  });

  // Usamos react-hook-form con yupResolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacion),
    mode: 'onBlur',
  });

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = async (data) => {
    login(data, setErrores); // Usamos los datos validados
  };

  return (
    <>
      <h1>Iniciar sesión</h1>
      <div className="formulario-contenedor">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <input
              type="email"
              id="email"
              className="formulario-input"
              name="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <AlertaErroresFormulario>{errors.email.message}</AlertaErroresFormulario>}
          </div>

          <div className="formulario-apartado">
            <input
              type="password"
              id="password"
              className="formulario-input"
              name="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && <AlertaErroresFormulario>{errors.password.message}</AlertaErroresFormulario>}
          </div>

          <button className="formulario-boton">
            Iniciar sesión
          </button>
        </form>
      </div>
      <nav className="enlace-registro">
        No tienes cuenta? <Link to="/auth/registro">Regístrate</Link>
      </nav>
    </>
  );
}
