import client from '@/lib/axios'
import type { GetTasksIdQueryResponse, GetTasksIdPathParams, GetTasksId404, GetTasksId422 } from '../../types/tasks/get-tasks-id-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getTasksIdQueryKey = (id: GetTasksIdPathParams['id']) => [{ url: '/tasks/:id', params: { id: id } }] as const

export type GetTasksIdQueryKey = ReturnType<typeof getTasksIdQueryKey>

/**
 * @description Get all the tasks of a user
 * @summary Get a task
 * {@link /tasks/:id}
 */
export async function getTasksId(id: GetTasksIdPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetTasksIdQueryResponse, ResponseErrorConfig<GetTasksId404 | GetTasksId422>, unknown>({
    method: 'GET',
    url: `/tasks/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function getTasksIdQueryOptions(id: GetTasksIdPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getTasksIdQueryKey(id)
  return queryOptions<GetTasksIdQueryResponse, ResponseErrorConfig<GetTasksId404 | GetTasksId422>, GetTasksIdQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getTasksId(id, config)
    },
  })
}

/**
 * @description Get all the tasks of a user
 * @summary Get a task
 * {@link /tasks/:id}
 */
export function useGetTasksId<TData = GetTasksIdQueryResponse, TQueryData = GetTasksIdQueryResponse, TQueryKey extends QueryKey = GetTasksIdQueryKey>(
  id: GetTasksIdPathParams['id'],
  options: {
    query?: Partial<QueryObserverOptions<GetTasksIdQueryResponse, ResponseErrorConfig<GetTasksId404 | GetTasksId422>, TData, TQueryData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getTasksIdQueryKey(id)

  const query = useQuery(
    {
      ...(getTasksIdQueryOptions(id, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<GetTasksId404 | GetTasksId422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}