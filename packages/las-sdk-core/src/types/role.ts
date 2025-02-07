import { PaginationOptions, RequestConfig } from './common';

export type Role = {
  /* Id */
  roleId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  name?: string | null;
  permissions: Array<RolePermission>;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type RolePermission = {
  resourceId: string;
  action: '*' | 'read' | 'write';
  effect: 'allow' | 'deny';
};

export type RoleList = {
  nextToken: string | null;
  roles: Array<Role>;
};

export type ListRoleOptions = RequestConfig & PaginationOptions;
export type GetRoleOptions = RequestConfig;
