import { PaginationOptions, RequestConfig } from './common';

export const PermissionActionValues = ['*', 'delegate', 'read', 'write'] as const;
export type PermissionAction = (typeof PermissionActionValues)[number];

export const PermissionEffectValues = ['allow', 'deny'] as const;
export type PermissionEffect = (typeof PermissionEffectValues)[number];

export type Permission = {
  resourceId: string;
  action: PermissionAction;
  effect: PermissionEffect;
};

export type Role = {
  /* Id */
  roleId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  name?: string | null;
  permissions: Array<Permission>;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type RoleList = {
  nextToken: string | null;
  roles: Array<Role>;
};

export type ListRoleOptions = RequestConfig & PaginationOptions;
export type GetRoleOptions = RequestConfig;
