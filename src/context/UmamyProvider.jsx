import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Axios from '../config/axios';

const UmamyContext = createContext();

const UmamyProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto , setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [disabled, setDisabled] = useState(false);

    /* Cada vez que el pedido se modifique, se actualiza el montante total */
    useEffect(() => {
        handleEditarTotal();
    },[pedido])

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const {data} = await Axios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    /* const obtenerProductos = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const {data} = await Axios('/api/productos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        } catch (error) {
            console.log(error);
        }
    } */
    
    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria);
    }

    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleSetProducto = (producto) => {
        setProducto(producto);
    }

    const handleAgregarPedido = (producto) => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado);
            toast.success('Producto actualizado.')
            
        } else {
            setPedido([...pedido, producto]);
            toast.success('Producto añadido.');
        }
        setModal(!modal);
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0];
        setProducto(productoActualizar);
        handleClickModal();
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado);
        toast.error('Producto eliminado.')
    }

    const handleSubmitNuevoPedido = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const { data } = await Axios.post('/api/pedidos/guardar-pedido', {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(data.message);
            setTimeout(() => {
                setPedido([]);
            }, 1000);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditarTotal = () => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal);
    }

    const handleCompletarPedido = async (id) => {
        setDisabled(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await Axios.put(`/api/pedidos/actualizar-pedido/${id}`, 
                null, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
        } catch (error) {
            console.log(error.response);
        }
        setDisabled(false);
    }

    const handleDisponibilidadProducto = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await Axios.put(`/api/productos/actualizar-producto/${id}`, 
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleCobrarPedido = async (id) => {
        setDisabled(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await Axios.put(`/api/pedidos/cobrar-pedido/${id}`, 
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
        } catch (error) {
            console.log(error.response);
        }
        setDisabled(false);
    }

    const handleDatosUsuarioSubmit = async (id, datosUsuario) => {
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const { data } = await Axios.put(`/api/actualizar-datos-usuario/${id}`, {
                datosUsuario
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(data.message);

        } catch (error) {
            console.log(error);
        }
    }

    const handleAnadirProductoSubmit = async (datosProducto, reset) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await Axios.post('/api/producto/anadir-producto', datosProducto,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        toast.success(data.message);
        reset();

        } catch (error) {
            console.log(error);
        }
    }

    /* const fetcher = () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        Axios.get('/api/productos', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    } */
        

    const handleEliminarProducto = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!window.confirm('Estás seguro de eliminar este producto?')) {
            return;
        }

        console.log(id)

        try {
            const { data } = await Axios.delete(`/api/producto/eliminar-producto/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            toast.success(data.message);

            // Actualizamos la lista de productos
            // fetcher();

        } catch (error) {
            console.log(error);
        }
    }    

    return (
        <UmamyContext.Provider
            value={{
                categorias,
                categoriaActual,
                modal,
                producto,
                pedido,
                total,
                disabled,
                handleClickCategoria,
                handleClickModal,
                handleSetProducto,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                handleSubmitNuevoPedido,
                handleCompletarPedido,
                handleDisponibilidadProducto,
                handleCobrarPedido,
                handleDatosUsuarioSubmit,
                handleAnadirProductoSubmit,
                handleEliminarProducto
            }}
        >
            {children}
        </UmamyContext.Provider>
    )
}

export { 
    UmamyProvider, UmamyContext 
};