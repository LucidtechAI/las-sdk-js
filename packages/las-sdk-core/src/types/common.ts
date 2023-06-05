import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfig = { requestConfig?: AxiosRequestConfig };

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;

export interface PaginationOptions {
  maxResults?: number;
  nextToken?: string;
}

export type AuthorizationHeaders = {
  Authorization: string;
};

export type AxiosFn = <T = any, R = AxiosResponse<T>>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) => Promise<R>;
