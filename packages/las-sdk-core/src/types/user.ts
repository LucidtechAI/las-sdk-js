import { JSONObject, PaginationOptions, RequestConfig } from './common';

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
  roleIds: string[];
  status: UserStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type UserList = {
  users: User[];
  nextToken?: string | null;
};

export type ListUsersOptions = RequestConfig & PaginationOptions;
export type GetUserOptions = RequestConfig;
export type CreateUserOptions = RequestConfig & Pick<User, 'metadata' | 'roleIds'> & { email: string };
export type UpdateUserOptions = RequestConfig & Pick<User, 'metadata' | 'roleIds'>;
export type DeleteUserOptions = RequestConfig;
