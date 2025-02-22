import React from 'react'
import Categoria from '../Categoria/Categoria'

import { categorias } from '../../data/categorias'
import './Sidebar.css'

export default function Sidebar() {
  
  return (
    <div className="menu-container">
      <aside className="menu">
        <nav className="menu__contenido">
          <ul className="menu__list">
            {categorias.map((categoria) => (
              <Categoria key={categoria.id} categoria={categoria} />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
