import React from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header/Header';
import useAuth from '../../hooks/useAuth';

export default function ClienteLayout() {

    useAuth({middleware: 'auth'});

    return (
        <div className='layout'>
            <Header />
            <main className='main__admin-layout'>
            <section className='section__admin-layout'>
                <Outlet />
            </section>
            </main>
        </div>
    )
}
