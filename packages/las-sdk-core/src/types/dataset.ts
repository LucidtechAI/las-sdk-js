import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type Dataset = {
  containsPersonallyIdentifiableInformation: boolean;
  createdBy: string | null;
  createdTime: string | null;
  datasetId: string;
  description: string | null;
  groundTruthSummary: Record<string, number>;
  metadata: Record<string, JSONValue> | null;
  name: string | null;
  numberOfDocuments: number;
  retentionInDays: number;
  storageLocation: 'EU';
  updatedBy: string | null;
  updatedTime: string | null;
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
