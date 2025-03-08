import { createContext, useState } from "react";
import { categorias as categoriasDB} from '../data/categorias'

const UmamyContext = createContext();

const UmamyProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    
    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria);

        console.log(categoria);
    }

    return (
        <UmamyContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria
            }}
        >
            {children}
        </UmamyContext.Provider>
    )
}

export { 
    UmamyProvider, UmamyContext 
};