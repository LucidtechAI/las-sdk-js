import { RequestConfig, PaginationOptions } from './common';

export type ListDeploymentEnvironmentsOptions = RequestConfig & PaginationOptions & { owner?: string | Array<string> };

export type DeploymentEnvironmentStatus = 'available' | 'unavailable';

export type DeploymentEnvironment = {
  deploymentEnvironmentId: string;
  description: string | null;
  modelDeploymentUnits: number;
  name: string | null;
  organizationId: string | null;
  status: DeploymentEnvironmentStatus;
};

export type DeploymentEnvironmentList = {
  deploymentEnvironments: Array<DeploymentEnvironment>;
  nextToken: string | null;
};

export type GetDeploymentEnvironmentOptions = RequestConfig;
