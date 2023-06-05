import { RequestConfig } from './common';

export type Log = {
  logId: string;
  events: Array<Record<any, any>>;
  transitionId?: string | null;
};

export type GetLogOptions = RequestConfig;
