import { useContext } from "react";
import { UmamyContext } from "../context/UmamyProvider";

// Custom hook para acceder a la información de manera global
const useUmamy = () => {
    const context = useContext(UmamyContext);

    return context;
};

export default useUmamy;