import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfig = { requestConfig?: AxiosRequestConfig };

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;
export type JSONObject = Record<string, JSONValue>;

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

export type AttentionMap = number[][];

export type Annotation = {
  value?: string | null;
  confidence?: number;
  formattedValue?: string | null;
  attentionMap?: AttentionMap;
};

export type HeaderAnnotations = Annotation[];
export type TableAnnotations = Record<string, Annotation[]>[];
export type Annotations = Record<string, HeaderAnnotations | TableAnnotations>;
