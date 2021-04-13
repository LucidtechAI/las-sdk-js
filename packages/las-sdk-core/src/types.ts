/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ContentType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/tiff';

export interface CreatePredictionsOptions {
  maxPages?: number;
  autoRotate?: boolean;
  imageQuality?: 'LOW' | 'HIGH';
}

export interface PaginationOptions {
  maxResults?: number;
  nextToken?: string;
}

export type ListTransitionOptions = PaginationOptions & {
  transitionType?: string | Array<string>;
}

export interface CreateDocumentOptions {
  consentId?: string;
  batchId?: string;
  groundTruth?: Array<GroundTruth>;
}

export interface UpdateDocumentOptions {
  groundTruth?: Array<GroundTruth>;
}

export type ListDocumentsOptions = PaginationOptions & {
  batchId?: string | Array<string>;
  consentId?: string | Array<string>;
}

export type TransitionExecutionList = {
  transitionId: string;
  executions: Array<TransitionExecution>;
  nextToken: string | null;
};

export type TransitionExecutionListOptions = PaginationOptions & {
  status?: 'succeeded' | 'failed' | 'retry' | 'running' | 'rejected';
  executionId?: string | Array<string>;
  sortBy?: 'startTime' | 'endTime';
  order?: 'ascending' | 'descending';
}

export interface UpdateTransitionExecution {
  status: 'succeeded' | 'failed' | 'retry' | 'rejected';
  output?: Record<any, any>;
  error?: { message: string };
  startTime?: string;
}

export interface CreateTransitionOptions {
  name?: string | null;
  inputJsonSchema?: Record<any, any>;
  outputJsonSchema?: Record<any, any>;
  description?: string | null;
  parameters?: CreateTransitionParams;
}

export type LasDocumentList = {
  documents: Array<LasDocumentWithoutContent>;
  batchId?: string;
  nextToken?: string;
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

export type UpdateTransitionOptions = {
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

export type TransitionList = {
  transitions: Array<Transition>;
  nextToken?: string;
};

export type TransitionExecution = {
  executionId: string;
  transitionId: string;
  input: Record<any, any>;
  status: 'succeeded' | 'failed' | 'retry' | 'running' | 'rejected';
  completedBy: string | null;
  startTime: string | null;
  endTime: string | null;
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

export type ListWorkflowOptions = PaginationOptions;

export type ListWorkflowExecutionsOptions = PaginationOptions & {
  status?: string | Array<string>;
  sortBy?: 'startTime' | 'endTime';
  order?: 'ascending' | 'descending';
};

export type CreateWorkflowOptions = {
  description?: string;
  errorConfig?: { email: string };
};

export interface UpdateWorkflowOptions {
  name?: string;
  description?: string;
}

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
  transitionExecutions: Record<string, Array<string>> | null;
  completedBy: Array<string>;
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

export interface DeleteDocumentOptions {
  consentId?: string | Array<string>;
}

export type PostPredictions = CreatePredictionsOptions & {
  documentId: string;
  modelId: string;
};

export type Prediction = GroundTruth & {
  /** minimum: 0, maximum: 1 */
  confidence: number;
};

export type PredictionResponse = {
  predictionId: string;
  modelId: string;
  documentId: string;
  inferenceTime: number;
  timestamp: number;
  predictions: Array<Prediction>;
};

export type ListPredictionsOptions = PaginationOptions;

export type PredictionList = {
  predictions: Array<PredictionResponse>;
  nextToken: string | null;
}

export type Batch = {
  batchId: string;
  name: string;
  description: string;
};

export type User = {
  userId: string;
  email: string;
  avatar: string | null;
  name: string | null;
};

export type CreateUserOptions = {
  name?: string | null;
  avatar?: string | null;
}

export type UpdateUserOptions = {
  name?: string | null;
  avatar?: string | null;
}

export type ListUsersOptions = PaginationOptions;

export type UserList = {
  users: Array<User>;
  nextToken?: string;
};

export type Secret = {
  secredId: string;
  description: string | null;
  name: string | null;
};

export type ListSecretsOptions = PaginationOptions;

export type SecretList = {
  secrets: Array<Secret>;
  nextToken?: string | null;
};

export interface CreateSecretOptions {
  description?: string;
}

export interface UpdateSecretOptions {
  data?: Record<any, any>;
  description?: string | null;
  name?: string | null;
}

export type LasDocumentWithoutContent = Omit<LasDocument, 'content'>;

export type LasDocument = {
  contentType: ContentType;
  /** pattern: ^las:document:[a-f0-9]{32}$ */
  documentId: string;
  groundTruth?: Array<GroundTruth>;
  /** pattern: ^las:consent:[a-f0-9]{32}$ */
  consentId?: string;
  /** pattern: ^las:batch:[a-f0-9]{32}$ */
  batchId?: string;
  /** minimum: 1 */
  content: string;
};

export type Asset = {
  assetId: string;
  content: string;
};

export type AssetWithoutContent = Omit<Asset, 'content'>;

export type AssetList = {
  assets: Array<AssetWithoutContent>;
  nextToken: string | null;
};

export type PreprocessConfig = {
  autoRotate: boolean;
  imageQuality: 'LOW' | 'HIGH';
  maxPages: number;
}

export type Field = {
  description: string;
  maxLength: number;
  type: 'all' | 'alphanum' | 'alphanumext' | 'amount' | 'date' | 'letter' | 'number' | 'phone';
}

export type Model = {
  created: string | null;
  description: string | null;
  fieldConfig: Record<string, Field> | null;
  height: number;
  modelId: string;
  name: string | null;
  preprocessConfig: PreprocessConfig;
  status: 'active' | 'training';
  updated: string | null;
  width: number;
}

export type ListModelsOptions = PaginationOptions;

export type ModelList = {
  models: Array<Model>;
  nextToken: string | null;
}

export type CreateBatchOptions = {
  name?: string;
  description?: string;
}

export interface UpdateAssetOptions {
  content?: string | Buffer;
}

export type ListAssetsOptions = PaginationOptions;

export type Log = {
  logId: string;
  events: Array<Record<any, any>>;
  transitionId?: string | null;
}

export type AuthorizationHeaders = {
  'X-Api-Key': string;
  Authorization: string;
};

export type AxiosFn = <T = any, R = AxiosResponse<T>>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) => Promise<R>;
