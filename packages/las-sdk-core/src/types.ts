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
}

export type PostTransitionParams = {
  environment?: object;
  /** maximum 4096, minimum 512 */
  memory?: number;
  credentials?: {
    password: string;
    username: string;
  };
  imageUrl: string;
  /** maximum 2048, minimum 256 */
  cpu?: number;
}

export type PostTransitions = {
  transitionType: 'docker' | 'manual';
  inputJsonSchema: object;
  outputJsonSchema: object;
  params?: PostTransitionParams;
}

export type PatchTransistionExecutionId = {
  status: 'succeeded' | 'failed';
  error?: {
    message: string;
  };
  output?: object;
}

export type WorkflowSpecification = {
  definition: object;
  language?: 'ASL';
  version?: '1.0.0';
}

export type PostWorkflows = {
  name: string;
  specification: WorkflowSpecification;
  description?: string;
  errorConfig?: {
    email: string;
  };
}

export type Feedback = {
  /** maxLength: 36, minLength: 1, pattern: ^[0-9A-Za-z_]+$ */
  label: string;
  /** maxLength: 64, minLength: 1 */
  value: string | null;
}

export type Prediction = Feedback & {
  /** minimum: 0, maximum: 1 */
  confidence: number;
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
}

export type AuthorizationHeaders = {
    'X-Api-Key': string;
    Authorization: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AxiosFn = <T = any, R = AxiosResponse<T>>(url: string, body?: any, config?: AxiosRequestConfig) => Promise<R>
