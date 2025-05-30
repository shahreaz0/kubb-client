import axios from "axios";

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// declare const AXIOS_BASE: string;
// declare const AXIOS_HEADERS: string;

/**
 * Subset of AxiosRequestConfig
 */
export type RequestConfig<TData = unknown> = {
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
  params?: unknown;
  data?: TData;
  responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";
  signal?: AbortSignal;
  headers?: AxiosRequestConfig["headers"];
};
/**
 * Subset of AxiosResponse
 */
export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
  headers?: AxiosResponse["headers"];
};

export type ResponseErrorConfig<TError = unknown> = AxiosError<
  {
    statusCode?: number;
    message?: string;
    error?: string;
  } & TError
>;

export const axiosInstance = axios.create({
  baseURL: "https://api.alhira.org",
});

export const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const promise = axiosInstance
    .request<TVariables, ResponseConfig<TData>>({ ...config })
    .catch((e: AxiosError<TError>) => {
      throw e;
    });

  return promise;
};

export default client;
