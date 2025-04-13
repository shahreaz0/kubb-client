import type { Task } from '../task-type.ts'

export type PatchTasksIdPathParams = {
  /**
   * @type number
   */
  id: number | null
}

/**
 * @description successful operation
 */
export type PatchTasksId200 = {
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
export type PatchTasksId404 = {
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
 * @description invalid body
 */
export type PatchTasksId422 =
  | {
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
  | {
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
 * @description body
 */
export type PatchTasksIdMutationRequest = {
  /**
   * @minLength 1
   * @maxLength 255
   * @type string | undefined
   */
  name?: string
  /**
   * @type boolean | undefined
   */
  done?: boolean
}

export type PatchTasksIdMutationResponse = PatchTasksId200

export type PatchTasksIdMutation = {
  Response: PatchTasksId200
  Request: PatchTasksIdMutationRequest
  PathParams: PatchTasksIdPathParams
  Errors: PatchTasksId404 | PatchTasksId422
}