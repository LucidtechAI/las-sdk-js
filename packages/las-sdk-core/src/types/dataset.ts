import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type Dataset = {
  /* Id */
  datasetId: string;
  /* Attributes */
  containsPersonallyIdentifiableInformation: boolean;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  groundTruthSummary: Record<string, number>;
  metadata?: JSONObject | null;
  name?: string | null;
  numberOfDocuments: number;
  retentionInDays: number;
  storageLocation: 'EU';
  updatedBy?: string | null;
  updatedTime?: Date | null;
  version: number;
};

export type CreateDatasetOptions = RequestConfig & {
  name?: string;
  description?: string;
  containsPersonallyIdentifiableInformation?: boolean;
  retentionInDays?: number;
  metadata?: Record<string, JSONValue> | null;
};

export type UpdateDatasetOptions = RequestConfig & {
  description?: string;
  name?: string;
  retentionInDays?: number;
  containsPersonallyIdentifiableInformation?: boolean;
  metadata?: Record<string, JSONValue> | null;
};

export type DatasetList = {
  datasets: Array<Dataset>;
  nextToken: string | null;
};

export type GetDatasetOptions = RequestConfig;

export type ListDatasetsOptions = RequestConfig & PaginationOptions;

export type DeleteDatasetOptions = RequestConfig;
