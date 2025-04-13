import client from '@kubb/plugin-client/clients/axios'
import type { GetQueryResponse } from '../../types/index/get-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getQueryKey = () => [{ url: '/' }] as const

export type GetQueryKey = ReturnType<typeof getQueryKey>

/**
 * @summary Health Check
 * {@link /}
 */
export async function get(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/`, ...requestConfig })
  return res.data
}

export function getQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getQueryKey()
  return queryOptions<GetQueryResponse, ResponseErrorConfig<Error>, GetQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return get(config)
    },
  })
}

/**
 * @summary Health Check
 * {@link /}
 */
export function useGet<TData = GetQueryResponse, TQueryData = GetQueryResponse, TQueryKey extends QueryKey = GetQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getQueryKey()

  const query = useQuery(
    {
      ...(getQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}