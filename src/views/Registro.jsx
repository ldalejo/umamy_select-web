import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertaErroresFormulario from '../components/AlertaErroresFormulario/AlertaErroresFormulario';
import useAuth from '../hooks/useAuth';

export default function Registro() {

  const [errores, setErrores] = useState();
  const [disabled, setDisabled] = useState(false);
  const [valueButton, setValueButton] = useState('Confirmar');

  const { registro } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  // Esquema de validación con Yup
  const validacion = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Za-z]/, 'La contraseña debe contener al menos una letra')
      .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
      .matches(/[\W_]/, 'La contraseña debe contener al menos un símbolo')
      .required('La contraseña es obligatoria'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La confirmación de la contraseña es obligatoria'),
  });

  // Usamos react-hook-form con yupResolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validacion),
    mode: 'onBlur',
  });

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = async (data) => {
    setDisabled(true);
    setValueButton('Registrando...');
    const datos = {
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    };
    
    // Realizamos el registro
    registro(datos, setErrores);
  };

  return (
    <>
      <h1>Crear cuenta</h1>
      <div className="formulario-contenedor">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {
            errores 
            ? errores.map(error => 
                <AlertaErroresFormulario key={error}>{error}</AlertaErroresFormulario>
              ) 
            : null
          }

          {/* Campo Nombre */}
          <div className="formulario-apartado">
            <input
              type="text"
              id="nombre"
              className="formulario-input"
              name="nombre"
              placeholder="Nombre"
              {...register('nombre')}
            />
            {errors.nombre && <AlertaErroresFormulario>{errors.nombre.message}</AlertaErroresFormulario>}
          </div>

          {/* Campo Email */}
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

          {/* Campo Password */}
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

          {/* Campo Confirmación de Password */}
          <div className="formulario-apartado">
            <input
              type="password"
              id="confirmacion_password"
              className="formulario-input"
              name="confirmacion_password"
              placeholder="Repetir Password"
              {...register('password_confirmation')}
            />
            {errors.password_confirmation && <AlertaErroresFormulario>{errors.password_confirmation.message}</AlertaErroresFormulario>}
          </div>

          <button 
            className='formulario-boton'
            disabled={disabled}    
        >
            {valueButton}
          </button>
        </form>
      </div>

      <nav className='enlace-registro'>
        ¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión</Link>
      </nav>
    </>
  );
}