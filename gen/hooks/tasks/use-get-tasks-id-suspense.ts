import client from '@kubb/plugin-client/clients/axios'
import type { GetTasksIdQueryResponse, GetTasksIdPathParams, GetTasksId404, GetTasksId422 } from '../../types/tasks/get-tasks-id-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getTasksIdSuspenseQueryKey = (id: GetTasksIdPathParams['id']) => [{ url: '/tasks/:id', params: { id: id } }] as const

export type GetTasksIdSuspenseQueryKey = ReturnType<typeof getTasksIdSuspenseQueryKey>

/**
 * @description Get all the tasks of a user
 * @summary Get a task
 * {@link /tasks/:id}
 */
export async function getTasksIdSuspense(id: GetTasksIdPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetTasksIdQueryResponse, ResponseErrorConfig<GetTasksId404 | GetTasksId422>, unknown>({
    method: 'GET',
    url: `/tasks/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function getTasksIdSuspenseQueryOptions(id: GetTasksIdPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getTasksIdSuspenseQueryKey(id)
  return queryOptions<GetTasksIdQueryResponse, ResponseErrorConfig<GetTasksId404 | GetTasksId422>, GetTasksIdQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getTasksIdSuspense(id, config)
    },
  })
}

/**
 * @description Get all the tasks of a user
 * @summary Get a task
 * {@link /tasks/:id}
 */
export function useGetTasksIdSuspense<
  TData = GetTasksIdQueryResponse,
  TQueryData = GetTasksIdQueryResponse,
  TQueryKey extends QueryKey = GetTasksIdSuspenseQueryKey,
>(
  id: GetTasksIdPathParams['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetTasksIdQueryResponse, ResponseErrorConfig<GetTasksId404 | GetTasksId422>, TData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getTasksIdSuspenseQueryKey(id)

  const query = useSuspenseQuery(
    {
      ...(getTasksIdSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetTasksId404 | GetTasksId422>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}