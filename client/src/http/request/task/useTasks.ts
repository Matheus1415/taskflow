import useSWR from "swr";
import { LocalStorageWrapper } from "@/utils/LocalStorage";
import type { ApiError } from "@/http/types/ApiErro";
import type { ApiSuccess } from "@/http/types/ApiSuccess";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";

const EMPTY_TASKS: Task[] = [];

export interface TaskFilters {
  page?: number;
  per_page?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string;
  trashed?: 'active' | 'only' | 'with';
}

interface TasksResponseData {
  items: Task[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    has_more_pages: boolean;
  };
}

export function useTasks(filters: TaskFilters = {}) {
  const token = LocalStorageWrapper.get('auth_token');

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  const endpoint = token ? `/tasks${queryString ? `?${queryString}` : ''}` : null;

  const { data, error, isLoading, mutate } = useSWR<ApiSuccess<TasksResponseData>, ApiError>(
    endpoint,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  return {
    tasks: data?.data.items ?? EMPTY_TASKS,
    pagination: data?.data.pagination,
    response: data,
    error,
    isLoading,
    refresh: mutate,
  };
}
