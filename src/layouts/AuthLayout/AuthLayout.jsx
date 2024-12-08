import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <main>
        <img 
            src="../../../img/logo3_umamyfood.svg" 
            alt="logo umamy food"
            className='logo'
        />
        <div className='formulario'>
          <Outlet />
        </div>
    </main>
  )
}
