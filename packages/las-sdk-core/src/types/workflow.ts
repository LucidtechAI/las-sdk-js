import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type WorkflowSpecification = {
  definition: object;
  language?: 'ASL';
  version?: '1.0.0';
};

export type Workflow = {
  completedConfig: WorkflowCompletedConfig;
  createdBy: null | string;
  createdTime: null | string;
  description: string | null;
  errorConfig: WorkflowErrorConfig;
  metadata: Record<string, JSONValue> | null;
  name: string | null;
  numberOfRunningExecutions: number;
  updatedBy: null | string;
  updatedTime: null | string;
  workflowId: string;
};

export type WorkflowCompletedConfig = {
  imageUrl: string;
  environmentSecrets?: Array<string>;
  environment?: Record<string, string>;
  secretId?: string;
};

export type WorkflowErrorConfig = {
  manualRetry?: boolean;
  email?: string;
};

export type ListWorkflowOptions = RequestConfig & PaginationOptions;

export type ListWorkflowExecutionsOptions = RequestConfig &
  PaginationOptions & {
    fromStartTime?: string;
    order?: 'ascending' | 'descending';
    status?: string | Array<string>;
    sortBy?: 'startTime' | 'endTime';
    toStartTime?: string;
  };

export type CreateWorkflowOptions = RequestConfig & {
  completedConfig?: WorkflowCompletedConfig;
  description?: string | null;
  errorConfig?: WorkflowErrorConfig;
  metadata?: Record<string, JSONValue>;
  name?: string | null;
};

export type UpdateWorkflowOptions = RequestConfig & {
  completedConfig?: WorkflowCompletedConfig;
  description?: string | null;
  errorConfig?: WorkflowErrorConfig;
  metadata?: Record<string, JSONValue>;
  name?: string | null;
};

export type GetWorkflowOptions = RequestConfig;

export type DeleteWorkflowOptions = RequestConfig;

export type ExecuteWorkflowOptions = RequestConfig;

export type GetWorkflowExecutionOptions = RequestConfig;

export type UpdateWorkflowExecutionOptions = RequestConfig & {
  nextTransitionId: string;
};

export type WorkflowList = {
  workflows: Array<Workflow>;
};

export type DeleteWorkflowExecution = RequestConfig;

export type WorkflowExecution = {
  completedBy: Array<string>;
  completedTaskLogId?: string | null;
  endTime: string | null;
  events?: Array<Record<any, any>>;
  executionId: string;
  input: Record<any, any>;
  logId: string | null;
  output?: Record<any, any>;
  startTime: string | null;
  status: 'succeeded' | 'failed' | 'running' | 'rejected' | 'retry' | 'error';
  transitionExecutions?: Record<string, Array<string>> | null;
  workflowId: string;
};

export type WorkflowExecutionList = {
  executions: Array<Required<WorkflowExecution>>;
  workflowId: string;
  status?: Array<'succeeded' | 'failed' | 'running' | 'rejected'>;
  nextToken: string | null;
};
