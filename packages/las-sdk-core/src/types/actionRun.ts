import { JSONObject, PaginationOptions, RequestConfig } from './common';

export const ActionRunStatusValues = ['failed', 'running', 'succeeded'] as const;
export type ActionRunStatus = (typeof ActionRunStatusValues)[number];

export type ActionRun = {
  /* Id */
  actionId: string;
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
  status: ActionRunStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ActionRunList = {
  runs: ActionRun[];
  nextToken?: string | null;
};

export type ListActionRunsOptions = RequestConfig & PaginationOptions;
export type GetActionRunOptions = RequestConfig;
export type CreateActionRunOptions = RequestConfig & Pick<Partial<ActionRun>, 'input' | 'metadata'>;
export type UpdateActionRunOptions = RequestConfig & Pick<Partial<ActionRun>, 'output' | 'metadata'>;
export type DeleteActionRunOptions = RequestConfig;
