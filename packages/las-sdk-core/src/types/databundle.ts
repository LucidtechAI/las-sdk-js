import { PaginationOptions, RequestConfig } from './common';
import type { Dataset } from './dataset';

export type DataBundle = {
  createdBy: string | null;
  createdTime: string;
  dataBundleId: string;
  datasets: Array<Dataset>;
  description: string | null;
  modelId: string;
  name: string | null;
  retentionInDays: number;
  status: 'succeeded' | 'running' | 'failed';
  summary: Record<string, any>;
  updatedBy: string | null;
  updatedTime: string;
};

export type CreateDataBundleOptions = RequestConfig & {
  name?: string;
  description?: string;
};

export type DeleteDataBundleOptions = RequestConfig;

export type UpdateDataBundleOptions = RequestConfig & {
  description?: string;
  name?: string;
};

export type DataBundleList = {
  dataBundles: Array<DataBundle>;
  nextToken: string | null;
};

export type ListDataBundleOptions = RequestConfig & PaginationOptions;
