import React from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useAuth from '../../hooks/useAuth';

import './ClienteLayout.css'

export default function ClienteLayout() {

    useAuth({middleware: 'auth'});

    return (
        <div className='layout-cliente'>
            <Header />
            <main className='main__cliente-layout'>
                <section className='section__cliente-layout'>
                    <Outlet />
                    <ToastContainer />
                </section>
            </main>
            <Footer />
        </div>
    )
}
