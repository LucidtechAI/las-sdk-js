import { JSONObject, PaginationOptions, RequestConfig } from './common';

export const HookStatusValues = ['failed', 'running', 'succeeded'] as const;
export type HookStatus = (typeof HookStatusValues)[number];

export type HookRun = {
  /* Id */
  hookId: string;
  runId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  history: JSONObject[];
  input: JSONObject;
  logId: string;
  metadata?: JSONObject | null;
  output?: JSONObject | null;
  projectId: string;
  projectRunId: string;
  status: HookStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type HookRunList = {
  hooks: HookRun[];
  nextToken?: string | null;
};

export type ListHookRunsOptions = RequestConfig & PaginationOptions;
export type GetHookRunOptions = RequestConfig;
export type CreateHookRunOptions = RequestConfig & Pick<HookRun, 'input' | 'metadata' | 'projectRunId'>;
export type UpdateHookRunOptions = RequestConfig & Pick<Partial<HookRun>, 'output' | 'metadata'>;
export type DeleteHookRunOptions = RequestConfig;
