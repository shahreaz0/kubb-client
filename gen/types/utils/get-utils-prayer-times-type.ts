export type GetUtilsPrayerTimesQueryParams = {
  /**
   * @type string, date
   */
  date: string
}

/**
 * @description successful operation
 */
export type GetUtilsPrayerTimes200 = {
  /**
   * @pattern ^(MON|TUES|WED|THURS|FRI|SAT|SUN)$
   * @type string
   */
  day: string
  /**
   * @minLength 1
   * @maxLength 31
   * @type integer
   */
  dateCE: number
  /**
   * @minLength 1
   * @maxLength 30
   * @type integer
   */
  dateAH: number
  /**
   * @type string
   */
  fajrImsak: string
  /**
   * @type string
   */
  sunrise: string
  /**
   * @type string
   */
  zuhr: string
  /**
   * @type string
   */
  asrShafi: string
  /**
   * @type string
   */
  asrHanafi: string
  /**
   * @type string
   */
  maghrib: string
  /**
   * @type string
   */
  isha: string
}

/**
 * @description not found
 */
export type GetUtilsPrayerTimes404 = {
  /**
   * @type boolean
   */
  success: boolean
  /**
   * @type string
   */
  message: string
}

export type GetUtilsPrayerTimesQueryResponse = GetUtilsPrayerTimes200

export type GetUtilsPrayerTimesQuery = {
  Response: GetUtilsPrayerTimes200
  QueryParams: GetUtilsPrayerTimesQueryParams
  Errors: GetUtilsPrayerTimes404
}