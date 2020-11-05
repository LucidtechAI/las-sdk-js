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
