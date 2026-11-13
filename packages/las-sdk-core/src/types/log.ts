import { JSONObject, OrderParam, PaginationOptions, RequestConfig } from './common';

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

export type ListLogsOptions = RequestConfig & PaginationOptions & OrderParam;
export type GetLogOptions = RequestConfig;
