import { createContext, useState } from "react";
import { categorias as categoriasDB} from '../data/categorias'

const UmamyContext = createContext();

const UmamyProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto , setProducto] = useState({});
    
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

    return (
        <UmamyContext.Provider
            value={{
                categorias,
                categoriaActual,
                modal,
                producto,
                handleClickCategoria,
                handleClickModal,
                handleSetProducto
            }}
        >
            {children}
        </UmamyContext.Provider>
    )
}

export { 
    UmamyProvider, UmamyContext 
};