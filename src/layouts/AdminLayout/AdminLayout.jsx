import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import useAuth from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';

import './AdminLayout.css'

export default function AdminLayout() {

    useAuth({middleware: 'admin'});

    return (
        <div className='layout'>
            <AdminHeader />
            <main className='main__admin-layout'>
            <section className='section__admin-layout'>
                <Outlet />
                <ToastContainer />
            </section>
            </main>
        </div>
    )
}
