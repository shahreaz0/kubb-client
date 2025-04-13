import type { Task } from '../task-type.ts'

export const getTasksQueryParamsDoneEnum = {
  true: 'true',
  false: 'false',
} as const

export type GetTasksQueryParamsDoneEnum = (typeof getTasksQueryParamsDoneEnum)[keyof typeof getTasksQueryParamsDoneEnum]

export type GetTasksQueryParams = {
  /**
   * @type string | undefined
   */
  done?: GetTasksQueryParamsDoneEnum
}

/**
 * @description successful operation
 */
export type GetTasks200 = {
  /**
   * @type boolean
   */
  success: boolean
  /**
   * @type array
   */
  data: Task[]
}

export type GetTasksQueryResponse = GetTasks200

export type GetTasksQuery = {
  Response: GetTasks200
  QueryParams: GetTasksQueryParams
  Errors: any
}