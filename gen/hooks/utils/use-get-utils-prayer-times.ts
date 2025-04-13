import client from '@kubb/plugin-client/clients/axios'
import type { GetUtilsPrayerTimesQueryResponse, GetUtilsPrayerTimesQueryParams, GetUtilsPrayerTimes404 } from '../../types/utils/get-utils-prayer-times-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUtilsPrayerTimesQueryKey = (params: GetUtilsPrayerTimesQueryParams) => [{ url: '/utils/prayer-times' }, ...(params ? [params] : [])] as const

export type GetUtilsPrayerTimesQueryKey = ReturnType<typeof getUtilsPrayerTimesQueryKey>

/**
 * @description Get today's prayer times
 * @summary Get today's prayer times
 * {@link /utils/prayer-times}
 */
export async function getUtilsPrayerTimes(params: GetUtilsPrayerTimesQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUtilsPrayerTimesQueryResponse, ResponseErrorConfig<GetUtilsPrayerTimes404>, unknown>({
    method: 'GET',
    url: `/utils/prayer-times`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function getUtilsPrayerTimesQueryOptions(params: GetUtilsPrayerTimesQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getUtilsPrayerTimesQueryKey(params)
  return queryOptions<GetUtilsPrayerTimesQueryResponse, ResponseErrorConfig<GetUtilsPrayerTimes404>, GetUtilsPrayerTimesQueryResponse, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUtilsPrayerTimes(params, config)
    },
  })
}

/**
 * @description Get today's prayer times
 * @summary Get today's prayer times
 * {@link /utils/prayer-times}
 */
export function useGetUtilsPrayerTimes<
  TData = GetUtilsPrayerTimesQueryResponse,
  TQueryData = GetUtilsPrayerTimesQueryResponse,
  TQueryKey extends QueryKey = GetUtilsPrayerTimesQueryKey,
>(
  params: GetUtilsPrayerTimesQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetUtilsPrayerTimesQueryResponse, ResponseErrorConfig<GetUtilsPrayerTimes404>, TData, TQueryData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUtilsPrayerTimesQueryKey(params)

  const query = useQuery(
    {
      ...(getUtilsPrayerTimesQueryOptions(params, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<GetUtilsPrayerTimes404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}