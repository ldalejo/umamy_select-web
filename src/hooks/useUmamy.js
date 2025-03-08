import { useContext } from "react";
import { UmamyContext } from "../context/UmamyProvider";

const useUmamy = () => {
    const context = useContext(UmamyContext);

    return context;
};

export default useUmamy;