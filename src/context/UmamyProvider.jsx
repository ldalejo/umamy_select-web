import { createContext, useState, useEffect } from "react";
import { categorias as categoriasDB} from '../data/categorias'

const UmamyContext = createContext();

const UmamyProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto , setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    /* Cada vez que el pedido se modifique, se actualiza el montante total */
    useEffect(() => {
        handleEditarTotal();
    },[pedido])
    
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
            
        } else {
            setPedido([...pedido, producto]);
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
    }

    const handleEditarTotal = () => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal);
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
                handleClickCategoria,
                handleClickModal,
                handleSetProducto,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido
            }}
        >
            {children}
        </UmamyContext.Provider>
    )
}

export { 
    UmamyProvider, UmamyContext 
};