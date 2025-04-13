import client from '@kubb/plugin-client/clients/axios'
import type { GetQueryResponse } from '../../types/index/get-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getSuspenseQueryKey = () => [{ url: '/' }] as const

export type GetSuspenseQueryKey = ReturnType<typeof getSuspenseQueryKey>

/**
 * @summary Health Check
 * {@link /}
 */
export async function getSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/`, ...requestConfig })
  return res.data
}

export function getSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getSuspenseQueryKey()
  return queryOptions<GetQueryResponse, ResponseErrorConfig<Error>, GetQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSuspense(config)
    },
  })
}

/**
 * @summary Health Check
 * {@link /}
 */
export function useGetSuspense<TData = GetQueryResponse, TQueryData = GetQueryResponse, TQueryKey extends QueryKey = GetSuspenseQueryKey>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(getSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}