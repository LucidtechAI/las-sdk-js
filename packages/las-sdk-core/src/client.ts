import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Credentials } from './credentials';
import {
  Asset,
  Assets,
  AuthorizationHeaders,
  AxiosFn,
  Batch,
  ContentType,
  GroundTruth,
  LasDocument,
  LasDocumentList,
  PatchTransistionExecutionId,
  PostDocuments,
  PostPredictions,
  PostTransitionParams,
  PostTransitions,
  PostWorkflows,
  PredictionResponse,
  Transition,
  TransitionExecution,
  TransitionList,
  TransitionType,
  User,
  UserList,
  Workflow,
  WorkflowExecution,
  WorkflowExecutionList,
  WorkflowList,
  WorkflowSpecification,
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
   * @param content Content to POST
   * @param contentType MIME type for the document handle
   * @param consentId Id of the consent that marks the owner of the document handle
   * @param batchId Id of the associated batch
   * @param groundTruth List of GroundTruth items representing the ground truth values for the document
   * @returns Document response from REST API
   */
  createDocument(
    content: string,
    contentType: ContentType,
    consentId?: string,
    batchId?: string,
    groundTruth?: Array<GroundTruth>,
  ): Promise<LasDocument> {
    let body: PostDocuments = {
      content: Buffer.from(content).toString('base64'),
      contentType,
    };

    if (consentId) {
      body = { ...body, consentId };
    }
    if (batchId) {
      body = { ...body, batchId };
    }

    if (groundTruth) {
      body = { ...body, groundTruth };
    }

    return this.makePostRequest<LasDocument>('/documents', body);
  }

  /**
   * Get document from the REST API, calls the GET /documents/{documentId} endpoint.
   *
   * @param documentId Id of the document
   * @returns Document response from REST API
   */
  getDocument(documentId: string): Promise<LasDocument> {
    return this.makeGetRequest<LasDocument>(`/documents/${documentId}`);
  }

  /**
   * List documents available for inference, calls the GET /documents endpoint.
   *
   * @param batchId Ids of the batches that contains the documents of interest
   * @param consentId Ids of the consents that marks the owner of the document handle
   * @param maxResults Maximum number of results to be returned
   * @param nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Documents response from REST API
   */
  listDocuments(
    batchId?: string | Array<string>,
    consentId?: string | Array<string>,
    maxResults?: number,
    nextToken?: string,
  ): Promise<LasDocumentList> {
    const query = {
      batchId,
      consentId,
      maxResults,
      nextToken,
    };
    return this.makeGetRequest<LasDocumentList>('/documents', query);
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
  updateDocument(documentId: string, groundTruth: Array<GroundTruth>): Promise<LasDocument> {
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
  deleteDocuments(consentId?: string | Array<string>): Promise<LasDocumentList> {
    const query = consentId ? { consentId } : undefined;

    return this.makeDeleteRequest<LasDocumentList>('/documents', query);
  }

  /**
   * Creates a transition handle, calls the POST /transitions endpoint.
   *
   * @param transitionType Type of transition "docker"|"manual"
   * @param inputJsonSchema Json-schema that defines the input to the transition
   * @param outputJsonSchema Json-schema that defines the output of the transition
   * @param params Extra parameters to the transition
   * @returns Transition response from REST API
   */
  createTransition(
    name: string,
    transitionType: TransitionType,
    inputJsonSchema: object,
    outputJsonSchema: object,
    description?: string,
    params?: PostTransitionParams,
  ): Promise<Transition> {
    let body: PostTransitions = {
      transitionType,
      inputJsonSchema,
      outputJsonSchema,
      name,
      description,
    };

    if (params) {
      body = { ...body, params };
    }

    return this.makePostRequest<Transition>('/transitions', body);
  }

  /**
   * List transitions, calls the GET /transitions endpoint.
   *
   * @param transitionType Types of transitions
   * @param maxResults Maximum number of results to be returned
   * @param nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returnsTransitions response from REST API
   */
  listTransitions(transitionType?: string | Array<string>, maxResults?: number, nextToken?: string): Promise<TransitionList> {
    const query = { transitionType, maxResults, nextToken };
    return this.makeGetRequest('/transitions', query);
  }

  /**
   * Start executing a manual transition, calls the POST /transitions/{transitionId}/executions endpoint.
   *
   * @param transitionId Id of the transition
   * @returns Transition execution response from REST API
   */
  executeTransition(transitionId: string): Promise<TransitionExecution> {
    return this.makePostRequest<TransitionExecution>(`/transitions/${transitionId}/executions`, {});
  }

  /**
   * Ends the processing of the transition execution, calls the
   * PATCH /transitions/{transition_id}/executions/{execution_id} endpoint.
   *
   * @param transitionId Id of the transition that performs the execution
   * @param executionId Id of the execution to update
   * @param status Status of the execution 'succeeded|failed'
   * @param output Output from the execution, required when status is 'succeded'
   * @param error Error from the execution, required when status is 'failed', needs to contain 'message'
   * @returns Transition execution response from REST API
   */
  updateTransitionExecution(
    transitionId: string,
    executionId: string,
    status: 'succeeded' | 'failed' | 'retry',
    output?: object,
    error?: { message: string },
  ): Promise<TransitionExecution> {
    let body: PatchTransistionExecutionId = {
      status,
    };

    if (output) {
      body = { ...body, output };
    }

    if (error) {
      body = { ...body, error };
    }

    return this.makePatchRequest<TransitionExecution>(`/transitions/${transitionId}/executions/${executionId}`, body);
  }

  /**
   * Creates a new workflow, calls the POST /workflows endpoint.
   *
   * @param specification Specification of the workflow
   * @param name Name of the workflow
   * @param description Description of the workflow
   * @param errorConfig Configuration of error handler
   * @returns Workflow response from REST API
   */
  createWorkflow(
    specification: WorkflowSpecification,
    name: string,
    description?: string,
    errorConfig?: { email: string },
  ): Promise<Workflow> {
    let body: PostWorkflows = {
      name,
      specification,
    };

    if (description) {
      body = { ...body, description };
    }

    if (errorConfig) {
      body = { ...body, errorConfig };
    }

    return this.makePostRequest<Workflow>('/workflows', body);
  }

  /**
   * List workflows, calls the GET /workflows endpoint.
   * @param maxResults Maximum number of results to be returned
   * @param nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Workflows response from REST API
   */
  listWorkflows(maxResults?: number, nextToken?: string): Promise<WorkflowList> {
    const query = { maxResults, nextToken };
    return this.makeGetRequest<WorkflowList>('/workflows', query);
  }

  /**
   * Delete the workflow with the provided workflowId, calls the DELETE /workflows/{workflowId} endpoint.
   *
   * @param workflowId Id of the workflow
   * @returns Workflow response from REST API
   */
  deleteWorkflow(workflowId: string): Promise<Workflow> {
    return this.makeDeleteRequest<Workflow>(`/workflows/${workflowId}`);
  }

  /**
   * Start a workflow execution, calls the POST /workflows/{workflowId}/executions endpoint.
   *
   * @param workflowId Id of the workflow
   * @param input Input to the first step of the workflow
   * @returns Workflow execution response from REST API
   */
  executeWorkflow(workflowId: string, input: object): Promise<WorkflowExecution> {
    const body = {
      input,
    };

    return this.makePostRequest<WorkflowExecution>(`/workflows/${workflowId}/executions`, body);
  }

  /**
   * List executions in a workflow, calls the GET /workflows/{workflowId}/executions endpoint.
   *
   * @param workflowId Id of the workflow
   * @param status Statuses of the executions
   * @param maxResults Maximum number of results to be returned
   * @param nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Workflow executions responses from REST API
   */
  listWorkflowExecutions(
    workflowId: string,
    status?: string | Array<string>,
    maxResults?: number,
    nextToken?: string,
  ): Promise<WorkflowExecutionList> {
    const query = { status, maxResults, nextToken };

    return this.makeGetRequest<WorkflowExecutionList>(`/workflows/${workflowId}/executions`, query);
  }

  /**
   * Create a prediction on a document using specified model, calls the POST /predictions endpoint.
   *
   * @param documentId Id of the document to run inference and create a prediction on
   * @param modelId Id of the model to use for inference
   * @param maxPages Maximum number of pages to run predictions on
   * @param autoRotate Whether or not to let the API try different rotations on the document when running predictions
   * @returns Predicion response from REST API
   */
  createPrediction(
    documentId: string,
    modelId: string,
    maxPages?: number,
    autoRotate?: boolean,
  ): Promise<PredictionResponse> {
    let body: PostPredictions = {
      documentId,
      modelId,
    };

    if (maxPages !== undefined) {
      body = { ...body, maxPages };
    }

    if (autoRotate !== undefined) {
      body = { ...body, autoRotate };
    }

    return this.makePostRequest<PredictionResponse>('/predictions', body);
  }

  /**
   * Creates an asset handle, calls the POST /assets endpoint.
   *
   * @param content Content to POST
   * @returns Asset response from REST API
   */
  createAsset(content: string): Promise<Asset> {
    return this.makePostRequest<Asset>('/assets', { content: Buffer.from(content).toString('base64') });
  }

  /**
   * List assets available, calls the GET /assets endpoint.
   *
   * @param maxResults Maximum number of results to be returned
   * @param nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Assets response from REST API without the content of each asset
   */
  listAssets(maxResults?: number, nextToken?: string): Promise<Assets> {
    const query = { maxResults, nextToken };
    return this.makeGetRequest<Assets>('/assets', query);
  }

  /**
   * Get asset from the REST API, calls the GET /assets/{assetId} endpoint.
   *
   * @param assetId Id of the asset
   * @returns Asset response from REST API
   */
  getAsset(assetId: string): Promise<Asset> {
    return this.makeGetRequest(`/assets/${assetId}`);
  }

  /**
   * Updates an asset, calls the PATCH /assets/assetId endpoint.
   *
   * @param assetId Id of the asset
   * @param content Content to PATCH
   * @returns Asset response from REST API with content
   */
  updateAsset(assetId: string, content: string): Promise<Asset> {
    return this.makePatchRequest(`/assets/${assetId}`, { content: Buffer.from(content).toString('base64') });
  }

  /**
   * Creates a batch, calls the POST /batches endpoint.
   *
   * @param description Description of the batch
   * @returns Batch response from REST API
   */
  createBatch(description: string): Promise<Batch> {
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
  createUser(email: string): Promise<User> {
    return this.makePostRequest<User>('/users', { email });
  }

  /**
   * List users, calls the GET /users endpoint.
   *
   * @param maxResults Maximum number of results to be returned
   * @param nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns User response from REST API
   */
  listUsers(maxResults?: number, nextToken?: string): Promise<UserList> {
    const query = { maxResults, nextToken };
    return this.makeGetRequest<UserList>('/users', query);
  }

  /**
   * Get information about a specific user, calls the GET /users/{user_id} endpoint.
   *
   * @param userId Id of the user
   * @returns User response from REST API
   */
  getUser(userId: string): Promise<User> {
    return this.makeGetRequest<User>(`/users/${userId}`);
  }

  /**
   * Delete the user with the provided user_id, calls the DELETE /users/{userId} endpoint.
   *
   * @param userId Id of the user
   * @returns User response from REST API
   */
  deleteUser(userId: string): Promise<User> {
    return this.makeDeleteRequest(`/users/${userId}`);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  makeGetRequest<T = any>(path: string, query?: any): Promise<T> {
    return this.makeAuthorizedRequest<T>(axios.get, buildURL(path, query));
  }

  makeDeleteRequest<T = any>(path: string, query?: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.delete, buildURL(path, query));
  }

  makePostRequest<T = any>(path: string, body: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.post, path, body);
  }

  makePatchRequest<T = any>(path: string, body: any): Promise<T> {
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
