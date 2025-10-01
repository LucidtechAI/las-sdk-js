import { JSONObject, PaginationOptions, RequestConfig, SortParam } from './common';

export const AgentRunStatusValues = [
  'archived',
  'completed',
  'error',
  'exported',
  'ready-for-review',
  'review-in-progress',
  /* Depracated */
  'pending-export',
  'pending-predictions',
  'review-completed',
  'succeeded-predictions',
] as const;
export type AgentRunStatus = (typeof AgentRunStatusValues)[number];

export const AgentRunEventStatusValues = [
  'running',
  'pending',
  'ready',
  'succeeded',
  'failed',
  'in-progress',
  'ignored',
] as const;
export type AgentRunEventStatus = (typeof AgentRunEventStatusValues)[number];

export type AgentRunEvent = {
  actionId?: string | null;
  errors?: string[] | null;
  hookId?: string | null;
  modelId?: string | null;
  resourceId: string;
  status: AgentRunEventStatus;
  timestamp: Date;
  validationId?: string | null;
  warnings?: string[] | null;
};

export type AgentRun = {
  /* Id */
  id: string;
  agentId: string;
  runId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  history: JSONObject[];
  metadata?: JSONObject | null;
  resourceIds: string[];
  status: AgentRunStatus;
  events: AgentRunEvent[];
  updatedBy?: string | null;
  updatedTime?: Date | null;
  variablesFileUrl?: string | null;
};

export type AgentRunList = {
  runs: Array<AgentRun>;
  nextToken?: string | null;
};

export type ListAgentRunsOptions = RequestConfig &
  PaginationOptions & {
    history?: string;
    status?: AgentRunStatus[];
    sort?: SortParam<AgentRun>[];
    createdTimeAfter?: Date;
    createdTimeBefore?: Date;
    updatedTimeAfter?: Date;
    updatedTimeBefore?: Date;
  };
export type GetAgentRunOptions = RequestConfig;
export type CreateAgentRunOptions = RequestConfig & Pick<Partial<AgentRun>, 'metadata' | 'resourceIds'> & {
  variables?: JSONObject | null;
};
export type UpdateAgentRunOptions = RequestConfig & Pick<Partial<AgentRun>, 'metadata' | 'resourceIds'>;
export type DeleteAgentRunOptions = RequestConfig;

export const toListAgentRunsQueryParams = (options?: ListAgentRunsOptions) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const params: Record<string, any> = {};

  for (const [key, val] of Object.entries(options)) {
    switch (key) {
      case 'sort':
        {
          const sorting: string[] = [];
          for (const sort of val as SortParam<AgentRun>[]) {
            sorting.push(`${sort.column}:${sort.order}`);
          }
          params[key] = sorting;
        }
        break;
      case 'createdTimeAfter':
      case 'createdTimeBefore':
      case 'updatedTimeAfter':
      case 'updatedTimeBefore':
        params[key] = val?.toISOString();
        break;
      default:
        params[key] = val;
        break;
    }
  }

  return params;
};
