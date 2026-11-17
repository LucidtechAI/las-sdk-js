import { JSONObject, PaginationOptions, RequestConfig, SortParam } from './common';

export const DeprecatedAgentRunStatusValues = [
  'exported',
  'pending-export',
  'pending-predictions',
  'review-completed',
  'succeeded-predictions',
] as const;

export const AgentRunStatusValues = [
  'archived',
  'completed',
  'error',
  'ready-for-review',
  'review-in-progress',
  'running',
] as const;

export type AgentRunStatus = (typeof AgentRunStatusValues | typeof DeprecatedAgentRunStatusValues)[number];

export const AgentRunEventStatusValues = [
  'cancelled',
  'failed',
  'in-progress',
  'pending',
  'ready',
  'running',
  'succeeded',
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
  skipped?: boolean;
};

export type AgentRun = {
  /* Id */
  id: string;
  agentId: string;
  runId: string;
  /* Attributes */
  /* The alias the run was created through */
  agentAlias?: string | null;
  createdBy: string;
  createdTime: Date;
  environmentId?: string | null;
  history: JSONObject[];
  metadata?: JSONObject | null;
  resourceIds: string[];
  status: AgentRunStatus;
  events: AgentRunEvent[];
  /* The agent's action that started the run */
  triggerId?: string | null;
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
export type CreateAgentRunOptions = RequestConfig &
  Pick<Partial<AgentRun>, 'triggerId'> & {
    variables?: JSONObject | null;
  };
export type UpdateAgentRunOptions = RequestConfig & Pick<Partial<AgentRun>, 'metadata' | 'resourceIds'>;
export type DeleteAgentRunOptions = RequestConfig;

export const toListAgentRunsQueryParams = (options?: ListAgentRunsOptions) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const params: Record<string, any> = {};

  for (const [key, val] of Object.entries(options ?? {})) {
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
