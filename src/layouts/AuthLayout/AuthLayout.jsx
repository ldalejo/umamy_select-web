import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <main className='main-authlayout'>
        <img 
            src="../../../img/logo_umamyfood.svg" 
            alt="logo umamy food"
            className='logo'
        />
        <div className='formulario'>
          <Outlet />
        </div>
    </main>
  )
}
