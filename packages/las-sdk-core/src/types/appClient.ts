import { PaginationOptions, RequestConfig } from './common';

export type CreateAppClientOptions = RequestConfig & {
  callbackUrls?: Array<string>;
  description?: string;
  generateSecret?: boolean;
  logoutUrls?: Array<string>;
  loginUrls?: Array<string>;
  defaultLoginUrl?: string;
  name?: string;
  roleIds?: Array<string>;
};

export type UpdateAppClientOptions = RequestConfig & {
  defaultLoginUrl?: string;
  description?: string;
  loginUrls?: Array<string>;
  name?: string;
  roleIds?: Array<string>;
};

export type AppClient = {
  /* Id */
  appClientId: string;
  /* Attributes */
  callbackUrls?: Array<string> | null;
  clientId: string;
  clientSecret?: string | null;
  createdBy: string;
  createdTime: Date;
  defaultLoginUrl?: string | null;
  description?: string | null;
  hasSecret: boolean;
  loginUrls?: Array<string> | null;
  logoutUrls?: Array<string> | null;
  name?: string | null;
  roleIds: Array<string>;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type AppClientList = {
  appClients: Array<AppClient>;
  nextToken: string | null;
};

export type ListAppClientsOptions = RequestConfig & PaginationOptions;

export type DeleteAppClientOptions = RequestConfig;
