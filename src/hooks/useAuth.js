import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import Axios from '../config/axios';

// Custom hook para manejar la lógica de autenticación
const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const { data:user, error, mutate } = useSWR('/api/user', () => 
        Axios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors);
        })
    );

    const login = async (datos, setErrores) => {
        try {
            const { data } = await Axios.post('/api/iniciar-sesion', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();

        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await Axios.post('/api/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async () => {
        try {
            await Axios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);
        } catch (error) {
            throw Error(error?.response?.data?.errors);
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url);
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login');
        }
    },[user, error]);

    return {
        login,
        registro,
        logout,
        user,
        error
    }
};

export default useAuth;
