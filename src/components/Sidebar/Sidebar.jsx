import React from 'react'
import useUmamy from '../../hooks/useUmamy';
import Categoria from '../Categoria/Categoria'

import './Sidebar.css'

export default function Sidebar() {

  const {categorias} = useUmamy();
  
  return (
    <div className='menu-container'>
      <aside className='menu'>
        <nav className='menu__contenido'>
          <ul className='menu__list'>
            {categorias.map((categoria) => (
              <Categoria key={categoria.id} categoria={categoria} />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
