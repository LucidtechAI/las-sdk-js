import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Secret = {
  /* Id */
  secretId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  data: JSONObject;
  description?: string | null;
  metadata?: JSONObject | null;
  name?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type SecretList = {
  secrets: Secret[];
  nextToken?: string | null;
};

export type ListSecretsOptions = RequestConfig & PaginationOptions;
export type GetSecretOptions = RequestConfig;
export type CreateSecretOptions = RequestConfig & OptionsOmit<Secret, 'secretId'>;
export type UpdateSecretOptions = RequestConfig & OptionsOmit<Secret, 'secretId'>;
export type DeleteSecretOptions = RequestConfig;
