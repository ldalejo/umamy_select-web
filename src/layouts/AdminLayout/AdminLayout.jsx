import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import useAuth from '../../hooks/useAuth';

import './AdminLayout.css'

export default function AdminLayout() {

    useAuth({middleware: 'admin'});

    return (
        <div className='layout'>
            <AdminHeader />
            <main className='main__layout'>
            <section className='section__layout'>
                <Outlet />
            </section>
            </main>
        </div>
    )
}
