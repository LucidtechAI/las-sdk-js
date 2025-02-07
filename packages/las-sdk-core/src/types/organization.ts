import { JSONObject, RequestConfig } from './common';

export type Organization = {
  /* Id */
  organizationId: string;
  /* Attributes */
  clientId: string;
  createdTime: Date;
  deploymentsAllowed: Record<string, number>;
  deploymentsCreated: Record<string, number>;
  description?: string | null;
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
  monthlyNumberOfPagePredictionsAllowed: number;
  monthlyNumberOfPagePredictionsUsed: number;
  monthlyNumberOfPredictionsAllowed: number;
  monthlyNumberOfPredictionsCreated: number;
  monthlyNumberOfTrainingsAllowed: number;
  monthlyNumberOfTrainingsCreated: number;
  monthlyNumberOfTransitionExecutionsAllowed: number;
  monthlyNumberOfTransitionExecutionsCreated: number;
  monthlyNumberOfWorkflowExecutionsAllowed: number;
  monthlyNumberOfWorkflowExecutionsCreated: number;
  monthlyUsageSummary: JSONObject;
  name?: string | null;
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
  paymentMethodId?: string | null;
  picture?: string | null;
  planId?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type GetOrganizationOptions = RequestConfig;

export type UpdateOrganizationOptions = RequestConfig & {
  description?: string;
  name?: string;
  paymentMethodId?: string | null;
  planId?: string;
};
