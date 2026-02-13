import { JSONValue, RequestConfig } from './common';

export type Statistic = Record<string, JSONValue>;

export type AgentStatistic = {
  /* Id */
  agentId: string;
  /* Attributes */
  after?: Date;
  before?: Date;
  statistics: {
    global: Statistic;
    fields: Record<string, Statistic>;
    globalPerDay: Record<string, Statistic>;
    fieldsPerDay: Record<string, Record<string, Statistic>>;
  };
};

export type GetAgentStatisticsOptions = RequestConfig & {
  after?: Date;
  before?: Date;
};

export const toGetAgentStatisticsQueryParams = (options?: GetAgentStatisticsOptions) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const params: Record<string, any> = {};

  for (const [key, val] of Object.entries(options)) {
    switch (key) {
      case 'after':
      case 'before':
        if (val instanceof Date) {
          params[key] = val?.toISOString();
        } else {
          params[key] = val;
        }
        break;
      default:
        params[key] = val;
        break;
    }
  }

  return params;
};

