import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

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
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  enabled: boolean;
  falseActionId?: string | null;
  functionId?: string | null;
  metadata: JSONObject;
  name?: string | null;
  agentId: string;
  trigger: Trigger;
  trueActionId?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type HookList = {
  hooks: Hook[];
  nextToken?: string | null;
};

export type ListHooksOptions = RequestConfig & PaginationOptions;
export type GetHookOptions = RequestConfig;
export type CreateHookOptions = RequestConfig &
  OptionsOmit<Hook, 'hookId'> &
  Pick<Hook, 'functionId' | 'config' | 'agentId' | 'trigger'>;
export type UpdateHookOptions = RequestConfig & OptionsOmit<Hook, 'hookId'>;
export type DeleteHookOptions = RequestConfig;
