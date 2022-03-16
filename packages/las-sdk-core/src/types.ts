/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestConfig = { requestConfig?: Pick<AxiosRequestConfig, 'signal'> };

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;

export type ContentType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/tiff';

export type GroundTruth = {
  /** maxLength: 36, minLength: 1, pattern: ^[0-9A-Za-z_]+$ */
  label: string;
  /** maxLength: 64, minLength: 1 */
  value: string | boolean | null;
};

export type LasDocument = {
  consentId?: string;
  content: string;
  contentType: ContentType;
  datasetId?: string;
  name: string | null;
  description: string | null;
  documentId: string;
  groundTruth?: Array<GroundTruth>;
  retentionInDays: number;
  createdTime: string | null;
  updatedTime: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  metadata: Record<string, JSONValue> | null;
};

export type LasDocumentWithoutContent = Omit<LasDocument, 'content'>;

export type CreateDocumentOptions = RequestConfig & {
  consentId?: string;
  datasetId?: string;
  name?: string | null;
  description?: string | null;
  groundTruth?: Array<GroundTruth>;
  retentionInDays?: number;
  metadata?: Record<string, JSONValue> | null;
};

export type UpdateDocumentOptions = RequestConfig & {
  groundTruth?: Array<GroundTruth>;
  retentionInDays?: number;
  name?: string | null;
  description?: string | null;
  metadata?: Record<string, JSONValue> | null;
};

export type GetDocumentOptions = RequestConfig;

export type DeleteDocumentsOptions = RequestConfig &
  PaginationOptions & {
    consentId?: string | Array<string>;
    datasetId?: string | Array<string>;
  };

export type ListDocumentsOptions = RequestConfig &
  PaginationOptions & {
    consentId?: string | Array<string>;
    datasetId?: string | Array<string>;
  };

export type DeleteDocumentOptions = RequestConfig;

export type LasDocumentList = {
  documents: Array<LasDocumentWithoutContent>;
  nextToken: string | null;
};

export type BestFirst = {
  strategy: 'BEST_FIRST';
};

export type BestNPages = {
  strategy: 'BEST_N_PAGES';
  parameters: {
    n: 1 | 2 | 3;
    collapse?: boolean;
  };
};

export type PostprocessConfig = BestFirst | BestNPages;

export type CreatePredictionsOptions = RequestConfig & {
  maxPages?: number;
  autoRotate?: boolean;
  imageQuality?: 'LOW' | 'HIGH';
  postprocessConfig?: PostprocessConfig;
  trainingId?: string;
};

export interface PaginationOptions {
  maxResults?: number;
  nextToken?: string;
}

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
    status?: string | Array<string>;
    sortBy?: 'startTime' | 'endTime';
    order?: 'ascending' | 'descending';
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

export type ListPredictionsOptions = RequestConfig & PaginationOptions;

export type PredictionList = {
  predictions: Array<PredictionResponse>;
  nextToken: string | null;
};

export type CreateAssetOptions = RequestConfig;

export type DeleteAssetOptions = RequestConfig;

export type Dataset = {
  containsPersonallyIdentifiableInformation: boolean;
  createdBy: string | null;
  createdTime: string;
  datasetId: string;
  description: string;
  groundTruthSummary: Record<string, number>;
  name: string;
  numberOfDocuments: number;
  retentionInDays: number;
  storageLocation: 'EU';
  updatedBy: string | null;
  updatedTime: string;
  version: number;
  metadata: Record<string, JSONValue> | null;
};

export type CreateDatasetOptions = RequestConfig & {
  name?: string;
  description?: string;
  containsPersonallyIdentifiableInformation?: boolean;
  retentionInDays?: number;
  metadata?: Record<string, JSONValue> | null;
};

export type UpdateDatasetOptions = RequestConfig & {
  description?: string;
  name?: string;
  retentionInDays?: number;
  containsPersonallyIdentifiableInformation?: boolean;
  metadata?: Record<string, JSONValue> | null;
};

export type DatasetList = {
  datasets: Array<Dataset>;
  nextToken: string | null;
};

export type GetDatasetOptions = RequestConfig;

export type ListDatasetsOptions = RequestConfig & PaginationOptions;

export type DeleteDatasetOptions = RequestConfig;

export type DataBundle = {
  createdBy: string | null;
  createdTime: string;
  dataBundleId: string;
  datasets: Array<Dataset>;
  description: string | null;
  modelId: string;
  name: string | null;
  status: 'succeeded' | 'running' | 'failed';
  summary: Record<string, any>;
  updatedBy: string | null;
  updatedTime: string;
};

export type CreateDataBundleOptions = RequestConfig & {
  name?: string;
  description?: string;
};

export type DeleteDataBundleOptions = RequestConfig;

export type UpdateDataBundleOptions = RequestConfig & {
  description?: string;
  name?: string;
};

export type DataBundleList = {
  dataBundles: Array<DataBundle>;
  nextToken: string | null;
};

export type ListDataBundleOptions = RequestConfig & PaginationOptions;

export type User = {
  avatar: string | null;
  createdBy: string | null;
  createdTime: string | null;
  email: string;
  name: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
  userId: string;
};

export type CreateUserOptions = RequestConfig & {
  name?: string;
  avatar?: string;
  appClientId?: string;
};

export type UpdateUserOptions = RequestConfig & {
  name?: string | null;
  avatar?: string | null;
};

export type ListUsersOptions = RequestConfig & PaginationOptions;

export type GetUserOptions = RequestConfig;

export type DeleteUserOptions = RequestConfig;

export type UserList = {
  users: Array<User>;
  nextToken: string | null;
};

export type Secret = {
  secredId: string;
  description: string | null;
  name: string | null;
};

export type ListSecretsOptions = RequestConfig & PaginationOptions;

export type SecretList = {
  secrets: Array<Secret>;
  nextToken: string | null;
};

export type CreateSecretOptions = RequestConfig & {
  description?: string;
};

export type UpdateSecretOptions = RequestConfig & {
  data?: Record<any, any>;
  description?: string | null;
  name?: string | null;
};

export type GetOrganizationOptions = RequestConfig;

export type UpdateOrganizationOptions = RequestConfig & {
  description?: string;
  name?: string;
};

export type Organization = {
  description: string | null;
  documentRetentionInDays: number;
  monthlyNumberOfActiveModelsUsed: number;
  monthlyNumberOfDataBundlesAllowed: number;
  monthlyNumberOfDataBundlesCreated: number;
  monthlyNumberOfDocumentsAllowed: number;
  monthlyNumberOfDocumentsCreated: number;
  monthlyNumberOfFieldPredictionsUsed: number;
  monthlyNumberOfGpuHoursUsed: number;
  monthlyNumberOfPredictionsAllowed: number;
  monthlyNumberOfPredictionsCreated: number;
  monthlyNumberOfTrainingsAllowed: number;
  monthlyNumberOfTrainingsCreated: number;
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
  planId: string | null;
};

export type CreateAppClientOptions = RequestConfig & {
  callbackUrls?: Array<string>;
  description?: string;
  generateSecret?: boolean;
  logoutUrls?: Array<string>;
  loginUrls?: Array<string>;
  defaultLoginUrl?: string;
  name?: string;
};

export type UpdateAppClientOptions = RequestConfig & {
  defaultLoginUrl?: string;
  description?: string;
  loginUrls?: Array<string>;
  name?: string;
};

export type AppClient = {
  appClientId: string;
  callbackUrls: Array<string> | null;
  clientId: string;
  clientSecret?: string;
  createdBy: string | null;
  createdTime: string | null;
  defaultLoginUrl: string | null;
  description: string | null;
  hasSecret: boolean;
  loginUrls: Array<string> | null;
  logoutUrls: Array<string> | null;
  name: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
};

export type AppClientList = {
  appClients: Array<AppClient>;
  nextToken: string | null;
};

export type ListAppClientsOptions = RequestConfig & PaginationOptions;

export type DeleteAppClientOptions = RequestConfig;

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
};

export type Field = {
  description?: string;
  maxLength?: number;
  enum?: Array<string>;
  type:
    | 'all'
    | 'alphanum'
    | 'alphanumext'
    | 'amount'
    | 'date'
    | 'letter'
    | 'number'
    | 'phone'
    | 'string'
    | 'digits'
    | 'enum';
};

export type FieldConfig = Record<string, Field>;

export type CreateModelOptions = RequestConfig & {
  description?: string;
  name?: string;
  width?: number;
  height?: number;
  preprocessConfig?: PreprocessConfig;
  metadata?: Record<string, JSONValue> | null;
};

export type GetModelOptions = RequestConfig;

export type UpdateModelOptions = RequestConfig & {
  description?: string;
  fieldConfig?: FieldConfig;
  height?: number;
  name?: string;
  preprocessConfig?: PreprocessConfig;
  width?: number;
  metadata?: Record<string, JSONValue> | null;
  trainingId?: string;
};

export type DeleteModelOptions = RequestConfig;

export type Model = {
  createdBy: string | null;
  createdTime: string | null;
  description: string | null;
  fieldConfig: FieldConfig | null;
  height: number;
  modelId: string;
  name: string | null;
  numberOfDataBundles: number;
  numberOfRunningTrainings: number;
  preprocessConfig: PreprocessConfig;
  status: 'active' | 'inactive';
  trainingId: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
  width: number;
  metadata: Record<string, JSONValue> | null;
};

export type TrainingInstanceType = 'small-gpu' | 'medium-gpu' | 'large-gpu';

export type TrainingStatus = 'waiting-for-approval' | 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export type Training = {
  createdBy: string | null;
  createdTime: string | null;
  dataBundleIds: Array<string>;
  description: string | null;
  instanceType: TrainingInstanceType;
  modelId: string;
  name: string | null;
  status: TrainingStatus;
  trainingId: string;
  updatedBy: string | null;
  updatedTime: string | null;
  metadata: Record<string, JSONValue> | null;
};

export type TrainingList = {
  trainings: Array<Training>;
  nextToken: string | null;
  status: Array<TrainingStatus>;
};

export type ListTrainingsOptions = RequestConfig &
  PaginationOptions & { status?: TrainingStatus | Array<TrainingStatus> };

export type CreateTrainingOption = {
  dataBundleIds: [string, ...string[]];
  instanceType?: TrainingInstanceType;
  name?: string | null;
  description?: string | null;
  metadata?: Record<string, JSONValue> | null;
};

export type UpdateTrainingOptions = {
  name?: string | null;
  description?: string | null;
  status?: 'cancelled';
  metadata?: Record<string, JSONValue> | null;
};

export type PlanCurrency = 'NOK' | 'USD' | 'EUR';

export type Plan = {
  billingCycle: number;
  currency: PlanCurrency;
  latest: number;
  name: string | null;
  organizationId: string | null;
  planId: string;
  license?: Record<any, any>;
  gpuHours?: Record<any, any>;
  fieldPredictions?: Record<any, any>;
  activeModels?: Record<any, any>;
  description?: string | null;
};

export type PlanList = {
  plans: Array<Plan>;
  nextToken: string | null;
  owner: Array<string>;
};

export type ListPlansOptions = RequestConfig & PaginationOptions & { owner?: string | Array<string> };

export type ListModelsOptions = RequestConfig & PaginationOptions;

export type ModelList = {
  models: Array<Model>;
  nextToken: string | null;
};

export type UpdateAssetOptions = RequestConfig & {
  content?: string | Buffer;
};

export type ListAssetsOptions = RequestConfig & PaginationOptions;

export type GetAssetOptions = RequestConfig;

export type Log = {
  logId: string;
  events: Array<Record<any, any>>;
  transitionId?: string | null;
};

export type GetLogOptions = RequestConfig;

export type AuthorizationHeaders = {
  Authorization: string;
};

export type AxiosFn = <T = any, R = AxiosResponse<T>>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) => Promise<R>;
