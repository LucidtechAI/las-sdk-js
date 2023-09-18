import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type User = {
  createdBy: string | null;
  createdTime: string | null;
  metadata: Record<string, JSONValue> | null;
  profileId: string | null;
  roleIds: Array<string>;
  status: 'inactive' | 'active' | 'invite_pending';
  updatedBy: string | null;
  updatedTime: string | null;
  userId: string;
};

export type CreateUserOptions = RequestConfig & {
  appClientId?: string;
  metadata?: Record<string, JSONValue> | null;
  roleIds?: Array<string>;
};

export type UpdateUserOptions = RequestConfig & {
  metadata?: Record<string, JSONValue> | null;
  roleIds?: Array<string>;
};

export type ListUsersOptions = RequestConfig & PaginationOptions;

export type GetUserOptions = RequestConfig;

export type DeleteUserOptions = RequestConfig;

export type UserList = {
  users: Array<User>;
  nextToken: string | null;
};
