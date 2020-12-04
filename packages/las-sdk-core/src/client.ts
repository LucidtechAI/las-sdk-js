import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Credentials } from './credentials';
import {
  Asset,
  Assets,
  AuthorizationHeaders,
  AxiosFn,
  Batch,
  CreateDocumentOptions,
  CreatePredictionOptions,
  CreateTransitionOptions,
  CreateWorkflowOptions,
  GroundTruth,
  LasDocument,
  LasDocumentList,
  ListDocumentsOptions,
  ListTransitionOptions,
  ListWorkflowExecutionsOptions,
  PaginationInput,
  PatchTransition,
  PatchWorkflow,
  PostPredictions,
  PredictionResponse,
  Secret,
  SecretInput,
  SecretList,
  Transition,
  TransitionExecution,
  TransitionExecutionList,
  TransitionExecutionListOptions,
  TransitionList,
  UpdateTransitionExecution,
  User,
  UserList,
  Workflow,
  WorkflowExecution,
  WorkflowExecutionList,
  WorkflowList,
} from './types';
import { buildURL } from './utils';

/**
 * A high-level http client for communicating with the Lucidtech REST API
 */
export class Client {
  credentials: Credentials;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
  }

  /**
   * Creates a document handle, calls the POST /documents endpoint.
   *
   * @param input.content Content to POST
   * @param input.contentType MIME type for the document handle
   * @param input.consentId Id of the consent that marks the owner of the document handle
   * @param input.batchId Id of the associated batch
   * @param input.groundTruth List of GroundTruth items representing the ground truth values for the document
   * @returns Document response from REST API
   */
  async createDocument(input: CreateDocumentOptions): Promise<LasDocument> {
    const { content, ...rest } = input;
    const body: CreateDocumentOptions = {
      content: Buffer.from(content).toString('base64'),
      ...rest,
    };

    return this.makePostRequest<LasDocument>('/documents', body);
  }

  /**
   * Get document from the REST API, calls the GET /documents/{documentId} endpoint.
   *
   * @param documentId Id of the document
   * @returns Document response from REST API
   */
  async getDocument(documentId: string): Promise<LasDocument> {
    return this.makeGetRequest<LasDocument>(`/documents/${documentId}`);
  }

  /**
   * List documents available for inference, calls the GET /documents endpoint.
   *
   * @param queryParameters.batchId Ids of the batches that contains the documents of interest
   * @param queryParameters.consentId Ids of the consents that marks the owner of the document handle
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Documents response from REST API
   */
  async listDocuments(queryParameters?: ListDocumentsOptions): Promise<LasDocumentList> {
    return this.makeGetRequest<LasDocumentList>('/documents', queryParameters);
  }

  /**
   * Post ground truth to the REST API, calls the PATCH /documents/{documentId} endpoint.
   * Posting ground truth means posting the ground truth data for the particular document.
   * This enables the API to learn from past mistakes.
   *
   * @param documentId Id of the document
   * @param groundTruth List of GroundTruth items representing the ground truth values for the document
   * @returns Document response from REST API
   */
  async updateDocument(documentId: string, groundTruth: Array<GroundTruth>): Promise<LasDocument> {
    const body = {
      groundTruth,
    };

    return this.makePatchRequest<LasDocument>(`/documents/${documentId}`, body);
  }

  /**
   * Delete documents with the provided consentId, calls the DELETE /documents endpoint.
   * Will delete all documents when no consentId is provided.
   *
   * @param consentId Ids of the consents that marks the owner of the document handle
   * @returns Documents response from REST API
   */
  async deleteDocuments(consentId?: string | Array<string>): Promise<LasDocumentList> {
    const query = consentId ? { consentId } : undefined;

    return this.makeDeleteRequest<LasDocumentList>('/documents', query);
  }

  /**
   * Creates a transition handle, calls the POST /transitions endpoint.
   *
   * @param input.transitionType Type of transition "docker"|"manual"
   * @param input.inputJsonSchema Json-schema that defines the input to the transition
   * @param input.outputJsonSchema Json-schema that defines the output of the transition
   * @param input.params Extra parameters to the transition
   * @returns Transition response from REST API
   */
  async createTransition(input: CreateTransitionOptions): Promise<Transition> {
    return this.makePostRequest<Transition>('/transitions', input);
  }

  /**
   * List transitions, calls the GET /transitions endpoint.
   *
   * @param queryParameters.transitionType Types of transitions
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Transitions response from REST API
   */
  async listTransitions(queryParameters?: ListTransitionOptions): Promise<TransitionList> {
    return this.makeGetRequest('/transitions', queryParameters);
  }

  /**
   * Updates a transition, calls the PATCH /transitions/transitionId endpoint.
   * @param transitionId Id of the transition
   * @param transitionUpdate Transition fields to PATCH
   * @returns Transition response from REST API
   */
  async updateTransition(transitionId: string, transitionUpdate: PatchTransition): Promise<Transition> {
    return this.makePatchRequest<Transition>(`/transitions/${transitionId}`, transitionUpdate);
  }

  /**
   * Start executing a manual transition, calls the POST /transitions/{transitionId}/executions endpoint.
   *
   * @param transitionId Id of the transition
   * @returns Transition execution response from REST API
   */
  async executeTransition(transitionId: string): Promise<TransitionExecution> {
    return this.makePostRequest<TransitionExecution>(`/transitions/${transitionId}/executions`, {});
  }

  /**
   * Ends the processing of the transition execution, calls the
   * PATCH /transitions/{transition_id}/executions/{execution_id} endpoint.
   *
   * @param transitionId Id of the transition that performs the execution
   * @param executionId Id of the execution to update
   * @param input.status Status of the execution 'succeeded|failed'
   * @param input.output Output from the execution, required when status is 'succeded'
   * @param input.error Error from the execution, required when status is 'failed', needs to contain 'message'
   * @returns Transition execution response from REST API
   */
  async updateTransitionExecution(
    transitionId: string,
    executionId: string,
    input: UpdateTransitionExecution,
  ): Promise<TransitionExecution> {
    return this.makePatchRequest<TransitionExecution>(`/transitions/${transitionId}/executions/${executionId}`, input);
  }

  /**
   * List executions in a transition, calls the GET /transitions/{transitionId}/executions endpoint.
   *
   * @param transitionId Id of the transition
   * @param queryParameters.status Statuses of the executions
   * @param queryParameters.executionId Ids of the executions
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Transition executions responses from REST API
   */
  async listTransitionExecutions(
    transitionId: string,
    queryParameters?: TransitionExecutionListOptions,
  ): Promise<TransitionExecutionList> {
    return this.makeGetRequest<TransitionExecutionList>(`/transitions/${transitionId}/executions`, queryParameters);
  }

  /**
   * Creates a new workflow, calls the POST /workflows endpoint.
   *
   * @param input.specification Specification of the workflow
   * @param input.name Name of the workflow
   * @param input.description Description of the workflow
   * @param input.errorConfig Configuration of error handler
   * @returns Workflow response from REST API
   */
  async createWorkflow(input: CreateWorkflowOptions): Promise<Workflow> {
    return this.makePostRequest<Workflow>('/workflows', input);
  }

  /**
   * List workflows, calls the GET /workflows endpoint.
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Workflows response from REST API
   */
  async listWorkflows(queryParameters?: PaginationInput): Promise<WorkflowList> {
    return this.makeGetRequest<WorkflowList>('/workflows', queryParameters);
  }

  /**
   * Delete the workflow with the provided workflowId, calls the DELETE /workflows/{workflowId} endpoint.
   *
   * @param workflowId Id of the workflow
   * @returns Workflow response from REST API
   */
  async deleteWorkflow(workflowId: string): Promise<Workflow> {
    return this.makeDeleteRequest<Workflow>(`/workflows/${workflowId}`);
  }

  /**
   * Updates a workflow, calls the PATCH /workflows/workflowId endpoint.
   * @param workflowId Id of the workflow
   * @param workflowUpdate Workflow fields to PATCH
   * @returns Workflow response from REST API
   */
  async updateWorkflow(workflowId: string, workflowUpdate: PatchWorkflow): Promise<Workflow> {
    return this.makePatchRequest<Workflow>(`/workflows/${workflowId}`, workflowUpdate);
  }

  /**
   * Start a workflow execution, calls the POST /workflows/{workflowId}/executions endpoint.
   *
   * @param workflowId Id of the workflow
   * @param input Input to the first step of the workflow
   * @returns Workflow execution response from REST API
   */
  async executeWorkflow(workflowId: string, input: object): Promise<WorkflowExecution> {
    const body = {
      input,
    };

    return this.makePostRequest<WorkflowExecution>(`/workflows/${workflowId}/executions`, body);
  }

  /**
   * List executions in a workflow, calls the GET /workflows/{workflowId}/executions endpoint.
   *
   * @param workflowId Id of the workflow
   * @param queryParameters.status Statuses of the executions
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Workflow executions responses from REST API
   */
  async listWorkflowExecutions(
    workflowId: string,
    queryParameters?: ListWorkflowExecutionsOptions,
  ): Promise<WorkflowExecutionList> {
    return this.makeGetRequest<WorkflowExecutionList>(`/workflows/${workflowId}/executions`, queryParameters);
  }

  /**
   * Deletes the execution with the provided execution_id from workflow_id,
   * calls the DELETE /workflows/{workflowId}/executions/{executionId} endpoint.
   *
   * @param workflowId Id of the workflow
   * @param executionId Id of the execution
   * @returns WorkflowExecution response from REST API
   */
  async deleteWorkflowExecution(workflowId: string, executionId: string): Promise<WorkflowExecution> {
    return this.makeDeleteRequest(`/workflows/${workflowId}/executions/${executionId}`);
  }

  /**
   * Create a prediction on a document using specified model, calls the POST /predictions endpoint.
   *
   * @param documentId Id of the document to run inference and create a prediction on
   * @param modelId Id of the model to use for inference
   * @param options.maxPages Maximum number of pages to run predictions on
   * @param options.autoRotate Whether or not to let the API try different rotations on the document
   * when running predictions
   * @returns Predicion response from REST API
   */
  async createPrediction(
    documentId: string,
    modelId: string,
    options?: CreatePredictionOptions,
  ): Promise<PredictionResponse> {
    let body: PostPredictions = {
      documentId,
      modelId,
    };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<PredictionResponse>('/predictions', body);
  }

  /**
   * Creates an asset handle, calls the POST /assets endpoint.
   *
   * @param content Content to POST
   * @returns Asset response from REST API
   */
  async createAsset(content: string): Promise<Asset> {
    return this.makePostRequest<Asset>('/assets', { content: Buffer.from(content).toString('base64') });
  }

  /**
   * List assets available, calls the GET /assets endpoint.
   *
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Assets response from REST API without the content of each asset
   */
  async listAssets(queryParameters?: PaginationInput): Promise<Assets> {
    return this.makeGetRequest<Assets>('/assets', queryParameters);
  }

  /**
   * Get asset from the REST API, calls the GET /assets/{assetId} endpoint.
   *
   * @param assetId Id of the asset
   * @returns Asset response from REST API
   */
  async getAsset(assetId: string): Promise<Asset> {
    return this.makeGetRequest(`/assets/${assetId}`);
  }

  /**
   * Updates an asset, calls the PATCH /assets/assetId endpoint.
   *
   * @param assetId Id of the asset
   * @param content Content to PATCH
   * @returns Asset response from REST API with content
   */
  async updateAsset(assetId: string, content: string): Promise<Asset> {
    return this.makePatchRequest(`/assets/${assetId}`, { content: Buffer.from(content).toString('base64') });
  }

  /**
   * Creates a batch, calls the POST /batches endpoint.
   *
   * @param description Description of the batch
   * @returns Batch response from REST API
   */
  async createBatch(description: string): Promise<Batch> {
    const body = {
      description,
    };

    return this.makePostRequest<Batch>('/batches', body);
  }

  /**
   * Creates a new user, calls the POST /users endpoint.
   *
   * @param email Email to the new user
   * @returns User response from REST API
   */
  async createUser(email: string): Promise<User> {
    return this.makePostRequest<User>('/users', { email });
  }

  /**
   * List users, calls the GET /users endpoint.
   *
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns User response from REST API
   */
  async listUsers(queryParameters?: PaginationInput): Promise<UserList> {
    return this.makeGetRequest<UserList>('/users', queryParameters);
  }

  /**
   * Get information about a specific user, calls the GET /users/{user_id} endpoint.
   *
   * @param userId Id of the user
   * @returns User response from REST API
   */
  async getUser(userId: string): Promise<User> {
    return this.makeGetRequest<User>(`/users/${userId}`);
  }

  /**
   * Delete the user with the provided user_id, calls the DELETE /users/{userId} endpoint.
   *
   * @param userId Id of the user
   * @returns User response from REST API
   */
  async deleteUser(userId: string): Promise<User> {
    return this.makeDeleteRequest(`/users/${userId}`);
  }

  /**
   * Creates an secret handle, calls the POST /secrets endpoint.
   *
   * @param input.data Object containing the data you want to keep secret
   * @param input.description Description of the secret
   * @returns Secret response from REST API
   */
  async createSecret(input: SecretInput): Promise<Secret> {
    return this.makePostRequest<Secret>('/secrets', input);
  }

  /**
   * List secrets available, calls the GET /secrets endpoint.
   *
   * @param queryParameters.maxResults Maximum number of results to be returned
   * @param queryParameters.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Secrets response from REST API without the username of each secret
   */
  async listSecrets(queryParameters?: PaginationInput): Promise<SecretList> {
    return this.makeGetRequest<SecretList>('/secrets', queryParameters);
  }

  /**
   * Updates a secret, calls the PATCH /secrets/secretId endpoint.
   *
   * @param secretId Id of the secret
   * @param input.data Object containing the data you want to keep secret
   * @param input.description Description of the secret
   */
  async updateSecret(secretId: string, input: SecretInput): Promise<Secret> {
    return this.makePatchRequest(`/secrets/${secretId}`, input);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  async makeGetRequest<T = any>(path: string, query?: any): Promise<T> {
    return this.makeAuthorizedRequest<T>(axios.get, buildURL(path, query));
  }

  async makeDeleteRequest<T = any>(path: string, query?: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.delete, buildURL(path, query));
  }

  async makePostRequest<T = any>(path: string, body: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.post, path, body);
  }

  async makePatchRequest<T = any>(path: string, body: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.patch, path, body);
  }

  private async makeAuthorizedRequest<T = any>(axiosFn: AxiosFn, path: string, body?: any): Promise<T> {
    const endpoint = `${this.credentials.apiEndpoint}${path}`;
    const headers = await this.getAuthorizationHeaders();
    const config: AxiosRequestConfig = { headers };
    const handle = body
      ? (): Promise<AxiosResponse<T>> => axiosFn<T>(endpoint, body, config)
      : (): Promise<AxiosResponse<T>> => axiosFn<T>(endpoint, config);

    return (await handle()).data;
  }
  /* eslint-enable */

  private async getAuthorizationHeaders(): Promise<AuthorizationHeaders> {
    const accessToken = await this.credentials.getAccessToken();
    return {
      'X-Api-Key': this.credentials.apiKey,
      Authorization: `Bearer ${accessToken}`,
    };
  }
}

export default Client;
