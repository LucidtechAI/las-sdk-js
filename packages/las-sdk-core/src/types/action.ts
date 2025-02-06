import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type Action = {
  actionId: string;
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  description?: string;
  enabled: boolean;
  functionId: string;
  metadata?: object;
  name?: string;
  projectId: string;
  secretId?: string;
  updatedBy?: string;
  updatedTime?: Date;
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
