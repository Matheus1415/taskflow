import type { UserAccount } from "@/@types/UserAccount";
import { useAuthContext } from "@/contexts/AuthContext/hook";
import { DEFAULT_API_ERROR } from "@/http/responses/default";
import type { ApiError } from "@/http/types/ApiErro";
import type { ApiSuccess } from "@/http/types/ApiSuccess";
import { Api } from "@/lib/axios/api";
import { AxiosError } from "axios";
import { mutate } from "swr";


export function useDeleteMe (){
    const {actions:{logout}} = useAuthContext()

    async function deleteMe(): Promise<ApiSuccess<UserAccount>> {
        let URL = '/me';

        try {
            const response = await Api.delete<ApiSuccess<UserAccount>>(URL)
    
            mutate('/me');
            logout();
            return response.data;
        } catch (error) {
            const apiErro = (error as AxiosError<ApiError>).response?.data ?? DEFAULT_API_ERROR;
            throw apiErro;
        }
    }

    return {deleteMe}
}