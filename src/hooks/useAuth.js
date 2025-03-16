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
            throw Error(error?.response?.data?.errors)
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

    const registro = async() => {
        try {
            const { data } = await Axios.post('/api/registro', datos);

            console.log(data.token);
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = () => {

    }

    console.log(user);
    console.log(error);

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url);
        }
    },[user, error]);

    return {
        login,
        registro,
        logout
    }
};

export default useAuth;
