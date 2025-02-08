import { JSONObject, OwnerParam, PaginationOptions, RequestConfig } from './common';

export const PlanCurrencyValues = ['NOK', 'USD', 'EUR'] as const;
export type PlanCurrency = (typeof PlanCurrencyValues)[number];

export type Plan = {
  /* Id */
  organizationId?: string | null;
  planId: string;
  /* Attributes */
  activeModels?: JSONObject | null;
  billingCycle: number;
  currency: PlanCurrency;
  description?: string | null;
  fieldPredictions?: JSONObject | null;
  gpuHours?: JSONObject | null;
  latest: number;
  license?: JSONObject | null;
  modelDeploymentUnits?: JSONObject | null;
  name?: string | null;
};

export type PlanList = {
  plans: Plan[];
  nextToken?: string | null;
  owner: string[];
};

export type ListPlansOptions = RequestConfig & PaginationOptions & OwnerParam;
export type GetPlanOptions = RequestConfig;
