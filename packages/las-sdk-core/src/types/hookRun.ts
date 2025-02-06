import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type HookStatus = 'failed' | 'running' | 'succeeded';

export type HookRun = {
  runId: string;
  actionId: string;
  createdBy: string;
  createdTime: Date;
  history: object;
  hookId: string;
  input: object;
  logId: string;
  output?: object;
  projectId: string;
  projectRunId: string;
  status: HookStatus;
  updatedBy: string;
  updatedTime: Date;
};

export type CreateHookRunOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateHookRunOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type HookRunList = {
  functions: Array<HookRun>;
  nextToken: string | null;
};

export type GetHookRunOptions = RequestConfig;

export type ListHookRunsOptions = RequestConfig & PaginationOptions;

export type DeleteHookRunOptions = RequestConfig;
