import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type ActionRunStatus = 'failed' | 'running' | 'succeeded';

export type ActionRun = {
  /* Id */
  actionId: string;
  runId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  history: JSONObject;
  input: JSONObject;
  logId: string;
  output?: JSONObject | null;
  projectId: string;
  projectRunId: string;
  status: ActionRunStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type CreateActionRunOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateActionRunOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type ActionRunList = {
  actionRuns: Array<ActionRun>;
  nextToken: string | null;
};

export type GetActionRunOptions = RequestConfig;

export type ListActionRunsOptions = RequestConfig & PaginationOptions;

export type DeleteActionRunOptions = RequestConfig;
