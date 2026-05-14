import type { UserAccount } from "@/types/UserAccount"
import { DEFAULT_API_ERROR } from "@/http/responses/default"
import type { ApiError } from "@/http/types/ApiErro"
import type { ApiSuccess } from "@/http/types/ApiSuccess"
import { Api } from "@/lib/axios/api"
import { AxiosError } from "axios"

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    user: UserAccount,
    token: string,
}

export function useLogin (){
    async function login(data: LoginRequest): Promise<ApiSuccess<LoginResponse>> {
        try {
            const response = await Api.post<ApiSuccess<LoginResponse>>('/login', data)
    
            return response.data;
        } catch (error) {
            
            const apiErro = (error as AxiosError<ApiError>).response?.data ?? DEFAULT_API_ERROR;
            throw apiErro;
        }
    }

    return {login}
}