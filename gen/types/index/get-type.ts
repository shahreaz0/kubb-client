/**
 * @description Health Check API
 */
export type Get200 = {
  /**
   * @type string
   */
  message: string
}

export type GetQueryResponse = Get200

export type GetQuery = {
  Response: Get200
  Errors: any
}