import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import useAuth from '../../hooks/useAuth';

export default function AdminLayout() {

    useAuth({middleware: 'admin'});

    return (
        <div className='layout'>
            <AdminHeader />
            <main className=''>
            <section className=''>
                <Outlet />
            </section>
            </main>
        </div>
    )
}
