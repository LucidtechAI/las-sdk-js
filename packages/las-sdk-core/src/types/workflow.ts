import { PaginationOptions, RequestConfig } from './common';

export type WorkflowSpecification = {
  definition: object;
  language?: 'ASL';
  version?: '1.0.0';
};

export type Workflow = {
  name: string | null;
  workflowId: string;
  description: string | null;
  numberOfRunningExecutions: number;
  completedConfig: WorkflowCompletedConfig;
  errorConfig: WorkflowErrorConfig;
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
  description?: string | null;
  errorConfig?: WorkflowErrorConfig;
  completedConfig?: WorkflowCompletedConfig;
};

export type UpdateWorkflowOptions = RequestConfig & {
  name?: string | null;
  description?: string | null;
  errorConfig?: WorkflowErrorConfig;
  completedConfig?: WorkflowCompletedConfig;
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
  completedTaskLogId: string | null;
  endTime: string | null;
  events: Array<Record<any, any>>;
  executionId: string;
  input: Record<any, any>;
  logId: string | null;
  output: Record<any, any>;
  status: 'succeeded' | 'failed' | 'running' | 'rejected' | 'retry' | 'error';
  startTime: string | null;
  transitionExecutions: Record<string, Array<string>> | null;
  workflowId: string;
};

export type WorkflowExecutionList = {
  executions: Array<Required<WorkflowExecution>>;
  workflowId: string;
  status?: 'succeeded' | 'failed' | 'running' | 'rejected';
  nextToken: string | null;
};
