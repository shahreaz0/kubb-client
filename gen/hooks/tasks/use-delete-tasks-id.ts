import client from '@/lib/axios'
import type { DeleteTasksIdMutationResponse, DeleteTasksIdPathParams, DeleteTasksId404, DeleteTasksId422 } from '../../types/tasks/delete-tasks-id-type.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/axios'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteTasksIdMutationKey = () => [{ url: '/tasks/{id}' }] as const

export type DeleteTasksIdMutationKey = ReturnType<typeof deleteTasksIdMutationKey>

/**
 * @description Delete a task of a user
 * @summary Delete a task
 * {@link /tasks/:id}
 */
export async function deleteTasksId(id: DeleteTasksIdPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteTasksIdMutationResponse, ResponseErrorConfig<DeleteTasksId404 | DeleteTasksId422>, unknown>({
    method: 'DELETE',
    url: `/tasks/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Delete a task of a user
 * @summary Delete a task
 * {@link /tasks/:id}
 */
export function useDeleteTasksId<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteTasksIdMutationResponse,
      ResponseErrorConfig<DeleteTasksId404 | DeleteTasksId422>,
      { id: DeleteTasksIdPathParams['id'] },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteTasksIdMutationKey()

  return useMutation<DeleteTasksIdMutationResponse, ResponseErrorConfig<DeleteTasksId404 | DeleteTasksId422>, { id: DeleteTasksIdPathParams['id'] }, TContext>(
    {
      mutationFn: async ({ id }) => {
        return deleteTasksId(id, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}