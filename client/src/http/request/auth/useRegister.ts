import type { UserAccount } from "@/types/UserAccount"
import { DEFAULT_API_ERROR } from "@/http/responses/default"
import type { ApiError } from "@/http/types/ApiErro"
import type { ApiSuccess } from "@/http/types/ApiSuccess"
import { Api } from "@/lib/axios/api"
import { AxiosError } from "axios"

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type RegisterResponse = {
    user: UserAccount;
    token: string;
}

export function useRegister() {
    async function register(data: RegisterRequest): Promise<ApiSuccess<RegisterResponse>> {
        try {
            const response = await Api.post<ApiSuccess<RegisterResponse>>('/register', data);
            return response.data;
        } catch (error) {
            const apiErro = (error as AxiosError<ApiError>).response?.data ?? DEFAULT_API_ERROR;
            throw apiErro;
        }
    }

    return { register };
}