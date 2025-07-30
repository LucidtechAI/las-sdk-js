import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Action = {
  /* Id */
  id: string;
  actionId: string;
  /* Attributes */
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
export type UpdateActionOptions = RequestConfig & OptionsOmit<Action, 'actionId'>;
export type DeleteActionOptions = RequestConfig;
