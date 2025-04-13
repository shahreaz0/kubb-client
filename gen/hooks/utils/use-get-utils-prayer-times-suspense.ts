import client from '@kubb/plugin-client/clients/axios'
import type { GetUtilsPrayerTimesQueryResponse, GetUtilsPrayerTimesQueryParams, GetUtilsPrayerTimes404 } from '../../types/utils/get-utils-prayer-times-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getUtilsPrayerTimesSuspenseQueryKey = (params: GetUtilsPrayerTimesQueryParams) =>
  [{ url: '/utils/prayer-times' }, ...(params ? [params] : [])] as const

export type GetUtilsPrayerTimesSuspenseQueryKey = ReturnType<typeof getUtilsPrayerTimesSuspenseQueryKey>

/**
 * @description Get today's prayer times
 * @summary Get today's prayer times
 * {@link /utils/prayer-times}
 */
export async function getUtilsPrayerTimesSuspense(params: GetUtilsPrayerTimesQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUtilsPrayerTimesQueryResponse, ResponseErrorConfig<GetUtilsPrayerTimes404>, unknown>({
    method: 'GET',
    url: `/utils/prayer-times`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function getUtilsPrayerTimesSuspenseQueryOptions(
  params: GetUtilsPrayerTimesQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getUtilsPrayerTimesSuspenseQueryKey(params)
  return queryOptions<GetUtilsPrayerTimesQueryResponse, ResponseErrorConfig<GetUtilsPrayerTimes404>, GetUtilsPrayerTimesQueryResponse, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUtilsPrayerTimesSuspense(params, config)
    },
  })
}

/**
 * @description Get today's prayer times
 * @summary Get today's prayer times
 * {@link /utils/prayer-times}
 */
export function useGetUtilsPrayerTimesSuspense<
  TData = GetUtilsPrayerTimesQueryResponse,
  TQueryData = GetUtilsPrayerTimesQueryResponse,
  TQueryKey extends QueryKey = GetUtilsPrayerTimesSuspenseQueryKey,
>(
  params: GetUtilsPrayerTimesQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetUtilsPrayerTimesQueryResponse, ResponseErrorConfig<GetUtilsPrayerTimes404>, TData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUtilsPrayerTimesSuspenseQueryKey(params)

  const query = useSuspenseQuery(
    {
      ...(getUtilsPrayerTimesSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetUtilsPrayerTimes404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}