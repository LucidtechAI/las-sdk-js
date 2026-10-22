import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Action = {
  /* Id */
  id: string;
  actionId: string;
  /* Attributes */
  /* The agent it belongs to: set when it's created (agentId on create), it leaves the agent when deleted */
  agentId?: string | null;
  config: JSONObject;
  connectionId?: string | null;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  enabled: boolean;
  functionId: string;
  metadata: JSONObject;
  name?: string | null;
  secretId?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ActionList = {
  actions: Action[];
  nextToken?: string | null;
};

export type ListActionsOptions = RequestConfig & PaginationOptions;
export type GetActionOptions = RequestConfig;
export type CreateActionOptions = RequestConfig &
  OptionsOmit<Action, 'actionId'> &
  Pick<Action, 'config' | 'functionId'>;
export type UpdateActionOptions = RequestConfig & OptionsOmit<Action, 'actionId' | 'agentId'>;
export type DeleteActionOptions = RequestConfig;
