import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

import { Credentials } from './credentials';
import {
  AppClient,
  AppClientList,
  Asset,
  AssetList,
  AuthorizationHeaders,
  AxiosFn,
  Batch,
  BatchList,
  ContentType,
  CreateAppClientOptions,
  CreateBatchOptions,
  CreateDatasetOptions,
  CreateDocumentOptions,
  CreateModelOptions,
  CreatePredictionsOptions,
  CreateSecretOptions,
  CreateTransitionOptions,
  CreateUserOptions,
  CreateWorkflowOptions,
  Dataset,
  DatasetList,
  DeleteDocumentOptions,
  FieldConfig,
  LasDocument,
  LasDocumentList,
  LasDocumentWithoutContent,
  ListAppClientsOptions,
  ListAssetsOptions,
  ListBatchesOptions,
  ListDatasetsOptions,
  ListDocumentsOptions,
  ListModelsOptions,
  ListPredictionsOptions,
  ListSecretsOptions,
  ListTransitionOptions,
  ListUsersOptions,
  ListWorkflowExecutionsOptions,
  ListWorkflowOptions,
  Log,
  Model,
  ModelList,
  Organization,
  PostPredictions,
  PredictionList,
  PredictionResponse,
  Secret,
  SecretList,
  Transition,
  TransitionExecution,
  TransitionExecutionList,
  TransitionExecutionListOptions,
  TransitionList,
  TransitionType,
  UpdateAppClientOptions,
  UpdateAssetOptions,
  UpdateBatchOptions,
  UpdateDatasetOptions,
  UpdateDocumentOptions,
  UpdateModelOptions,
  UpdateOrganizationOptions,
  UpdateSecretOptions,
  UpdateTransitionExecution,
  UpdateTransitionOptions,
  UpdateUserOptions,
  UpdateWorkflowExecutionOptions,
  UpdateWorkflowOptions,
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
   * Updates an organization, calls the PATCH /organizations/{organizationId} endpoint.
   *
   * @param organizationId Id of the organization
   * @param options.description Description of organization
   * @param options.name Name of organization
   * @returns Organization response from REST API with content
   */
  async updateOrganization(organizationId: string, options: UpdateOrganizationOptions): Promise<Organization> {
    return this.makePatchRequest(`/organizations/${organizationId}`, options);
  }

  /**
   * Get organization from the REST API, calls the GET /organizations/{organizationId} endpoint.
   *
   * @param organizationId Id of the organization
   * @returns Organization response from REST API
   */
  async getOrganization(organizationId: string): Promise<Organization> {
    return this.makeGetRequest<Organization>(`/organizations/${organizationId}`);
  }

  /**
   * Creates an app client, calls the POST /appClients endpoint.
   *
   * @param options.callbackUrls List of callback urls
   * @param options.description Description of app client
   * @param options.generateSecret Set to true to generate credentials for the client_credentials grant type
   * @param options.logoutUrls List of logout urls
   * @param options.name Name of app client
   * @returns AppClient response from REST API
   */
  async createAppClient(options: CreateAppClientOptions): Promise<AppClient> {
    return this.makePostRequest<AppClient>('/appClients', options);
  }

  /**
   * Updates an appClient, calls the PATCH /appClients/{appClientId} endpoint.
   *
   * @param appClientId Id of the appClient
   * @param options.description Description of app client
   * @param options.name Name of app client
   * @returns AppClient response from REST API with content
   */
  async updateAppClient(appClientId: string, options: UpdateAppClientOptions): Promise<AppClient> {
    return this.makePatchRequest(`/appClients/${appClientId}`, options);
  }

  /**
   * List app clients, calls the GET /appClients endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns AppClientList response from REST API
   */
  async listAppClients(options?: ListAppClientsOptions): Promise<AppClientList> {
    return this.makeGetRequest<AppClientList>('/appClients', options);
  }

  /**
   * Delete the app client, calls the DELETE /appClients/{appClientId} endpoint.
   *
   * @param appClientId of the app client
   * @returns AppClient response from REST API
   */
  async deleteAppClient(appClientId: string): Promise<AppClient> {
    return this.makeDeleteRequest(`/appClients/${appClientId}`);
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
  async createDocument(
    content: string | Buffer,
    contentType: ContentType,
    options?: CreateDocumentOptions,
  ): Promise<LasDocumentWithoutContent> {
    const encodedContent = typeof content === 'string' ? content : Buffer.from(content).toString('base64');
    let body = {
      content: encodedContent,
      contentType,
    };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<LasDocumentWithoutContent>('/documents', body);
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
   * @param data.groundTruth List of GroundTruth items representing the ground truth values for the document
   * @returns Document response from REST API
   */
  async updateDocument(documentId: string, data: UpdateDocumentOptions): Promise<LasDocument> {
    return this.makePatchRequest<LasDocument>(`/documents/${documentId}`, data);
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
   * Delete an document, calls the DELETE /documents/{documentId} endpoint.
   *
   * @param documentId of the app client
   * @returns Document response from REST API
   */
  async deleteDocument(documentId: string): Promise<LasDocument> {
    return this.makeDeleteRequest(`/documents/${documentId}`);
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
  async createTransition(transitionType: TransitionType, options?: CreateTransitionOptions): Promise<Transition> {
    let body = {
      transitionType,
    };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<Transition>('/transitions', body);
  }

  /**
   * Get the transition with the provided transitionId, calls the GET /transitions/{transitionId} endpoint.
   *
   * @param transitionId Id of the transition
   * @returns Transition response from REST API
   */
  async getTransition(transitionId: string): Promise<Transition> {
    return this.makeGetRequest(`/transitions/${transitionId}`);
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
   * Updates a transition, calls the PATCH /transitions/{transitionId} endpoint.
   *
   * @param transitionId Id of the transition
   * @param data Transition fields to PATCH
   * @returns Transition response from REST API
   */
  async updateTransition(transitionId: string, data: UpdateTransitionOptions): Promise<Transition> {
    return this.makePatchRequest<Transition>(`/transitions/${transitionId}`, data);
  }

  /**
   * Delete the transition with the provided transitionId, calls the DELETE /transitions/{transitionId} endpoint.
   * Will fail if transition is in use by one or more workflows.
   *
   * @param transitionId Id of the transition
   * @returns Transition response from REST API
   */
  async deleteTransition(transitionId: string): Promise<Transition> {
    return this.makeDeleteRequest(`/transitions/${transitionId}`);
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
   * Get an execution of a transition, calls the GET /transitions/{transitionId}/executions/{executionId} endpoint
   *
   * @param transitionId Id of the transition
   * @param transitionExecutionId Id of the execution
   * @returns Transition execution responses from REST API
   */
  async getTransitionExecution(transitionId: string, transitionExecutionId: string): Promise<TransitionExecution> {
    return this.makeGetRequest(`/transitions/${transitionId}/executions/${transitionExecutionId}`);
  }

  /**
   * Ends the processing of the transition execution, calls the
   * PATCH /transitions/{transitionId}/executions/{executionId} endpoint.
   *
   * @param transitionId Id of the transition that performs the execution
   * @param executionId Id of the execution to update
   * @param data.status Status of the execution 'succeeded|failed'
   * @param data.output Output from the execution, required when status is 'succeded'
   * @param data.error Error from the execution, required when status is 'failed', needs to contain 'message'
   * @param data.startTime Utc start time that will replace the original start time of the execution
   * @returns Transition execution response from REST API
   */
  async updateTransitionExecution(
    transitionId: string,
    executionId: string,
    data: UpdateTransitionExecution,
  ): Promise<TransitionExecution> {
    return this.makePatchRequest<TransitionExecution>(`/transitions/${transitionId}/executions/${executionId}`, data);
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
   * Send heartbeat for a manual execution to signal that we are still working on it.
   * Must be done at minimum once every 60 seconds or the transition execution will time out.
   * Calls the POST /transitions/{transitionId}/executions/{executionId}/heartbeats endpoint.
   *
   * @param transitionId Id of the transition
   * @param transitionExecutionId Id of the transition execution
   * @returns Empty response
   */
  async sendHeartbeat(transitionId: string, transitionExecutionId: string): Promise<unknown> {
    return this.makePostRequest(`/transitions/${transitionId}/executions/${transitionExecutionId}/heartbeats`, {});
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
   * Get the workflow with the provided workflowId, calls the GET /workflows/{workflowId} endpoint.
   *
   * @param workflowId Id of the workflow
   * @returns Workflow response from REST API
   */
  async getWorkflow(workflowId: string): Promise<Workflow> {
    return this.makeGetRequest(`/workflows/${workflowId}`);
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
   * Updates a workflow, calls the PATCH /workflows/{workflowId} endpoint.
   * @param workflowId Id of the workflow
   * @param data Workflow fields to PATCH
   * @returns Workflow response from REST API
   */
  async updateWorkflow(workflowId: string, data: UpdateWorkflowOptions): Promise<Workflow> {
    return this.makePatchRequest<Workflow>(`/workflows/${workflowId}`, data);
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
   * Get a workflow execution, calls the GET /workflows/{workflowId}/executions/{executionId} endpoint.
   *
   * @param workflowId Id of the workflow that performs the execution
   * @param executionId Id of the execution to get
   * @returns Workflow execution response from REST API
   */
  async getWorkflowExecution(workflowId: string, executionId: string): Promise<WorkflowExecution> {
    return this.makeGetRequest(`/workflows/${workflowId}/executions/${executionId}`);
  }

  /**
   * Retry or end the processing of a workflow execution,
   * calls the PATCH /workflows/{workflowId}/executions/{executionId} endpoint.
   *
   * @param workflowId Id of the workflow that performs the execution
   * @param executionId Id of the execution to update
   * @param data.nextTransitionId The next transition to transition into. To end the workflow-execution,
   *  use: las:transition:commons-failed.
   * @returns Workflow execution response from REST API
   */
  async updateWorkflowExecution(
    workflowId: string,
    executionId: string,
    data: UpdateWorkflowExecutionOptions,
  ): Promise<WorkflowExecution> {
    return this.makePatchRequest(`/workflows/${workflowId}/executions/${executionId}`, data);
  }

  /**
   * Deletes the execution with the provided executionId from workflowId,
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
   * @param options.imageQuality: Image quality for prediction ("LOW|HIGH"). High quality could give
   * better result but will also take longer time.
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
   * Delete an asset, calls the DELETE /assets/{assetId} endpoint.
   *
   * @param assetId of the app client
   * @returns Asset response from REST API
   */
  async deleteAsset(assetId: string): Promise<Asset> {
    return this.makeDeleteRequest(`/assets/${assetId}`);
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
   * Updates an asset, calls the PATCH /assets/{assetId} endpoint.
   *
   * @param assetId Id of the asset
   * @param data.content Content to PATCH (base64-encoded string | Buffer)
   * @returns Asset response from REST API with content
   */
  async updateAsset(assetId: string, data: UpdateAssetOptions): Promise<Asset> {
    let body;
    if (data) {
      body = { ...data };
      if (data.content) {
        const encodedContent = typeof data.content === 'string' ? data.content : Buffer.from(data.content).toString('base64');
        body = { ...body, content: encodedContent };
      }
    }

    return this.makePatchRequest(`/assets/${assetId}`, body);
  }

  /**
   * Creates a dataset, calls the POST /datasets endpoint.
   *
   * @param options.name Name of the dataset
   * @param options.description Description of the dataset
   * @returns Dataset response from REST API
   */
  async createDataset(options: CreateDatasetOptions): Promise<Dataset> {
    return this.makePostRequest<Dataset>('/datasets', options);
  }

  /**
   * Updates an dataset, calls the PATCH /datasets/{datasetId} endpoint.
   *
   * @param datasetId Id of the dataset
   * @param options.description Description of dataset
   * @param options.name Name of dataset
   * @returns Dataset response from REST API with content
   */
  async updateDataset(datasetId: string, options: UpdateDatasetOptions): Promise<Dataset> {
    return this.makePatchRequest(`/datasets/${datasetId}`, options);
  }

  /**
   * List datasets, calls the GET /datasets endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns DatasetList response from REST API
   */
  async listDatasets(options?: ListDatasetsOptions): Promise<DatasetList> {
    return this.makeGetRequest<DatasetList>('/datasets', options);
  }

  /**
   * Deletes a dataset, calls the DELETE /datasets/{datasetId} endpoint.
   *
   * @param datasetId Id of the dataset
   * @param deleteDocuments Set to true to delete documents in dataset before deleting dataset
   * @returns Dataset response from REST API
   */
  async deleteDataset(datasetId: string, deleteDocuments = false): Promise<Dataset> {
    if (deleteDocuments) {
      let response = await this.deleteDocuments({ datasetId });
      while (response.nextToken) {
        // eslint-disable-next-line no-await-in-loop
        response = await this.deleteDocuments({ datasetId, nextToken: response.nextToken });
      }
    }

    return this.makeDeleteRequest<Dataset>(`/datasets/${datasetId}`);
  }

  /**
   * @deprecated Use the new {@link Client.createDataset} method instead.
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
   * Updates an batch, calls the PATCH /batches/{batchId} endpoint.
   *
   * @deprecated Use the new {@link Client.updateDataset} method instead.
   * @param batchId Id of the batch
   * @param options.description Description of batch
   * @param options.name Name of batch
   * @returns Batch response from REST API with content
   */
  async updateBatch(batchId: string, options: UpdateBatchOptions): Promise<Batch> {
    return this.makePatchRequest(`/batches/${batchId}`, options);
  }

  /**
   * List batches, calls the GET /batches endpoint.
   *
   * @deprecated Use the new {@link Client.listDatasets} method instead.
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns BatchList response from REST API
   */
  async listBatches(options?: ListBatchesOptions): Promise<BatchList> {
    return this.makeGetRequest<BatchList>('/batches', options);
  }

  /**
   * Deletes a batch, calls the DELETE /batches/{batchId} endpoint.
   *
   * @deprecated Use the new {@link Client.deleteDataset} method instead.
   * @param batchId Id of the batch
   * @param deleteDocuments Set to true to delete documents in batch before deleting batch
   * @returns Batch response from REST API
   */
  async deleteBatch(batchId: string, deleteDocuments = false): Promise<Batch> {
    if (deleteDocuments) {
      let response = await this.deleteDocuments({ batchId });
      while (response.nextToken) {
        // eslint-disable-next-line no-await-in-loop
        response = await this.deleteDocuments({ batchId, nextToken: response.nextToken });
      }
    }

    return this.makeDeleteRequest<Batch>(`/batches/${batchId}`);
  }

  /**
   * Creates a new user, calls the POST /users endpoint.
   *
   * @param email Email to the new user
   * @param data.name Name of the user
   * @param data.avatar base64 encoded JPEG avatar of the user
   * @returns User response from REST API
   */
  async createUser(email: string, data?: CreateUserOptions): Promise<User> {
    let body = { email };
    if (data) {
      body = { ...body, ...data };
    }
    return this.makePostRequest<User>('/users', body);
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
   * Get information about a specific user, calls the GET /users/{userId} endpoint.
   *
   * @param userId Id of the user
   * @returns User response from REST API
   */
  async getUser(userId: string): Promise<User> {
    return this.makeGetRequest<User>(`/users/${userId}`);
  }

  /**
   * Updates a user, calls the PATCH /users/{userId} endpoint.
   *
   * @param userId Id of the user
   * @param data.name Name of the user
   * @param data.avatar base64 encoded JPEG avatar of the user
   * @returns User response from REST API
   */
  async updateUser(userId: string, data: UpdateUserOptions): Promise<User> {
    return this.makePatchRequest(`/users/${userId}`, data);
  }

  /**
   * Delete a user, calls the DELETE /users/{userId} endpoint.
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
   * Creates a model, calls the POST /models endpoint.
   *
   * @param fieldConfig Specification of the fields that the model is going to predict
   * @param width The number of pixels to be used for the input image width of your model
   * @param height The number of pixels to be used for the input image height of your model
   * @param options.description Description of the model
   * @param options.name Name of the model
   * @param options.preprocessConfig Specification of the processing steps prior to the prediction of an image
   * @returns Model response from REST API
   */
  async createModel(
    fieldConfig: FieldConfig,
    width: number,
    height: number,
    options?: CreateModelOptions,
  ): Promise<Model> {
    let body = { fieldConfig, width, height };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<Model>('/models', body);
  }

  /**
   * Get model from the REST API, calls the GET /models/{modelId} endpoint.
   *
   * @param modelId Id of the model
   * @returns Model response from REST API
   */
  async getModel(modelId: string): Promise<Model> {
    return this.makeGetRequest(`/models/${modelId}`);
  }

  /**
   * Updates a model, calls the PATCH /models/{modelId} endpoint.
   *
   * @param modelId Id of the model
   * @param options.description Description of the model
   * @param options.fieldConfig Specification of the fields that the model is going to predict
   * @param options.height The number of pixels to be used for the input image height of your model
   * @param options.name Name of the model
   * @param options.preprocessConfig Specification of the processing steps prior to the prediction of an image
   * @param options.status Update status to training
   * @param options.width The number of pixels to be used for the input image width of your model
   * @returns Model response from REST API
   */
  async updateModel(modelId: string, options: UpdateModelOptions): Promise<Model> {
    return this.makePatchRequest(`/models/${modelId}`, options);
  }

  /**
   * Delete an model, calls the DELETE /models/{modelId} endpoint.
   *
   * @param modelId of the app client
   * @returns Model response from REST API
   */
  async deleteModel(modelId: string): Promise<Model> {
    return this.makeDeleteRequest(`/models/${modelId}`);
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
   * Get log, calls the GET /logs/{logId} endpoint.
   *
   * @param logId Id of the log
   * @returns Log response from REST API
   */
  async getLog(logId: string): Promise<Log> {
    return this.makeGetRequest<Log>(`/logs/${logId}`);
  }

  /**
   * Updates a secret, calls the PATCH /secrets/{secretId} endpoint.
   *
   * @param secretId Id of the secret
   * @param data.data Object containing the data you want to keep secret
   * @param data.description Description of the secret
   * @param data.name Name of the secret
   */
  async updateSecret(secretId: string, data: UpdateSecretOptions): Promise<Secret> {
    return this.makePatchRequest(`/secrets/${secretId}`, data);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  async makeGetRequest<T>(path: string, query?: any): Promise<T> {
    return this.makeAuthorizedRequest<T>(axios.get, buildURL(path, query));
  }

  async makeDeleteRequest<T>(path: string, query?: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.delete, buildURL(path, query));
  }

  async makePostRequest<T>(path: string, body: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.post, path, body);
  }

  async makePatchRequest<T>(path: string, body: any): Promise<T> {
    return this.makeAuthorizedRequest(axios.patch, path, body);
  }

  private async makeAuthorizedRequest<T>(axiosFn: AxiosFn, path: string, body?: any): Promise<T> {
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
