import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ContentType = 'application/pdf' | 'image/jpeg';

export interface PostDocuments {
  content: string;
  contentType: ContentType;
  feedback?: Array<Feedback>;
  consentId?: string;
  batchId?: string;
}

export type LasDocumentList = {
  documents: Array<LasDocument>;
  consentId?: string;
  batchId?: string;
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
}

export type PostTransitionParams = PostTransitionDockerParams | PostTransitionManualParams

export type TransitionType = 'docker' | 'manual';

export type PostTransitions = {
  transitionType: TransitionType;
  inputJsonSchema: object;
  outputJsonSchema: object;
  params?: PostTransitionParams;
};

export type Transition = {
  transitionId: string;
  transitionType: TransitionType;
  outputJsonSchema?: unknown;
  inputJsonSchema: unknown;
};

export type TransitionList = {
  transitions: Array<Transition>;
}

export type PatchTransistionExecutionId = {
  status: 'succeeded' | 'failed';
  error?: {
    message: string;
  };
  output?: object;
};

export type TransitionExecution = {
  executionId: string;
  input: unknown;
  status: 'succeeded' | 'failed' | 'running' | 'aborted';
  transitionId: string;
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

export type WorkflowList = {
  workflows: Array<Workflow>;
};

export type PostWorkflows = {
  name: string;
  specification: WorkflowSpecification;
  description?: string;
  errorConfig?: {
    email: string;
  };
};

export type WorkflowExecution = {
  executionId: string;
  workflowId: string;
  status?: 'succeeded' | 'failed' | 'running' | 'aborted';
};

export type WorkflowExecutionList = {
  executions: Array<WorkflowExecution>;
  workflowId: string;
  status?: 'succeeded' | 'failed' | 'running' | 'aborted';
};

export type Feedback = {
  /** maxLength: 36, minLength: 1, pattern: ^[0-9A-Za-z_]+$ */
  label: string;
  /** maxLength: 64, minLength: 1 */
  value: string | null;
};

export type PostPredictions = {
  documentId: string;
  modelId: string;
  maxPages?: number;
  autoRotate?: boolean;
}

export type Prediction = Feedback & {
  /** minimum: 0, maximum: 1 */
  confidence: number;
};

export type PredictionResponse = {
  documentId: string;
  predictions?: Array<Prediction>;
}

export type Batch = {
  batchId: string;
  description: string;
}

export type User = {
  userId: string;
  email: string;
}

export type UserList = {
  users: Array<User>;
}

export type LasDocument = {
  contentType: ContentType;
  /** pattern: ^las:document:[a-f0-9]{32}$ */
  documentId: string;
  feedback?: Array<Feedback>;
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
}

export type Assets = {
  assets: Array<Asset>;
}

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
