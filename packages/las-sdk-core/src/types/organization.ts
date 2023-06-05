import { RequestConfig } from './common';

export type GetOrganizationOptions = RequestConfig;

export type UpdateOrganizationOptions = RequestConfig & {
  description?: string;
  name?: string;
  paymentMethodId?: string | null;
  planId?: string;
};

export type Organization = {
  clientId: string | null;
  deploymentsAllowed: Record<any, any>;
  deploymentsCreated: Record<any, any>;
  description: string | null;
  documentRetentionInDays: number;
  monthlyNumberOfActiveModelsUsed: number;
  monthlyNumberOfDataBundlesAllowed: number;
  monthlyNumberOfDataBundlesCreated: number;
  monthlyNumberOfDocumentsAllowed: number;
  monthlyNumberOfDocumentsCreated: number;
  monthlyNumberOfFieldPredictionsAllowed: number;
  monthlyNumberOfFieldPredictionsUsed: number;
  monthlyNumberOfGpuHoursUsed: number;
  monthlyNumberOfModelDeploymentUnitsUsed: number;
  monthlyNumberOfPredictionsAllowed: number;
  monthlyNumberOfPredictionsCreated: number;
  monthlyNumberOfTrainingsAllowed: number;
  monthlyNumberOfTrainingsCreated: number;
  monthlyNumberOfTransitionExecutionsAllowed: number;
  monthlyNumberOfTransitionExecutionsCreated: number;
  monthlyNumberOfWorkflowExecutionsAllowed: number;
  monthlyNumberOfWorkflowExecutionsCreated: number;
  monthlyUsageSummary: Record<string, any>;
  name: string | null;
  numberOfAppClientsAllowed: number;
  numberOfAppClientsCreated: number;
  numberOfAssetsAllowed: number;
  numberOfAssetsCreated: number;
  numberOfDatasetsAllowed: number;
  numberOfDatasetsCreated: number;
  numberOfModelsAllowed: number;
  numberOfModelsCreated: number;
  numberOfSecretsAllowed: number;
  numberOfSecretsCreated: number;
  numberOfTransitionsAllowed: number;
  numberOfTransitionsCreated: number;
  numberOfUsersAllowed: number;
  numberOfUsersCreated: number;
  numberOfWorkflowsAllowed: number;
  numberOfWorkflowsCreated: number;
  organizationId: string;
  paymentMethodId: string | null;
  planId: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
};
