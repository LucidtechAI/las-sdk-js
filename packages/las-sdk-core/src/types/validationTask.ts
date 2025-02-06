import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type ValidationTask = {
  validationId: string;
  taskId: string;
  createdTime: Date;
  updatedTime?: Date;
  input: JSONObject;
  status: 'custom' | 'failed' | 'in-progress' | 'ready' | 'succeeded';
};

export type CreateValidationTaskOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateValidationTaskOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type ValidationTaskList = {
  projects: Array<ValidationTask>;
  nextToken: string | null;
};

export type GetValidationTaskOptions = RequestConfig;

export type ListValidationTasksOptions = RequestConfig & PaginationOptions;

export type DeleteValidationTaskOptions = RequestConfig;
