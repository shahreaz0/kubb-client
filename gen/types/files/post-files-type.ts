import type { File } from '../file-type.ts'

/**
 * @description successful operation
 */
export type PostFiles200 = {
  /**
   * @type string
   */
  url: string
}

/**
 * @description invalid body
 */
export type PostFiles422 = {
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
 * @description The file to upload
 */
export type PostFilesMutationRequest = File

export type PostFilesMutationResponse = PostFiles200

export type PostFilesMutation = {
  Response: PostFiles200
  Request: PostFilesMutationRequest
  Errors: PostFiles422
}