import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export const HookStatusValues = ['failed', 'running', 'succeeded'] as const;
export type HookStatus = (typeof HookStatusValues)[number];

export type HookRun = {
  /* Id */
  actionId: string;
  runId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  history: JSONObject;
  hookId: string;
  input: JSONObject;
  logId: string;
  output?: JSONObject | null;
  projectId: string;
  projectRunId: string;
  status: HookStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
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
