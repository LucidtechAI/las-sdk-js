import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfig = { requestConfig?: AxiosRequestConfig };

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue> | null;
export type JSONObject = Record<string, JSONValue>;

export type OptionsOmit<T, K extends keyof T> = Omit<
  Partial<T>,
  K | 'createdBy' | 'createdTime' | 'updatedBy' | 'updatedTime'
>;

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

export const ImageQualityValues = ['LOW', 'HIGH'] as const;
export type ImageQuality = (typeof ImageQualityValues)[number];

export type PreprocessConfig = {
  autoRotate: boolean;
  imageQuality: ImageQuality;
  maxPages: number;
};

export type BestFirst = {
  strategy: 'BEST_FIRST';
};

export type BestNPages = {
  strategy: 'BEST_N_PAGES';
  parameters: {
    n: 1 | 2 | 3;
    collapse?: boolean;
  };
};

export type PostprocessConfig = BestFirst | BestNPages;
export type OwnerParam = { owner?: string | string[] };
export type OrderParam = { order?: 'ascending' | 'descending' };
export type SortParam<T> = {
  column: keyof T;
  order: 'asc' | 'desc';
};
