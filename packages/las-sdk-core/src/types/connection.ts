import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Connection = {
  /* Id */
  connectionId: string;
  /* Attributes */
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  credentials?: JSONObject | null;
  description?: string | null;
  enabled: boolean;
  metadata: JSONObject;
  name?: string | null;
  setupParams: JSONObject;
  type: 'microsoft-idp';
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ConnectionList = {
  connections: Connection[];
  nextToken?: string | null;
};

export type ListConnectionsOptions = RequestConfig & PaginationOptions;
export type GetConnectionOptions = RequestConfig;
export type CreateConnectionOptions = RequestConfig &
  OptionsOmit<Connection, 'connectionId' | 'credentials'> &
  Pick<Connection, 'config' | 'setupParams' | 'type'>;
export type UpdateConnectionOptions = RequestConfig & OptionsOmit<Connection, 'connectionId' | 'credentials'>;
export type DeleteConnectionOptions = RequestConfig;
