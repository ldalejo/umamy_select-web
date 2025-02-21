import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Pedido from '../../components/Pedido/Pedido'
import Header from '../../components/Header/Header'

import './Layout.css'

export default function Layout() {
  return (
    <div className='layout'>
        <Header />
        <main className='main__layout'>
          <section className='section__layout'>
            <Outlet />
          </section>
          <Pedido />
        </main>
    </div>
  )
}
