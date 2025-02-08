import { JSONObject, PaginationOptions, RequestConfig } from './common';

export type Log = {
  /* Id */
  logId: string;
  /* Attributes */
  events: JSONObject[];
};

export type LogList = {
  logs: Log[];
  nextToken?: string | null;
};

export type ListLogsOptions = RequestConfig & PaginationOptions;
export type GetLogOptions = RequestConfig;
