export type DeleteTasksIdPathParams = {
  /**
   * @type number
   */
  id: number | null
}

/**
 * @description successful
 */
export type DeleteTasksId200 = {
  /**
   * @type boolean
   */
  success: boolean
  /**
   * @type object
   */
  data: {
    /**
     * @type number
     */
    id: number
  }
}

/**
 * @description not found
 */
export type DeleteTasksId404 = {
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
export type DeleteTasksId422 = {
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

export type DeleteTasksIdMutationResponse = DeleteTasksId200

export type DeleteTasksIdMutation = {
  Response: DeleteTasksId200
  PathParams: DeleteTasksIdPathParams
  Errors: DeleteTasksId404 | DeleteTasksId422
}