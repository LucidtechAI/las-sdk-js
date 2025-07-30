import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export const HookStatusValues = ['failed', 'running', 'succeeded'] as const;
export type HookStatus = (typeof HookStatusValues)[number];

export type HookRun = {
  /* Id */
  id: string;
  hookId: string;
  runId: string;
  /* Attributes */
  actionId?: string | null;
  createdBy: string;
  createdTime: Date;
  history: JSONObject[];
  input: JSONObject;
  logId: string;
  metadata: JSONObject;
  output?: JSONObject | null;
  agentRunId: string;
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
export type CreateHookRunOptions = RequestConfig &
  OptionsOmit<HookRun, 'hookId' | 'runId' | 'logId'> &
  Pick<HookRun, 'input' | 'agentRunId'>;
export type UpdateHookRunOptions = RequestConfig & Pick<Partial<HookRun>, 'output' | 'metadata'>;
export type DeleteHookRunOptions = RequestConfig;
