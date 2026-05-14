import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthContextReducer, initialState } from "./reducer";
import { AuthContextActions } from "./AuthContextActions";
import type { AuthContextState } from "./types";
import { useMe } from "@/http/request/auth/useMe";

interface AuthContextProps {
    state: AuthContextState,
    actions: ReturnType<typeof AuthContextActions>
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(AuthContextReducer, initialState);
    const actions = AuthContextActions(dispatch);

    const { user, isLoading: apiLoading, error } = useMe();

    useEffect(() => {
        // Se a API ainda está carregando, não tomamos decisões de logout/login
        if (apiLoading) return;

        if (error) {
            // Se a API retornou erro (ex: 401), limpamos o estado
            actions.logout();
        } else if (user) {
            // Se a API retornou o usuário, atualizamos o reducer
            actions.refreshUser(user);
        }
    }, [user, error, apiLoading]);

    const combinedState = {
        ...state,
        isLoading: apiLoading || state.isLoading
    };

    return (
        <AuthContext.Provider value={{ state: combinedState, actions }}>
            {children}
        </AuthContext.Provider>
    )
}