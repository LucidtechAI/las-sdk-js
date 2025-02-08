import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

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
  metadata?: JSONObject | null;
  name?: string | null;
  permissions: Array<Permission>;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type RoleList = {
  roles: Role[];
  nextToken?: string | null;
};

export type ListRolesOptions = RequestConfig & PaginationOptions;
export type GetRoleOptions = RequestConfig;
export type CreateRoleOptions = RequestConfig & OptionsOmit<Role, 'roleId'>;
export type UpdateRoleOptions = RequestConfig & OptionsOmit<Role, 'roleId'>;
export type DeleteRoleOptions = RequestConfig;
