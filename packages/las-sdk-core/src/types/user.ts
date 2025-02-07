import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export const UserStatusValues = ['inactive', 'active', 'invite_pending'] as const;
export type UserStatus = (typeof UserStatusValues)[number];

export type User = {
  /* Id */
  userId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  metadata?: JSONObject | null;
  profileId?: string | null;
  roleIds: Array<string>;
  status: UserStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
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
