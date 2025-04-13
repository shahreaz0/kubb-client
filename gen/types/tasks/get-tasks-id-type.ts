import type { Task } from '../task-type.ts'

export type GetTasksIdPathParams = {
  /**
   * @type number
   */
  id: number | null
}

/**
 * @description successful operation
 */
export type GetTasksId200 = {
  /**
   * @type boolean
   */
  success: boolean
  /**
   * @type object
   */
  data: Task
}

/**
 * @description not found
 */
export type GetTasksId404 = {
  /**
   * @type boolean
   */
  success: boolean
  /**
   * @type string
   */
  message: string
}

/**
 * @description invalid path params
 */
export type GetTasksId422 = {
  /**
   * @type boolean
   */
  success: boolean
  /**
   * @type object
   */
  error: {
    /**
     * @type array
     */
    issues: {
      /**
       * @type string
       */
      code: string
      /**
       * @type array
       */
      path: (string | number)[]
      /**
       * @type string | undefined
       */
      message?: string
    }[]
    /**
     * @type string
     */
    name: string
  }
}

export type GetTasksIdQueryResponse = GetTasksId200

export type GetTasksIdQuery = {
  Response: GetTasksId200
  PathParams: GetTasksIdPathParams
  Errors: GetTasksId404 | GetTasksId422
}