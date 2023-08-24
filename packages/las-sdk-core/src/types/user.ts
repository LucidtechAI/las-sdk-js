import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type User = {
  avatar: string | null;
  createdBy: string | null;
  createdTime: string | null;
  email: string;
  metadata: Record<string, JSONValue> | null;
  name: string | null;
  profileId: string | null;
  roleIds: Array<string>;
  updatedBy: string | null;
  updatedTime: string | null;
  userId: string;
};

export type CreateUserOptions = RequestConfig & {
  appClientId?: string;
  avatar?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
  roleIds?: Array<string>;
};

export type UpdateUserOptions = RequestConfig & {
  avatar?: string | null;
  metadata?: Record<string, JSONValue> | null;
  name?: string | null;
  roleIds?: Array<string>;
};

export type ListUsersOptions = RequestConfig & PaginationOptions;

export type GetUserOptions = RequestConfig;

export type DeleteUserOptions = RequestConfig;

export type UserList = {
  users: Array<User>;
  nextToken: string | null;
};
