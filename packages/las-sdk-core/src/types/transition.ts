import { RequestConfig, PaginationOptions } from './common';

export type ListTransitionOptions = RequestConfig &
  PaginationOptions & {
    transitionType?: string | Array<string>;
  };

export type TransitionExecutionStatus = 'succeeded' | 'failed' | 'retry' | 'running' | 'rejected';

export type TransitionExecution = {
  executionId: string;
  transitionId: string;
  input: Record<any, any>;
  status: TransitionExecutionStatus;
  completedBy: string | null;
  startTime: string | null;
  endTime: string | null;
  logId: string | null;
};

export type TransitionExecutionList = {
  transitionId: string;
  executions: Array<TransitionExecution>;
  nextToken: string | null;
};

export type TransitionExecutionListOptions = RequestConfig &
  PaginationOptions & {
    status?: TransitionExecutionStatus | Array<TransitionExecutionStatus>;
    executionId?: string | Array<string>;
    sortBy?: 'startTime' | 'endTime';
    order?: 'ascending' | 'descending';
  };

export type UpdateTransitionExecution = RequestConfig & {
  status: Exclude<TransitionExecutionStatus, 'running'>;
  output?: Record<any, any>;
  error?: { message: string };
  startTime?: string;
};

export type CreateTransitionOptions = RequestConfig & {
  name?: string | null;
  inputJsonSchema?: Record<any, any>;
  outputJsonSchema?: Record<any, any>;
  description?: string | null;
  parameters?: CreateTransitionParams;
};

export type CreateTransitionDockerParams = {
  environment?: object;
  memory?: 512 | 1024 | 2048;
  credentials?: {
    password: string;
    username: string;
  };
  imageUrl: string;
  cpu?: 256;
};

export type CreateTransitionManualParams = {
  assets?: {
    /** Pattern: ^las:asset:[a-f0-9]{32}$ */
    jsRemoteComponent?: string;
  } & Record<string, string>;
};

export type CreateTransitionParams = CreateTransitionDockerParams | CreateTransitionManualParams;

export type TransitionType = 'docker' | 'manual';

export type GetTransitionOptions = RequestConfig;

export type UpdateTransitionOptions = RequestConfig & {
  name?: string;
  description?: string;
  inputJsonSchema?: Record<any, any>;
  outputJsonSchema?: Record<any, any>;
};

export type Transition = {
  name: string;
  description: string;
  transitionId: string;
  transitionType: TransitionType;
  outputJsonSchema?: unknown;
  inputJsonSchema: unknown;
  assets?: Record<string, string>;
  parameters: Record<string, any>;
};

export type DeleteTransitionOptions = RequestConfig;

export type TransitionList = {
  transitions: Array<Transition>;
  nextToken: string | null;
};

export type ExecuteTransitionOptions = RequestConfig;

export type GetTransitionExecutionOptions = RequestConfig;

export type PostHeartbeatOptions = RequestConfig;
