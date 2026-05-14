import { LocalStorageWrapper } from "@/utils/LocalStorage";
import { getOldAuthData } from "./InitialState";
import type { Actions, AuthContextState } from "./types";

export const initialState: AuthContextState = getOldAuthData()

export function AuthContextReducer (state: AuthContextState, action: Actions): AuthContextState {

    switch (action.type){
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload.user,
                isLoading: false
            }
        
        case 'LOGOUT':
            LocalStorageWrapper.remove('auth_token')
            LocalStorageWrapper.remove('user')
            LocalStorageWrapper.remove('role')

            return {
                isAuthenticated: false,
                user: undefined,
                isLoading: false
            }

        case 'REFRESH_USER':
            const encryptedUser = JSON.stringify(action.payload.user);
                
            //Salvando os dados no localStorage
            LocalStorageWrapper.set('user', encryptedUser);

            return {
                isAuthenticated: true,
                user: action.payload.user,
                isLoading: false
            }
            
        default: 
            return state
    } 

}