import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ContentType = 'application/pdf' | 'image/jpeg';

export interface CreatePredictionOptions {
  maxPages?: number;
  autoRotate?: boolean;
}

export interface PaginationInput {
  maxResults?: number;
  nextToken?: string;
}

export interface ListTransitionOptions {
  transitionType?: string | Array<string>;
  maxResults?: number;
  nextToken?: string;
}

export interface CreateDocumentOptions {
  content: string;
  contentType: ContentType;
  consentId?: string;
  batchId?: string;
  groundTruth?: Array<GroundTruth>;
}

export interface CreateWorkflowOptions {
  name: string;
  specification: WorkflowSpecification;
  description?: string;
  errorConfig?: { email: string };
}

export interface ListDocumentsOptions {
  batchId?: string | Array<string>;
  consentId?: string | Array<string>;
  maxResults?: number;
  nextToken?: string;
}

export type TransitionExecutionList = {
  transitionId: string;
  executions: TransitionExecution;
  nextToken: string | null;
};

export interface TransitionExecutionListOptions {
  status?: 'succeeded' | 'failed' | 'retry' | 'running' | 'rejected';
  executionId?: string | Array<string>;
  maxResults?: number;
  nextToken?: string;
}

export interface UpdateTransitionExecution {
  status: 'succeeded' | 'failed' | 'retry' | 'rejected';
  output?: Record<any, any>;
  error?: { message: string };
}

export interface CreateTransitionOptions {
  name: string;
  transitionType: TransitionType;
  inputJsonSchema: object;
  outputJsonSchema: object;
  description?: string;
  params?: PostTransitionParams;
}

export type LasDocumentList = {
  documents: Array<LasDocument>;
  consentId?: string;
  batchId?: string;
  nextToken?: string;
};

export type PostTransitionDockerParams = {
  environment?: object;
  memory?: 512 | 1024 | 2048;
  credentials?: {
    password: string;
    username: string;
  };
  imageUrl: string;
  cpu?: 256;
};

export type PostTransitionManualParams = {
  assets?: {
    /** Pattern: ^las:asset:[a-f0-9]{32}$ */
    jsRemoteComponent?: string;
  } & Record<string, string>;
};

export type PostTransitionParams = PostTransitionDockerParams | PostTransitionManualParams;

export type TransitionType = 'docker' | 'manual';

export type PatchTransition = {
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
};

export type TransitionList = {
  transitions: Array<Transition>;
  nextToken?: string;
};

export type TransitionExecution = {
  executionId: string;
  transitionId: string;
  input: Record<any, any>;
  status: 'succeeded' | 'failed' | 'retry' | 'running' | 'rejected';
};

export type WorkflowSpecification = {
  definition: object;
  language?: 'ASL';
  version?: '1.0.0';
};

export type Workflow = {
  name: string;
  workflowId: string;
  description?: string;
};

export interface ListWorkflowExecutionsOptions {
  status?: string | Array<string>;
  maxResults?: number;
  nextToken?: string;
  sortBy?: 'startTime' | 'endTime';
  order?: 'ascending' | 'descending';
}

export type PatchWorkflow = {
  name?: string;
  description?: string;
};

export type WorkflowList = {
  workflows: Array<Workflow>;
};

export type WorkflowExecution = {
  executionId: string;
  workflowId: string;
  input: Record<any, any>;
  output: Record<any, any>;
  status?: 'succeeded' | 'failed' | 'running' | 'rejected';
  startTime: string | null;
  endTime: string | null;
  completedBy: string | null;
};

export type WorkflowExecutionList = {
  executions: Array<Required<WorkflowExecution>>;
  workflowId: string;
  status?: 'succeeded' | 'failed' | 'running' | 'rejected';
  nextToken?: string;
};

export type GroundTruth = {
  /** maxLength: 36, minLength: 1, pattern: ^[0-9A-Za-z_]+$ */
  label: string;
  /** maxLength: 64, minLength: 1 */
  value: string | boolean | null;
};

export type PostPredictions = {
  documentId: string;
  modelId: string;
  maxPages?: number;
  autoRotate?: boolean;
};

export type Prediction = GroundTruth & {
  /** minimum: 0, maximum: 1 */
  confidence: number;
};

export type PredictionResponse = {
  documentId: string;
  predictions?: Array<Prediction>;
};

export type Batch = {
  batchId: string;
  description: string;
};

export type User = {
  userId: string;
  email: string;
};

export type UserList = {
  users: Array<User>;
  nextToken?: string;
};

export type LasDocument = {
  contentType: ContentType;
  /** pattern: ^las:document:[a-f0-9]{32}$ */
  documentId: string;
  groundTruth?: Array<GroundTruth>;
  /** pattern: ^las:consent:[a-f0-9]{32}$ */
  consentId?: string;
  /** minimum: 0 */
  inferenceTime?: number;
  /** pattern: ^las:batch:[a-f0-9]{32}$ */
  batchId?: string;
  /** minimum: 1 */
  updated?: number;
  /** minimum: 1 */
  content?: string;
  predictions?: Array<Prediction>;
};

export type Asset = {
  assetId: string;
  content?: string;
};

export type Assets = {
  assets: Array<Asset>;
  nextToken?: string;
};

export type AuthorizationHeaders = {
  'X-Api-Key': string;
  Authorization: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AxiosFn = <T = any, R = AxiosResponse<T>>(
  url: string,
  body?: any, // eslint-disable-line
  config?: AxiosRequestConfig
) => Promise<R>;
