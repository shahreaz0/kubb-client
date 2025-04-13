import type { Task } from '../task-type.ts'

/**
 * @description successful operation
 */
export type PostTasks200 = {
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
 * @description invalid body
 */
export type PostTasks422 = {
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

/**
 * @description The task to create
 */
export type PostTasksMutationRequest = {
  /**
   * @minLength 1
   * @maxLength 255
   * @type string
   */
  name: string
  /**
   * @type boolean | undefined
   */
  done?: boolean
}

export type PostTasksMutationResponse = PostTasks200

export type PostTasksMutation = {
  Response: PostTasks200
  Request: PostTasksMutationRequest
  Errors: PostTasks422
}