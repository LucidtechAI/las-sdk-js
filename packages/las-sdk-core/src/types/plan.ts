import { RequestConfig, PaginationOptions } from './common';

export type PlanCurrency = 'NOK' | 'USD' | 'EUR';

export type Plan = {
  activeModels?: Record<any, any>;
  billingCycle: number;
  currency: PlanCurrency;
  description?: string | null;
  fieldPredictions?: Record<any, any>;
  gpuHours?: Record<any, any>;
  latest: number;
  license?: Record<any, any>;
  modelDeploymentUnits: Record<any, any>;
  name: string | null;
  organizationId: string | null;
  planId: string;
};

export type PlanList = {
  plans: Array<Plan>;
  nextToken: string | null;
  owner: Array<string>;
};

export type ListPlansOptions = RequestConfig & PaginationOptions & { owner?: string | Array<string> };
