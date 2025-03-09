import { createContext, useState } from "react";
import { categorias as categoriasDB} from '../data/categorias'

const UmamyContext = createContext();

const UmamyProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto , setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    
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

    return (
        <UmamyContext.Provider
            value={{
                categorias,
                categoriaActual,
                modal,
                producto,
                pedido,
                handleClickCategoria,
                handleClickModal,
                handleSetProducto,
                handleAgregarPedido,
                handleEditarCantidad
            }}
        >
            {children}
        </UmamyContext.Provider>
    )
}

export { 
    UmamyProvider, UmamyContext 
};