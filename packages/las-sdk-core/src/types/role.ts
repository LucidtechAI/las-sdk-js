import { PaginationOptions, RequestConfig } from './common';

export type Role = {
  createdBy: null | string;
  createdTime: null | string;
  description: null | string;
  name: string | null;
  permissions: Array<RolePermission>;
  roleId: string;
  updatedBy: null | string;
  updatedTime: null | string;
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
