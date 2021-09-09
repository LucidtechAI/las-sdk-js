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
  batchId?: string;
  consentId?: string;
  datasetId?: string;
  groundTruth?: Array<GroundTruth>;
}

export interface UpdateDocumentOptions {
  groundTruth?: Array<GroundTruth>;
}

export type ListDocumentsOptions = PaginationOptions & {
  batchId?: string | Array<string>;
  consentId?: string | Array<string>;
  datasetId?: string | Array<string>;
}

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

export type TransitionExecutionListOptions = PaginationOptions & {
  status?: TransitionExecutionStatus | Array<TransitionExecutionStatus>;
  executionId?: string | Array<string>;
  sortBy?: 'startTime' | 'endTime';
  order?: 'ascending' | 'descending';
}

export interface UpdateTransitionExecution {
  status: Exclude<TransitionExecutionStatus, 'running'>;
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
  nextToken: string | null;
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
  nextToken: string | null;
};

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
}

export type WorkflowErrorConfig = {
  manualRetry?: boolean;
  email?: string;
}

export type ListWorkflowOptions = PaginationOptions;

export type ListWorkflowExecutionsOptions = PaginationOptions & {
  status?: string | Array<string>;
  sortBy?: 'startTime' | 'endTime';
  order?: 'ascending' | 'descending';
};

export type CreateWorkflowOptions = {
  description?: string | null;
  errorConfig?: WorkflowErrorConfig;
  completedConfig?: WorkflowCompletedConfig;
};

export interface UpdateWorkflowOptions {
  name?: string | null;
  description?: string | null;
  errorConfig?: WorkflowErrorConfig;
  completedConfig?: WorkflowCompletedConfig;
}

export interface UpdateWorkflowExecutionOptions {
  nextTransitionId: string;
}

export type WorkflowList = {
  workflows: Array<Workflow>;
};

export type WorkflowExecution = {
  executionId: string;
  workflowId: string;
  input: Record<any, any>;
  output: Record<any, any>;
  status: 'succeeded' | 'failed' | 'running' | 'rejected' | 'retry' | 'error';
  startTime: string | null;
  endTime: string | null;
  logId: string | null;
  transitionExecutions: Record<string, Array<string>> | null;
  completedBy: Array<string>;
};

export type WorkflowExecutionList = {
  executions: Array<Required<WorkflowExecution>>;
  workflowId: string;
  status?: 'succeeded' | 'failed' | 'running' | 'rejected';
  nextToken: string | null;
};

export type GroundTruth = {
  /** maxLength: 36, minLength: 1, pattern: ^[0-9A-Za-z_]+$ */
  label: string;
  /** maxLength: 64, minLength: 1 */
  value: string | boolean | null;
};

export type DeleteDocumentOptions = PaginationOptions & {
  batchId?: string | Array<string>;
  consentId?: string | Array<string>;
  datasetId?: string | Array<string>;
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
  containsPersonallyIdentifiableInformation: boolean;
  createdTime: string;
  description: string;
  name: string;
  numDocuments: number;
  retentionInDays: number;
  storageLocation: 'EU';
};

export type CreateBatchOptions = {
  name?: string;
  description?: string;
  containsPersonallyIdentifiableInformation?: boolean;
}

export type UpdateBatchOptions = {
  description?: string;
  name?: string;
}

export type BatchList = {
  batches: Array<Batch>;
  nextToken: string | null;
};

export type ListBatchesOptions = PaginationOptions;

export type Dataset = {
  containsPersonallyIdentifiableInformation: boolean;
  createdTime: string;
  datasetId: string;
  description: string;
  name: string;
  numberOfDocuments: number;
  retentionInDays: number;
  storageLocation: 'EU';
  updatedTime: string;
  version: number;
};

export type CreateDatasetOptions = {
  name?: string;
  description?: string;
  containsPersonallyIdentifiableInformation?: boolean;
}

export type UpdateDatasetOptions = {
  description?: string;
  name?: string;
}

export type DatasetList = {
  datasets: Array<Dataset>;
  nextToken: string | null;
};

export type ListDatasetsOptions = PaginationOptions;

export type DataBundle = {
  createdTime: string;
  dataBundleId: string;
  datasets: Array<Dataset>;
  description: string;
  modelId: string;
  name: string;
  status: 'ready' | 'processing' | 'failed';
  summary: Record<string, any>;
  updatedTime: string;
};

export type CreateDataBundleOptions = {
  name?: string;
  description?: string;
}

export type UpdateDataBundleOptions = {
  description?: string;
  name?: string;
}

export type DataBundleList = {
  dataBundles: Array<DataBundle>;
  nextToken: string | null;
};

export type ListDataBundleOptions = PaginationOptions;

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
  nextToken: string | null;
};

export type Secret = {
  secredId: string;
  description: string | null;
  name: string | null;
};

export type ListSecretsOptions = PaginationOptions;

export type SecretList = {
  secrets: Array<Secret>;
  nextToken: string | null;
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
  batchId?: string;
  consentId?: string;
  content: string;
  contentType: ContentType;
  datasetId?: string;
  documentId: string;
  groundTruth?: Array<GroundTruth>;
};

export type UpdateOrganizationOptions = {
  description?: string;
  name?: string;
}

export type Organization = {
  description: string | null;
  monthlyNumberOfDataBundlesAllowed: number;
  monthlyNumberOfDataBundlesCreated: number;
  monthlyNumberOfDocumentsAllowed: number;
  monthlyNumberOfDocumentsCreated: number;
  monthlyNumberOfPredictionsAllowed: number;
  monthlyNumberOfPredictionsCreated: number;
  monthlyNumberOfTransitionExecutionsAllowed: number;
  monthlyNumberOfTransitionExecutionsCreated: number;
  monthlyNumberOfWorkflowExecutionsAllowed: number;
  monthlyNumberOfWorkflowExecutionsCreated: number;
  monthlyUsageSummary: Record<string, any>;
  name: string | null;
  numberOfAppClientsAllowed: number;
  numberOfAppClientsCreated: number;
  numberOfAssetsAllowed: number;
  numberOfAssetsCreated: number;
  numberOfBatchesAllowed: number;
  numberOfBatchesCreated: number;
  numberOfDatasetsAllowed: number;
  numberOfDatasetsCreated: number;
  numberOfModelsAllowed: number;
  numberOfModelsCreated: number;
  numberOfSecretsAllowed: number;
  numberOfSecretsCreated: number;
  numberOfTransitionsAllowed: number;
  numberOfTransitionsCreated: number;
  numberOfUsersAllowed: number;
  numberOfUsersCreated: number;
  numberOfWorkflowsAllowed: number;
  numberOfWorkflowsCreated: number;
  organizationId: string;
};

export type CreateAppClientOptions = {
  callbackUrls?: Array<string>;
  description?: string;
  generateSecret?: boolean;
  logoutUrls?: Array<string>;
  loginUrls?: Array<string>;
  defaultLoginUrl?: string;
  name?: string;
}

export type UpdateAppClientOptions = {
  defaultLoginUrl?: string;
  description?: string;
  loginUrls?: Array<string>;
  name?: string;
}

export type AppClient = {
  apiKey: string;
  appClientId: string;
  callbackUrls: Array<string> | null;
  clientId: string;
  clientSecret?: string;
  createdTime: string | null;
  description: string | null;
  hasSecret: boolean;
  logoutUrls: Array<string> | null;
  loginUrls: Array<string> | null;
  defaultLoginUrl: string | null;
  name: string | null;
  updatedTime: string | null;
};

export type AppClientList = {
  appClients: Array<AppClient>;
  nextToken: string | null;
};

export type ListAppClientsOptions = PaginationOptions;

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

export type FieldConfig = Record<string, Field>;

export type CreateModelOptions = {
  description?: string;
  name?: string;
  preprocessConfig?: PreprocessConfig;
}

export type UpdateModelOptions = {
  description?: string;
  fieldConfig?: FieldConfig;
  height?: number;
  name?: string;
  preprocessConfig?: PreprocessConfig;
  status?: 'training';
  width?: number;
}

export type Model = {
  createdTime: string | null;
  description: string | null;
  fieldConfig: FieldConfig | null;
  height: number;
  modelId: string;
  name: string | null;
  preprocessConfig: PreprocessConfig;
  status: 'active' | 'inactive' | 'training';
  updatedTime: string | null;
  width: number;
}

export type ListModelsOptions = PaginationOptions;

export type ModelList = {
  models: Array<Model>;
  nextToken: string | null;
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
