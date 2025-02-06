import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type Trigger =
  | 'ActionRun has Completed'
  | 'Document is Created'
  | 'Prediction is Created'
  | 'ValidationTask has Completed'
  | 'ValidationTask is Created';

export type Hook = {
  hookId: string;
  condition: string;
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  description?: string;
  enabled: boolean;
  falseActionId?: string;
  metadata: object;
  name?: string;
  projectId: string;
  trigger: Trigger;
  trueActionId: string;
  updatedBy?: string;
  updatedTime?: Date;
};

export type CreateHookOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateHookOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type HookList = {
  functions: Array<Hook>;
  nextToken: string | null;
};

export type GetHookOptions = RequestConfig;

export type ListHooksOptions = RequestConfig & PaginationOptions;

export type DeleteHookOptions = RequestConfig;
