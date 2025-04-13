import client from '@kubb/plugin-client/clients/axios'
import type { PostTasksMutationRequest, PostTasksMutationResponse, PostTasks422 } from '../../types/tasks/post-tasks-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postTasksMutationKey = () => [{ url: '/tasks' }] as const

export type PostTasksMutationKey = ReturnType<typeof postTasksMutationKey>

/**
 * @description You can create tasks for a user
 * @summary Create a task
 * {@link /tasks}
 */
export async function postTasks(data: PostTasksMutationRequest, config: Partial<RequestConfig<PostTasksMutationRequest>> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostTasksMutationResponse, ResponseErrorConfig<PostTasks422>, PostTasksMutationRequest>({
    method: 'POST',
    url: `/tasks`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description You can create tasks for a user
 * @summary Create a task
 * {@link /tasks}
 */
export function usePostTasks<TContext>(
  options: {
    mutation?: UseMutationOptions<PostTasksMutationResponse, ResponseErrorConfig<PostTasks422>, { data: PostTasksMutationRequest }, TContext> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig<PostTasksMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postTasksMutationKey()

  return useMutation<PostTasksMutationResponse, ResponseErrorConfig<PostTasks422>, { data: PostTasksMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return postTasks(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}