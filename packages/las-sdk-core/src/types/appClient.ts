import { PaginationOptions, RequestConfig } from './common';

export type CreateAppClientOptions = RequestConfig & {
  callbackUrls?: Array<string>;
  description?: string;
  generateSecret?: boolean;
  logoutUrls?: Array<string>;
  loginUrls?: Array<string>;
  defaultLoginUrl?: string;
  name?: string;
};

export type UpdateAppClientOptions = RequestConfig & {
  defaultLoginUrl?: string;
  description?: string;
  loginUrls?: Array<string>;
  name?: string;
};

export type AppClient = {
  appClientId: string;
  callbackUrls: Array<string> | null;
  clientId: string;
  clientSecret?: string;
  createdBy: string | null;
  createdTime: string | null;
  defaultLoginUrl: string | null;
  description: string | null;
  hasSecret: boolean;
  loginUrls: Array<string> | null;
  logoutUrls: Array<string> | null;
  name: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
};

export type AppClientList = {
  appClients: Array<AppClient>;
  nextToken: string | null;
};

export type ListAppClientsOptions = RequestConfig & PaginationOptions;

export type DeleteAppClientOptions = RequestConfig;
