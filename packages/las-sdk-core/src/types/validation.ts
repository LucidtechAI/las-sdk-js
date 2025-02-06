import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type Validation = {
  validationId: string;
  config: object;
  createdBy: string;
  createdTime: Date;
  enabled: boolean;
  projectId: string;
  updatedBy?: string;
  updatedTime?: Date;
};

export type CreateValidationOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateValidationOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type ValidationList = {
  projects: Array<Validation>;
  nextToken: string | null;
};

export type GetValidationOptions = RequestConfig;

export type ListValidationsOptions = RequestConfig & PaginationOptions;

export type DeleteValidationOptions = RequestConfig;
