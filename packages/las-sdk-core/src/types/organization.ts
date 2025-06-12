import { JSONObject, PaginationOptions, RequestConfig } from './common';

export type Organization = {
  /* Id */
  organizationId: string;
  /* Attributes */
  clientId: string;
  createdTime: Date;
  description?: string | null;
  documentRetentionInDays: number;
  monthlyNumberOfDocumentsAllowed: number;
  monthlyNumberOfDocumentsCreated: number;
  monthlyNumberOfPagePredictionsAllowed: number;
  monthlyNumberOfPagePredictionsUsed: number;
  monthlyNumberOfPredictionsAllowed: number;
  monthlyNumberOfPredictionsCreated: number;
  monthlyUsageSummary: JSONObject;
  name?: string | null;
  numberOfAppClientsAllowed: number;
  numberOfAppClientsCreated: number;
  numberOfModelsAllowed: number;
  numberOfModelsCreated: number;
  numberOfSecretsAllowed: number;
  numberOfSecretsCreated: number;
  numberOfUsersAllowed: number;
  numberOfUsersCreated: number;
  paymentMethodId?: string | null;
  pictureUrl: string;
  planId?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
  url?: string | null;
  useNewScopes?: boolean | null;
};

export type OrganizationList = {
  organizations: Organization[];
  nextToken?: string | null;
};

export type ListOrganizationsOptions = RequestConfig & PaginationOptions;
export type GetOrganizationOptions = RequestConfig;
export type CreateOrganizationOptions = RequestConfig &
  Pick<Organization, 'description' | 'name' | 'url'> & { useNewScopes?: boolean };
export type UpdateOrganizationOptions = RequestConfig &
  Pick<Partial<Organization>, 'description' | 'name' | 'paymentMethodId' | 'planId' | 'url'>;
