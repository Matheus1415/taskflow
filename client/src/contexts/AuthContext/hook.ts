import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('O Contexto não pode ser usado neste componente')
    }

    return context
}