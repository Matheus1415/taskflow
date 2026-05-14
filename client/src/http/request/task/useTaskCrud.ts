import { DEFAULT_API_ERROR } from "@/http/responses/default";
import type { ApiError } from "@/http/types/ApiErro";
import type { ApiSuccess } from "@/http/types/ApiSuccess";
import { Api } from "@/lib/axios/api";
import type { Task } from "@/types/task";
import { AxiosError } from "axios";
import { mutate } from "swr";

export function useTaskCrud() {
  const URL_BASE = "/tasks";

  async function taskCreate(data: Partial<Task>): Promise<ApiSuccess<Task>> {
    try {
      const response = await Api.post<ApiSuccess<Task>>(URL_BASE, data);
      
      mutate((key) => typeof key === 'string' && key.startsWith(URL_BASE));
      
      return response.data;
    } catch (error) {
      const apiError =
        (error as AxiosError<ApiError>).response?.data ?? DEFAULT_API_ERROR;
      throw apiError;
    }
  }

  async function taskEdit(
    id: number | string,
    data: Partial<Task>
  ): Promise<ApiSuccess<Task>> {
    const URL_DETAILS = `${URL_BASE}/${id}`;

    try {
      const response = await Api.put<ApiSuccess<Task>>(URL_DETAILS, data);

      mutate((key) => typeof key === 'string' && key.startsWith(URL_BASE));

      return response.data;
    } catch (error) {
      const apiError =
        (error as AxiosError<ApiError>).response?.data ?? DEFAULT_API_ERROR;
      throw apiError;
    }
  }

  async function taskDelete(id: number | string): Promise<ApiSuccess<void>> {
    const URL_DELETE = `${URL_BASE}/${id}`;

    try {
      const response = await Api.delete<ApiSuccess<void>>(URL_DELETE);

      mutate((key) => typeof key === 'string' && key.startsWith(URL_BASE));

      return response.data;
    } catch (error) {
      const apiError =
        (error as AxiosError<ApiError>).response?.data ?? DEFAULT_API_ERROR;
      throw apiError;
    }
  }

  return { taskCreate, taskEdit, taskDelete };
}