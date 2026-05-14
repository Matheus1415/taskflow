import type { UserAccount } from "@/types/UserAccount";
import type { ApiError } from "@/http/types/ApiErro";
import type { ApiSuccess } from "@/http/types/ApiSuccess";
import useSWR from "swr";
import { LocalStorageWrapper } from "@/utils/LocalStorage";

export function useMe (){
    const token = LocalStorageWrapper.get('auth_token');

    const {data, error, isLoading} = useSWR<ApiSuccess<UserAccount>, ApiError>(token ? '/me' : null, {
        refreshInterval: 3000000,
        revalidateOnFocus: false,
        shouldRetryOnError: false
    })

    return {
        user: data?.data.user,
        response: data,
        error,
        isLoading
    }
}
