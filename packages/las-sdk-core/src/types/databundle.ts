import { JSONObject, PaginationOptions, RequestConfig } from './common';
import type { Dataset } from './dataset';

export const DataBundleStatusValues = ['succeeded', 'running', 'failed'] as const;
export type DataBundleStatus = (typeof DataBundleStatusValues)[number];

export type DataBundle = {
  /* Id */
  dataBundleId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  datasets: Array<Dataset>;
  description?: string | null;
  modelId: string;
  name?: string | null;
  retentionInDays: number;
  status: DataBundleStatus;
  summary: JSONObject;
  updatedBy?: string | null;
  updatedTime?: string | null;
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
