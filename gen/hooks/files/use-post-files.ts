import client from '@/lib/axios'
import type { PostFilesMutationRequest, PostFilesMutationResponse, PostFiles422 } from '../../types/files/post-files-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/axios'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postFilesMutationKey = () => [{ url: '/files' }] as const

export type PostFilesMutationKey = ReturnType<typeof postFilesMutationKey>

/**
 * @description You can upload a file to the server
 * @summary Upload a file
 * {@link /files}
 */
export async function postFiles(data: PostFilesMutationRequest, config: Partial<RequestConfig<PostFilesMutationRequest>> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || (value as Blob) instanceof Blob)) {
        formData.append(key, value as unknown as string)
      }
    })
  }
  const res = await request<PostFilesMutationResponse, ResponseErrorConfig<PostFiles422>, PostFilesMutationRequest>({
    method: 'POST',
    url: `/files`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @description You can upload a file to the server
 * @summary Upload a file
 * {@link /files}
 */
export function usePostFiles<TContext>(
  options: {
    mutation?: UseMutationOptions<PostFilesMutationResponse, ResponseErrorConfig<PostFiles422>, { data: PostFilesMutationRequest }, TContext> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig<PostFilesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postFilesMutationKey()

  return useMutation<PostFilesMutationResponse, ResponseErrorConfig<PostFiles422>, { data: PostFilesMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return postFiles(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}