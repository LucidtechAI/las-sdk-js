import { PaginationOptions, RequestConfig } from './common';

export type ListDeploymentEnvironmentsOptions = RequestConfig & PaginationOptions & { owner?: string | Array<string> };

export const DeploymentEnvironmentStatusValues = ['available', 'unavailable'] as const;
export type DeploymentEnvironmentStatus = (typeof DeploymentEnvironmentStatusValues)[number];

export type DeploymentEnvironment = {
  /* Id */
  deploymentEnvironmentId: string;
  /* Attributes */
  description?: string | null;
  modelDeploymentUnits: number;
  name?: string | null;
  organizationId?: string | null;
  status: DeploymentEnvironmentStatus;
};

export type DeploymentEnvironmentList = {
  deploymentEnvironments: Array<DeploymentEnvironment>;
  nextToken: string | null;
};

export type GetDeploymentEnvironmentOptions = RequestConfig;
