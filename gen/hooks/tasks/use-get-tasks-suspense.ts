import client from '@kubb/plugin-client/clients/axios'
import type { GetTasksQueryResponse, GetTasksQueryParams } from '../../types/tasks/get-tasks-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getTasksSuspenseQueryKey = (params?: GetTasksQueryParams) => [{ url: '/tasks' }, ...(params ? [params] : [])] as const

export type GetTasksSuspenseQueryKey = ReturnType<typeof getTasksSuspenseQueryKey>

/**
 * @description Get all the tasks of a user
 * @summary Get task list
 * {@link /tasks}
 */
export async function getTasksSuspense(params?: GetTasksQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetTasksQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/tasks`, params, ...requestConfig })
  return res.data
}

export function getTasksSuspenseQueryOptions(params?: GetTasksQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getTasksSuspenseQueryKey(params)
  return queryOptions<GetTasksQueryResponse, ResponseErrorConfig<Error>, GetTasksQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getTasksSuspense(params, config)
    },
  })
}

/**
 * @description Get all the tasks of a user
 * @summary Get task list
 * {@link /tasks}
 */
export function useGetTasksSuspense<TData = GetTasksQueryResponse, TQueryData = GetTasksQueryResponse, TQueryKey extends QueryKey = GetTasksSuspenseQueryKey>(
  params?: GetTasksQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetTasksQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getTasksSuspenseQueryKey(params)

  const query = useSuspenseQuery(
    {
      ...(getTasksSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}