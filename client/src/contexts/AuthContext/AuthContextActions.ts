import React from "react";
import type { Actions } from "./types";
import { useLogin, type LoginRequest } from "@/http/request/auth/useLogin";
import type { UserAccount } from "@/types/UserAccount";
import { LocalStorageWrapper } from "@/utils/LocalStorage";
import { mutate } from "swr";

export function AuthContextActions(dispatch: React.Dispatch<Actions>) {
    const { login: apiLogin } = useLogin();

    return {
        login: async (data: LoginRequest) => {
            //A requisição foi movida para aqui pois não um reducer não pode retornar promises promises (nesse caso a requisição)
            try {
                const response = await apiLogin(data);
                
                const encryptedUser = JSON.stringify(response.data.user);
                
                //Salvando os dados no localStorage
                LocalStorageWrapper.set('auth_token', response.data.token);
                LocalStorageWrapper.set('user', encryptedUser);

                dispatch({
                    type: "LOGIN",
                    payload: {
                        user: response.data.user,
                    }
                });

                void mutate('/me');
            } catch (error) {
                
                dispatch({
                    type: "LOGOUT"
                });

                throw error
            }
        },

        refreshUser: (user: UserAccount) => {
            dispatch({ 
                type: 'REFRESH_USER', 
                payload: {
                    user: user
                }
            })
        },

        logout: () => {
            void mutate('/me', undefined, { revalidate: false });
            dispatch({ type: 'LOGOUT'})
        }
    }
}
