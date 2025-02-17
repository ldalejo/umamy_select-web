import React from 'react'
import Categoria from '../Categoria/Categoria'

import { categorias } from '../../data/categorias'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className=''>
        {/*<section className='menu__aside'>
            {categorias.map( categoria => (
                <Categoria 
                    categoria={categoria}
                />
            ))}
        </section>*/}
        <nav className="menu">
            <ul className="menu__list">
                {categorias.map( categoria => (
                    <Categoria 
                        categoria={categoria}
                    />
                ))}
            </ul>
        </nav>
{/*         <section>
            <button
                className='aside__boton-cerrarsesion'
                type='button'
            >
                Cerrar sesión
            </button>
        </section> */}
    </aside>
  )
}
