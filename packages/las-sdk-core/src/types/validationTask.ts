import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export const ValidationTaskStatusValues = ['custom', 'failed', 'in-progress', 'ready', 'succeeded'] as const;
export type ValidationTaskStatus = (typeof ValidationTaskStatusValues)[number];

export type ValidationTask = {
  /* Id */
  validationId: string;
  taskId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  input: JSONObject;
  status: ValidationTaskStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
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
