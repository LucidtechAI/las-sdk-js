import { RequestConfig, PaginationOptions } from './common';

export type Secret = {
  secretId: string;
  description: string | null;
  name: string | null;
};

export type ListSecretsOptions = RequestConfig & PaginationOptions;

export type SecretList = {
  secrets: Array<Secret>;
  nextToken: string | null;
};

export type CreateSecretOptions = RequestConfig & {
  description?: string;
};

export type UpdateSecretOptions = RequestConfig & {
  data?: Record<any, any>;
  description?: string | null;
  name?: string | null;
};
