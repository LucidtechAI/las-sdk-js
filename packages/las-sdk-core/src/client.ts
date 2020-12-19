import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

import { Credentials } from './credentials';
import {
  Asset,
  AssetList,
  AuthorizationHeaders,
  AxiosFn,
  Batch,
  ContentType,
  DeleteDocumentOptions,
  LasDocument,
  LasDocumentList,
  ListAssetsOptions,
  ListDocumentsOptions,
  ListSecretsOptions,
  ListTransitionOptions,
  ListUsersOptions,
  ListWorkflowExecutionsOptions,
  ListWorkflowOptions,
  UpdateAssetOptions,
  UpdateDocumentOptions,
  UpdateSecretOptions,
  UpdateTransitionExecution,
  UpdateTransitionOptions,
  UpdateWorkflowOptions,
  CreateBatchOptions,
  CreateDocumentOptions,
  PostPredictions,
  CreatePredictionsOptions,
  CreateSecretOptions,
  CreateTransitionOptions,
  CreateWorkflowOptions,
  PredictionResponse,
  Secret,
  SecretList,
  Transition,
  TransitionExecution,
  TransitionExecutionList,
  TransitionExecutionListOptions,
  TransitionList,
  TransitionType,
  User,
  UserList,
  Workflow,
  WorkflowExecution,
  WorkflowExecutionList,
  WorkflowList,
  WorkflowSpecification,
  ListModelsOptions,
  ModelList,
  ListPredictionsOptions,
  PredictionList,
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
   * @param content Content to POST (base64 string | Buffer)
   * @param contentType MIME type for the document handle
   * @param options.consentId Id of the consent that marks the owner of the document handle
   * @param options.batchId Id of the associated batch
   * @param options.groundTruth List of GroundTruth items representing the ground truth values for the document
   * @returns Document response from REST API
   */
  async createDocument(content: string | Buffer, contentType: ContentType, options?: CreateDocumentOptions): Promise<LasDocument> {
    const encodedContent = typeof content === 'string' ? content : Buffer.from(content).toString('base64');
    let body = {
      content: encodedContent,
      contentType,
    };

    if (options) {
      body = { ...body, ...options };
    }

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
   * @param options.batchId Ids of the batches that contains the documents of interest
   * @param options.consentId Ids of the consents that marks the owner of the document handle
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Documents response from REST API
   */
  async listDocuments(options?: ListDocumentsOptions): Promise<LasDocumentList> {
    return this.makeGetRequest<LasDocumentList>('/documents', options);
  }

  /**
   * Post ground truth to the REST API, calls the PATCH /documents/{documentId} endpoint.
   * Posting ground truth means posting the ground truth data for the particular document.
   * This enables the API to learn from past mistakes.
   *
   * @param documentId Id of the document
   * @param update.groundTruth List of GroundTruth items representing the ground truth values for the document
   * @returns Document response from REST API
   */
  async updateDocument(documentId: string, update: UpdateDocumentOptions): Promise<LasDocument> {
    return this.makePatchRequest<LasDocument>(`/documents/${documentId}`, update);
  }

  /**
   * Delete documents with the provided consentId, calls the DELETE /documents endpoint.
   * Will delete all documents when no consentId is provided.
   *
   * @param options.consentId Ids of the consents that marks the owner of the document handle
   * @returns Documents response from REST API
   */
  async deleteDocuments(options?: DeleteDocumentOptions): Promise<LasDocumentList> {
    return this.makeDeleteRequest<LasDocumentList>('/documents', options);
  }

  /**
   * Creates a transition handle, calls the POST /transitions endpoint.
   *
   * @param name Name of transition
   * @param transitionType Type of transition "docker"|"manual"
   * @param options.inputJsonSchema Json-schema that defines the input to the transition
   * @param options.outputJsonSchema Json-schema that defines the output of the transition
   * @param options.description Description of the transition
   * @param options.params Extra parameters to the transition
   * @returns Transition response from REST API
   */
  async createTransition(
    transitionType: TransitionType,
    options?: CreateTransitionOptions,
  ): Promise<Transition> {
    let body = {
      transitionType,
    };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<Transition>('/transitions', body);
  }

  /**
   * List transitions, calls the GET /transitions endpoint.
   *
   * @param options.transitionType Types of transitions
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Transitions response from REST API
   */
  async listTransitions(options?: ListTransitionOptions): Promise<TransitionList> {
    return this.makeGetRequest('/transitions', options);
  }

  /**
   * Updates a transition, calls the PATCH /transitions/transitionId endpoint.
   *
   * @param transitionId Id of the transition
   * @param update Transition fields to PATCH
   * @returns Transition response from REST API
   */
  async updateTransition(transitionId: string, update: UpdateTransitionOptions): Promise<Transition> {
    return this.makePatchRequest<Transition>(`/transitions/${transitionId}`, update);
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
   * @param update.status Status of the execution 'succeeded|failed'
   * @param update.output Output from the execution, required when status is 'succeded'
   * @param update.error Error from the execution, required when status is 'failed', needs to contain 'message'
   * @returns Transition execution response from REST API
   */
  async updateTransitionExecution(
    transitionId: string,
    executionId: string,
    update: UpdateTransitionExecution,
  ): Promise<TransitionExecution> {
    return this.makePatchRequest<TransitionExecution>(`/transitions/${transitionId}/executions/${executionId}`, update);
  }

  /**
   * List executions in a transition, calls the GET /transitions/{transitionId}/executions endpoint.
   *
   * @param transitionId Id of the transition
   * @param options.status Statuses of the executions
   * @param options.executionId Ids of the executions
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Transition executions responses from REST API
   */
  async listTransitionExecutions(
    transitionId: string,
    options?: TransitionExecutionListOptions,
  ): Promise<TransitionExecutionList> {
    return this.makeGetRequest<TransitionExecutionList>(`/transitions/${transitionId}/executions`, options);
  }

  /**
   * Creates a new workflow, calls the POST /workflows endpoint.
   *
   * @param name Name of the workflow
   * @param specification Specification of the workflow
   * @param options.description Description of the workflow
   * @param options.errorConfig Configuration of error handler
   * @returns Workflow response from REST API
   */
  async createWorkflow(
    name: string,
    specification: WorkflowSpecification,
    options?: CreateWorkflowOptions,
  ): Promise<Workflow> {
    let body = {
      name,
      specification,
    };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<Workflow>('/workflows', body);
  }

  /**
   * List workflows, calls the GET /workflows endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Workflows response from REST API
   */
  async listWorkflows(options?: ListWorkflowOptions): Promise<WorkflowList> {
    return this.makeGetRequest<WorkflowList>('/workflows', options);
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
   * @param update Workflow fields to PATCH
   * @returns Workflow response from REST API
   */
  async updateWorkflow(workflowId: string, update: UpdateWorkflowOptions): Promise<Workflow> {
    return this.makePatchRequest<Workflow>(`/workflows/${workflowId}`, update);
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
   * @param options.status Statuses of the executions
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @param options.sortBy What field to sort by ('startTime' | 'endTime')
   * @param options.order Sort order ('ascending' | 'descending')
   * @returns Workflow executions responses from REST API
   */
  async listWorkflowExecutions(
    workflowId: string,
    options?: ListWorkflowExecutionsOptions,
  ): Promise<WorkflowExecutionList> {
    return this.makeGetRequest<WorkflowExecutionList>(`/workflows/${workflowId}/executions`, options);
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
    options?: CreatePredictionsOptions,
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

  async listPredictions(options?: ListPredictionsOptions): Promise<PredictionList> {
    return this.makeGetRequest<PredictionList>('/predictions', options);
  }

  /**
   * Creates an asset handle, calls the POST /assets endpoint.
   *
   * @param content Content to POST (base64-encoded string | Buffer)
   * @returns Asset response from REST API
   */
  async createAsset(content: string): Promise<Asset> {
    const encodedContent = typeof content === 'string' ? content : Buffer.from(content).toString('base64');
    return this.makePostRequest<Asset>('/assets', { content: encodedContent });
  }

  /**
   * List assets available, calls the GET /assets endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Assets response from REST API without the content of each asset
   */
  async listAssets(options?: ListAssetsOptions): Promise<AssetList> {
    return this.makeGetRequest<AssetList>('/assets', options);
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
   * @param update.content Content to PATCH (base64-encoded string | Buffer)
   * @returns Asset response from REST API with content
   */
  async updateAsset(assetId: string, update: UpdateAssetOptions): Promise<Asset> {
    let body;
    if (update) {
      body = { ...update };
      if (update.content) {
        const encodedContent = typeof update.content === 'string' ? update.content : Buffer.from(update.content).toString('base64');
        body = { ...body, content: encodedContent };
      }
    }

    return this.makePatchRequest(`/assets/${assetId}`, body);
  }

  /**
   * Creates a batch, calls the POST /batches endpoint.
   *
   * @param options.name Name of the batch
   * @param options.description Description of the batch
   * @returns Batch response from REST API
   */
  async createBatch(options: CreateBatchOptions): Promise<Batch> {
    return this.makePostRequest<Batch>('/batches', options);
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
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns User response from REST API
   */
  async listUsers(options?: ListUsersOptions): Promise<UserList> {
    return this.makeGetRequest<UserList>('/users', options);
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
   * @param data Object containing the data you want to keep secret
   * @param options.description Description of the secret
   * @returns Secret response from REST API
   */
  async createSecret(data: Record<any, any>, options?: CreateSecretOptions): Promise<Secret> {
    let body = { data };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<Secret>('/secrets', body);
  }

  /**
   * List secrets available, calls the GET /secrets endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Secrets response from REST API without the username of each secret
   */
  async listSecrets(options?: ListSecretsOptions): Promise<SecretList> {
    return this.makeGetRequest<SecretList>('/secrets', options);
  }

  /**
   * List models available, calls the GET /models endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Models response from the REST API
   */
  async listModels(options?: ListModelsOptions): Promise<ModelList> {
    return this.makeGetRequest<ModelList>('/models', options);
  }

  /**
   * Updates a secret, calls the PATCH /secrets/secretId endpoint.
   *
   * @param secretId Id of the secret
   * @param update.data Object containing the data you want to keep secret
   * @param update.description Description of the secret
   */
  async updateSecret(secretId: string, update: UpdateSecretOptions): Promise<Secret> {
    return this.makePatchRequest(`/secrets/${secretId}`, update);
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
