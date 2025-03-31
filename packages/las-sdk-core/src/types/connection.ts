import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Connection = {
  /* Id */
  connectionId: string;
  /* Attributes */
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  enabled: boolean;
  metadata: JSONObject;
  name?: string | null;
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
  OptionsOmit<Connection, 'connectionId'> &
  Pick<Connection, 'config'>;
export type UpdateConnectionOptions = RequestConfig & OptionsOmit<Connection, 'connectionId'>;
export type DeleteConnectionOptions = RequestConfig;
