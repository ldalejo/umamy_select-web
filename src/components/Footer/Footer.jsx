import React from 'react'
import { IoLogoGithub } from "react-icons/io";

import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
            <section className='footer__info'>
                <p>&copy; Es una aplicación web en desarollo.</p>
                <a 
                    href='https://github.com/ldalejo' 
                    target='_blank' 
                    className='footer__icono-social' 
                    aria-label='Visitar repositorio de GitHub'
                >
                    <IoLogoGithub />
                </a>
            </section>
    </footer>
  )
}
