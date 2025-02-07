import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type Action = {
  /* Id */
  actionId: string;
  /* Attributes */
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  enabled: boolean;
  functionId: string;
  metadata?: JSONObject | null;
  name?: string | null;
  projectId: string;
  secretId?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type CreateActionOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateActionOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type ActionList = {
  actions: Array<Action>;
  nextToken: string | null;
};

export type GetActionOptions = RequestConfig;

export type ListActionsOptions = RequestConfig & PaginationOptions;

export type DeleteActionOptions = RequestConfig;
