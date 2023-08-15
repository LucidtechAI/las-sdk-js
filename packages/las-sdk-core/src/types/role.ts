import { PaginationOptions, RequestConfig } from './common';

export type Role = {
  name: string | null;
  permissions: Array<RolePermission>;
  roleId: string;
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
