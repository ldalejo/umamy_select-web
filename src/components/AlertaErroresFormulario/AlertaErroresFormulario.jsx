import React from 'react'
import './AlertaErroresFormulario.css'

export default function AlertaErroresFormulario({children}) {
  return (
    <p className='error__p'>
      {children}
    </p>
  )
}
