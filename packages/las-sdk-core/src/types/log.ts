import { JSONObject, RequestConfig } from './common';

export type Log = {
  /* Id */
  logId: string;
  /* Attributes */
  events: Array<JSONObject>;
  transitionId?: string | null;
};

export type GetLogOptions = RequestConfig;
