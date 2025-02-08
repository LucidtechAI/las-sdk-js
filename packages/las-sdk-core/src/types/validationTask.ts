import { JSONObject, PaginationOptions, RequestConfig } from './common';

export const ValidationTaskStatusValues = ['custom', 'failed', 'in-progress', 'ready', 'succeeded'] as const;
export type ValidationTaskStatus = (typeof ValidationTaskStatusValues)[number];

export type ValidationTask = {
  /* Id */
  validationId: string;
  taskId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  history: JSONObject[];
  input: JSONObject;
  metadata?: JSONObject | null;
  output?: JSONObject | null;
  status: ValidationTaskStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ValidationTaskList = {
  tasks: Array<ValidationTask>;
  nextToken: string | null;
};

export type ListValidationTasksOptions = RequestConfig & PaginationOptions;
export type GetValidationTaskOptions = RequestConfig;
export type CreateValidationTaskOptions = RequestConfig & Pick<Partial<ValidationTask>, 'input' | 'metadata'>;
export type UpdateValidationTaskOptions = RequestConfig & Pick<Partial<ValidationTask>, 'output' | 'metadata'>;
export type DeleteValidationTaskOptions = RequestConfig;
