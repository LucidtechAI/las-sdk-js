import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

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
  metadata?: JSONObject | null;
  name?: string | null;
  roleIds: Array<string>;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type AppClientList = {
  appClients: AppClient[];
  nextToken?: string | null;
};

export type ListAppClientsOptions = RequestConfig & PaginationOptions;
export type GetAppClientOptions = RequestConfig;
export type CreateAppClientOptions = RequestConfig &
  OptionsOmit<AppClient, 'appClientId' | 'clientId' | 'clientSecret' | 'hasSecret'> &
  Pick<AppClient, 'roleIds'> & { generateSecret: boolean };
export type UpdateAppClientOptions = RequestConfig &
  OptionsOmit<AppClient, 'appClientId' | 'clientId' | 'clientSecret' | 'hasSecret'>;
export type DeleteAppClientOptions = RequestConfig;
