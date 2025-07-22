import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

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
  logId: string;
  metadata: JSONObject;
  output?: JSONObject | null;
  agentRunId: string;
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
export type CreateValidationTaskOptions = RequestConfig &
  OptionsOmit<ValidationTask, 'validationId' | 'taskId' | 'logId'> &
  Pick<ValidationTask, 'input' | 'agentRunId'>;
export type UpdateValidationTaskOptions = RequestConfig &
  Pick<Partial<ValidationTask>, 'output' | 'metadata' | 'status'>;
export type DeleteValidationTaskOptions = RequestConfig;
