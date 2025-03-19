import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout/Layout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Inicio from './views/Inicio/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import AdminPedidos from './views/AdminPedidos/AdminPedidos';
import AdminProductos from './views/AdminProductos/AdminProductos';
import AdminPedidosCompletados from './views/AdminPedidosCompletados/AdminPedidosCompletados';
import HistorialPedidos from './views/HistorialPedidos/HistorialPedidos';
import ClienteLayout from './layouts/ClienteLayout/ClienteLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/',
        element: <ClienteLayout />,
        children: [
            {
                path: '/historial-pedidos/:usuario_id',
                element: <HistorialPedidos/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPedidos />
            },
            {
                path: '/admin/completados',
                element: <AdminPedidosCompletados />
            },
            {
                path: '/admin/productos',
                element: <AdminProductos />
            }
        ]
    }
])

export default router;