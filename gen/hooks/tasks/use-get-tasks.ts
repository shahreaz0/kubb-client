import client from '@/lib/axios'
import type { GetTasksQueryResponse, GetTasksQueryParams } from '../../types/tasks/get-tasks-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getTasksQueryKey = (params?: GetTasksQueryParams) => [{ url: '/tasks' }, ...(params ? [params] : [])] as const

export type GetTasksQueryKey = ReturnType<typeof getTasksQueryKey>

/**
 * @description Get all the tasks of a user
 * @summary Get task list
 * {@link /tasks}
 */
export async function getTasks(params?: GetTasksQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetTasksQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/tasks`, params, ...requestConfig })
  return res.data
}

export function getTasksQueryOptions(params?: GetTasksQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getTasksQueryKey(params)
  return queryOptions<GetTasksQueryResponse, ResponseErrorConfig<Error>, GetTasksQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getTasks(params, config)
    },
  })
}

/**
 * @description Get all the tasks of a user
 * @summary Get task list
 * {@link /tasks}
 */
export function useGetTasks<TData = GetTasksQueryResponse, TQueryData = GetTasksQueryResponse, TQueryKey extends QueryKey = GetTasksQueryKey>(
  params?: GetTasksQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetTasksQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getTasksQueryKey(params)

  const query = useQuery(
    {
      ...(getTasksQueryOptions(params, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}