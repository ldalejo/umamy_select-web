import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pedido from '../../components/Pedido/Pedido';
import Header from '../../components/Header/Header';
import ModalProducto from '../../components/ModalProducto/ModalProducto';
import './Layout.css';

import useUmamy from '../../hooks/useUmamy';
import useAuth from '../../hooks/useAuth';

// Establece el elemento principal para mejorar la accesibilidad y el manejo del foco en el modal.
Modal.setAppElement('#root');

export default function Layout() {

  useAuth({middleware: 'auth'});
  const { modal, handleClickModal } = useUmamy();

  return (
    <>
      <div className='layout'>
        <Header />
        <main className='main__layout'>
          <section className='section__layout'>
            <Outlet />
          </section>
          <Pedido />
        </main>
      </div>

      <Modal 
        isOpen={modal}
        className='modal'
        overlayClassName="modal-overlay"
      >
        <ModalProducto/>
        <button
          onClick={handleClickModal}
        >
        </button>
      </Modal>
      <ToastContainer />
    </>
  )
}
