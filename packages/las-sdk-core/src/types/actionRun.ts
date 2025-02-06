import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type ActionRunStatus = 'failed' | 'running' | 'succeeded';

export type ActionRun = {
  runId: string;
  actionId: string;
  createdBy: string;
  createdTime: Date;
  history: object;
  input: object;
  logId: string;
  output?: object;
  projectId: string;
  projectRunId: string;
  status: ActionRunStatus;
  updatedBy: string;
  updatedTime: Date;
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
