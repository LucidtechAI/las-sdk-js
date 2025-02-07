import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export const TriggerValues = [
  'ActionRun has Completed',
  'Document is Created',
  'Prediction is Created',
  'ValidationTask has Completed',
  'ValidationTask is Created',
] as const;
export type Trigger = (typeof TriggerValues)[number];

export type Hook = {
  /* Id */
  hookId: string;
  /* Attributes */
  condition: string;
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  enabled: boolean;
  falseActionId?: string | null;
  metadata?: JSONObject | null;
  name?: string | null;
  projectId: string;
  trigger: Trigger;
  trueActionId: string;
  updatedBy?: string | null;
  updatedTime?: Date | null;
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
