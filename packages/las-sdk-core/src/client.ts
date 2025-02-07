import axios, { AxiosRequestConfig } from 'axios';
import { Buffer } from 'buffer';

import { TrainingList } from '.';
import { Credentials } from './credentials';
import type {
  Action,
  ActionList,
  ActionRun,
  ActionRunList,
  AppClient,
  AppClientList,
  Asset,
  AssetList,
  AuthorizationHeaders,
  AxiosFn,
  CreateActionOptions,
  CreateActionRunOptions,
  CreateAppClientOptions,
  CreateAssetOptions,
  CreateDataBundleOptions,
  CreateDatasetOptions,
  CreateDocumentOptions,
  CreateFunctionOptions,
  CreateHookOptions,
  CreateHookRunOptions,
  CreateInvoiceOptions,
  CreateModelOptions,
  CreatePaymentMethodOptions,
  CreatePredictionsOptions,
  CreateProjectOptions,
  CreateProjectRunOptions,
  CreateSecretOptions,
  CreateTrainingOption,
  CreateUserOptions,
  CreateValidationOptions,
  CreateValidationTaskOptions,
  DataBundle,
  DataBundleList,
  Dataset,
  DatasetList,
  DeleteActionOptions,
  DeleteActionRunOptions,
  DeleteAppClientOptions,
  DeleteAssetOptions,
  DeleteDataBundleOptions,
  DeleteDatasetOptions,
  DeleteDocumentOptions,
  DeleteDocumentsOptions,
  DeleteFunctionOptions,
  DeleteHookOptions,
  DeleteHookRunOptions,
  DeleteInvoiceOptions,
  DeleteModelOptions,
  DeleteProjectOptions,
  DeleteProjectRunOptions,
  DeleteUserOptions,
  DeleteValidationOptions,
  DeleteValidationTaskOptions,
  DeploymentEnvironment,
  DeploymentEnvironmentList,
  Document,
  DocumentList,
  DocumentWithoutContent,
  FieldConfig,
  File,
  Function,
  FunctionList,
  GetActionOptions,
  GetActionRunOptions,
  GetAssetOptions,
  GetDatasetOptions,
  GetDeploymentEnvironmentOptions,
  GetDocumentOptions,
  GetFunctionOptions,
  GetHookOptions,
  GetHookRunOptions,
  GetInvoiceOptions,
  GetLogOptions,
  GetModelOptions,
  GetOrganizationOptions,
  GetProfileOptions,
  GetProjectOptions,
  GetProjectRunOptions,
  GetRoleOptions,
  GetUserOptions,
  GetValidationOptions,
  GetValidationTaskOptions,
  Hook,
  HookList,
  HookRun,
  HookRunList,
  Invoice,
  InvoiceList,
  JSONValue,
  ListActionRunsOptions,
  ListActionsOptions,
  ListAppClientsOptions,
  ListAssetsOptions,
  ListDataBundleOptions,
  ListDatasetsOptions,
  ListDeploymentEnvironmentsOptions,
  ListDocumentsOptions,
  ListFunctionsOptions,
  ListHookRunsOptions,
  ListHooksOptions,
  ListInvoicesOptions,
  ListModelsOptions,
  ListPaymentMethodsOptions,
  ListPlansOptions,
  ListPredictionsOptions,
  ListProjectRunsOptions,
  ListProjectsOptions,
  ListRoleOptions,
  ListSecretsOptions,
  ListTrainingsOptions,
  ListUsersOptions,
  ListValidationsOptions,
  ListValidationTasksOptions,
  Log,
  Model,
  ModelList,
  Organization,
  PaymentMethod,
  PaymentMethodList,
  Plan,
  PlanList,
  PostPredictions,
  Prediction,
  PredictionList,
  Profile,
  Project,
  ProjectList,
  ProjectRun,
  ProjectRunList,
  Role,
  RoleList,
  Secret,
  SecretList,
  Training,
  UpdateActionOptions,
  UpdateActionRunOptions,
  UpdateAppClientOptions,
  UpdateAssetOptions,
  UpdateDataBundleOptions,
  UpdateDatasetOptions,
  UpdateDocumentOptions,
  UpdateFunctionOptions,
  UpdateHookOptions,
  UpdateHookRunOptions,
  UpdateInvoiceOptions,
  UpdateModelOptions,
  UpdateOrganizationOptions,
  UpdatePaymentMethodOptions,
  UpdateProfileOptions,
  UpdateProjectOptions,
  UpdateProjectRunOptions,
  UpdateSecretOptions,
  UpdateTrainingOptions,
  UpdateUserOptions,
  UpdateValidationOptions,
  UpdateValidationTaskOptions,
  User,
  UserList,
  Validation,
  ValidationList,
  ValidationTask,
  ValidationTaskList,
} from './types';
import { buildURL, wait } from './utils';

const maybeParseDate = (val: JSONValue) => {
  if (typeof val === 'string') {
    const re = /2\d{3}-[0-1]\d-[0-3]\dT[0-2]\d:[0-6]\d:[0-6]\d\.\d+(\+0000|Z)/;
    if (val.match(re)) {
      return new Date(val);
    }
  }
  return val;
};

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
  async getOrganization(organizationId: string, options?: GetOrganizationOptions): Promise<Organization> {
    return this.makeGetRequest<Organization>(`/organizations/${organizationId}`, options);
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
  async deleteAppClient(appClientId: string, options?: DeleteAppClientOptions): Promise<AppClient> {
    return this.makeDeleteRequest(`/appClients/${appClientId}`, options);
  }

  /**
   * Creates a document, calls the POST /documents endpoint.
   *
   * @param options Object with create options
   * @returns Document response from REST API
   */
  async createDocument(options?: CreateDocumentOptions): Promise<DocumentWithoutContent> {
    return this.makePostRequest<Document>('/documents', options);
  }

  /**
   * Get document from the REST API, calls the GET /documents/{documentId} endpoint.
   *
   * @param documentId Id of the document
   * @returns Document response from REST API
   */
  async getDocument(documentId: string, options?: GetDocumentOptions): Promise<Document> {
    return this.makeGetRequest<Document>(`/documents/${documentId}`, options);
  }

  /**
   * List documents available for inference, calls the GET /documents endpoint.
   *
   * @param options.consentId Ids of the consents that marks the owner of the document
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Documents response from REST API
   */
  async listDocuments(options?: ListDocumentsOptions): Promise<DocumentList> {
    return this.makeGetRequest<DocumentList>('/documents', options);
  }

  /**
   * Post ground truth to the REST API, calls the PATCH /documents/{documentId} endpoint.
   * Posting ground truth means posting the ground truth data for the particular document.
   * This enables the API to learn from past mistakes.
   *
   * @param documentId Id of the document
   * @param data.groundTruth List of GroundTruth items representing the ground truth values for the document
   * @param data.description Description of document
   * @param data.name Name of document
   * @returns Document response from REST API
   */
  async updateDocument(documentId: string, data: UpdateDocumentOptions): Promise<Document> {
    return this.makePatchRequest<Document>(`/documents/${documentId}`, data);
  }

  /**
   * Delete documents with the provided consentId, calls the DELETE /documents endpoint.
   * Will delete all documents when no consentId is provided.
   *
   * @param options.consentId Ids of the consents that marks the owner of the document
   * @returns Documents response from REST API
   */
  async deleteDocuments(options?: DeleteDocumentsOptions): Promise<DocumentList> {
    return this.makeDeleteRequest<DocumentList>('/documents', options);
  }

  /**
   * Delete an document, calls the DELETE /documents/{documentId} endpoint.
   *
   * @param documentId of the document
   * @returns Document response from REST API
   */
  async deleteDocument(documentId: string, options?: DeleteDocumentOptions): Promise<Document> {
    return this.makeDeleteRequest(`/documents/${documentId}`, options);
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
  async createPrediction(documentId: string, modelId: string, options?: CreatePredictionsOptions): Promise<Prediction> {
    let body: PostPredictions = {
      documentId,
      modelId,
    };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<Prediction>('/predictions', body);
  }

  async listPredictions(options?: ListPredictionsOptions): Promise<PredictionList> {
    return this.makeGetRequest<PredictionList>('/predictions', options);
  }

  /**
   * Creates an asset, calls the POST /assets endpoint.
   *
   * @param content Content to POST (base64-encoded string | Buffer)
   * @returns Asset response from REST API
   */
  async createAsset(content: string, options?: CreateAssetOptions): Promise<Asset> {
    const encodedContent = typeof content === 'string' ? content : Buffer.from(content).toString('base64');
    return this.makePostRequest<Asset>('/assets', { content: encodedContent, ...options });
  }

  /**
   * Delete an asset, calls the DELETE /assets/{assetId} endpoint.
   *
   * @param assetId of the app client
   * @returns Asset response from REST API
   */
  async deleteAsset(assetId: string, options?: DeleteAssetOptions): Promise<Asset> {
    return this.makeDeleteRequest(`/assets/${assetId}`, options);
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
  async getAsset(assetId: string, options?: GetAssetOptions): Promise<Asset> {
    return this.makeGetRequest(`/assets/${assetId}`, options);
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
        const encodedContent =
          typeof data.content === 'string' ? data.content : Buffer.from(data.content).toString('base64');
        body = { ...body, content: encodedContent };
      }
    }

    return this.makePatchRequest(`/assets/${assetId}`, body);
  }

  /**
   * Get dataset from the REST API, calls the GET /datasets/{datasetId} endpoint.
   *
   * @param datasetId Id of the dataset
   * @returns Dataset response from REST API
   */
  async getDataset(datasetId: string, options?: GetDatasetOptions): Promise<Dataset> {
    return this.makeGetRequest(`/datasets/${datasetId}`, options);
  }

  /**
   * Creates a dataset, calls the POST /datasets endpoint.
   *
   * @param options.name Name of the dataset
   * @param options.description Description of the dataset
   * @param options.retentionInDays Maximum retention for documents in the dataset
   * @param options.containsPersonallyIdentifiableInformation If dataset contains personally identifiable information
   * @returns Dataset response from REST API
   */
  async createDataset(options: CreateDatasetOptions): Promise<Dataset> {
    return this.makePostRequest<Dataset>('/datasets', options);
  }

  /**
   * Updates a dataset, calls the PATCH /datasets/{datasetId} endpoint.
   *
   * @param datasetId Id of the dataset
   * @param options.description Description of dataset
   * @param options.name Name of dataset
   * @param options.retentionInDays Maximum retention for documents in the dataset
   * @param options.containsPersonallyIdentifiableInformation If dataset contains personally identifiable information
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
  async deleteDataset(datasetId: string, deleteDocuments = false, options?: DeleteDatasetOptions): Promise<Dataset> {
    if (deleteDocuments) {
      let response = await this.deleteDocuments({ datasetId });
      while (response.nextToken) {
        response = await this.deleteDocuments({ datasetId, nextToken: response.nextToken });
      }

      let WAIT_MS = 1000;
      let TOTAL_WAIT = WAIT_MS;
      const MAX_WAIT_MS = 10000;

      await wait(WAIT_MS);
      let datasetResponse = await this.getDataset(datasetId);

      // wait until we get the updated numberOfDocuments, OR we time out
      while (datasetResponse.numberOfDocuments > 0 && TOTAL_WAIT < MAX_WAIT_MS) {
        // exponentially back off
        WAIT_MS *= 1.25;
        TOTAL_WAIT += WAIT_MS;
        await wait(WAIT_MS);
        datasetResponse = await this.getDataset(datasetId);
      }

      // if the numberOfDocuments has not yet been updated, throw an error
      if (datasetResponse.numberOfDocuments > 0) {
        throw Error('Dataset numberOfDocuments not updated in time');
      }
    }

    return this.makeDeleteRequest<Dataset>(`/datasets/${datasetId}`, options);
  }

  /**
   * Creates a dataBundle, calls the POST /models/{modelId}/dataBundles endpoint.
   *
   * @param modelId Id of the model to create dataBundle for
   * @param datasetIds Ids of the datasets to create dataBundle with
   * @param options.description Description of dataBundle
   * @param options.name Name of dataBundle
   * @returns DataBundle response from REST API
   */
  async createDataBundle(
    modelId: string,
    datasetIds: Array<string>,
    options: CreateDataBundleOptions,
  ): Promise<DataBundle> {
    let body = { datasetIds };

    if (options) {
      body = { ...body, ...options };
    }

    return this.makePostRequest<DataBundle>(`/models/${modelId}/dataBundles`, body);
  }

  /**
   * Delete a dataBundle, calls the DELETE /dataBundles/{dataBundleId} endpoint.
   *
   * @param modelId of the model
   * @param dataBundleId of the dataBundle
   * @returns DataBundle response from REST API
   */
  async deleteDataBundle(
    modelId: string,
    dataBundleId: string,
    options?: DeleteDataBundleOptions,
  ): Promise<DataBundle> {
    return this.makeDeleteRequest(`/models/${modelId}/dataBundles/${dataBundleId}`, options);
  }

  /**
   * List dataBundles available, calls the GET /dataBundles endpoint.
   *
   * @param modelId of the model
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns DataBundles response from REST API
   */
  async listDataBundles(modelId: string, options?: ListDataBundleOptions): Promise<DataBundleList> {
    return this.makeGetRequest<DataBundleList>(`/models/${modelId}/dataBundles`, options);
  }

  /**
   * Updates a dataBundle, calls the PATCH /dataBundles/{dataBundleId} endpoint.
   *
   * @param modelId of the model
   * @param dataBundleId Id of the dataBundle
   * @param options.description Description of dataBundle
   * @param options.name Name of dataBundle
   * @returns DataBundle response from REST API
   */
  async updateDataBundle(modelId: string, dataBundleId: string, options: UpdateDataBundleOptions): Promise<DataBundle> {
    return this.makePatchRequest(`/models/${modelId}/dataBundles/${dataBundleId}`, options);
  }

  /**
   * Creates a new user, calls the POST /users endpoint.
   *
   * @param email Email to the new user
   * @param data.name Name of the user
   * @param data.avatar base64 encoded JPEG avatar of the user
   * @param data.appClientId Id of appClient issuing the invite. Defaults to the current
   * appClientId of the user or appClient issuing the invite
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
  async getUser(userId: string, options?: GetUserOptions): Promise<User> {
    return this.makeGetRequest<User>(`/users/${userId}`, options);
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
  async deleteUser(userId: string, options?: DeleteUserOptions): Promise<User> {
    return this.makeDeleteRequest(`/users/${userId}`, options);
  }

  /**
   * Creates a secret, calls the POST /secrets endpoint.
   *
   * @param data Object containing the data you want to keep secret
   * @param options.description Description of the secret
   * @returns Secret response from REST API
   */
  async createSecret(data: JSONValue, options?: CreateSecretOptions): Promise<Secret> {
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
   * @param options.width The number of pixels to be used for the input image width of your model
   * @param options.height The number of pixels to be used for the input image height of your model
   * @param options.description Description of the model
   * @param options.name Name of the model
   * @param options.preprocessConfig Specification of the processing steps prior to the prediction of an image
   * @returns Model response from REST API
   */
  async createModel(fieldConfig: FieldConfig, options?: CreateModelOptions): Promise<Model> {
    let body = { fieldConfig };

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
  async getModel(modelId: string, options?: GetModelOptions): Promise<Model> {
    return this.makeGetRequest(`/models/${modelId}`, options);
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
   * @param modelId Id of the model
   * @returns Model response from REST API
   */
  async deleteModel(modelId: string, options?: DeleteModelOptions): Promise<Model> {
    return this.makeDeleteRequest(`/models/${modelId}`, options);
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
   * List deployment environments available, calls the GET /deploymentEnvironments endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @param options.owner Organization owner
   * @returns Deployment environments response from the REST API
   */
  async listDeploymentEnvironments(options?: ListDeploymentEnvironmentsOptions): Promise<DeploymentEnvironmentList> {
    return this.makeGetRequest<DeploymentEnvironmentList>('/deploymentEnvironments', options);
  }

  /**
   * Get deployment environment from the REST API, calls the GET /deploymentEnvironments/{deploymentEnvironmentId} endpoint.
   * @param deploymentEnvironmentId Id of the deployment environment
   * @returns Deployment environment response from the REST API
   */
  async getDeploymentEnvironment(
    deploymentEnvironmentId: string,
    options?: GetDeploymentEnvironmentOptions,
  ): Promise<DeploymentEnvironment> {
    return this.makeGetRequest<DeploymentEnvironment>(`/deploymentEnvironments/${deploymentEnvironmentId}`, options);
  }

  /**
   * List trainings available, calls the GET /models/{modelId}/trainings endpoint.
   *
   * @param modelId Id of the model
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @param options.status List Trainings with the specified TrainingStatus, or array of TrainingStatus
   * @returns Trainings response from the REST API
   */
  async listTrainings(modelId: string, options?: ListTrainingsOptions): Promise<TrainingList> {
    return this.makeGetRequest<TrainingList>(`/models/${modelId}/trainings`, options);
  }

  /**
   * Requests a training, calls the POST /models/{modelId}/trainings endpoint.
   *
   * @param modelId Id of the model
   * @param options.dataBundleIds DataBundle ids that will be used for training
   * @param options.instanceType The type of instance that will be used for training
   * @param options.name Name of the training
   * @param options.description Description of the training
   * @returns Training response from the REST API
   */
  async createTraining(modelId: string, options: CreateTrainingOption): Promise<Training> {
    return this.makePostRequest<Training>(`/models/${modelId}/trainings`, options);
  }

  /**
   * Update a training, calls the PATCH /models/{modelId}/trainings/{trainingId} endpoint.
   *
   * @param modelId Id of the model
   * @param trainingId Id of the training
   * @param options.name New name of the training
   * @param options.description New description of the training
   * @param options.status Cancel the training with status = 'cancelled'
   * @returns
   */
  async updateTraining(modelId: string, trainingId: string, options: UpdateTrainingOptions): Promise<Training> {
    return this.makePatchRequest<Training>(`/models/${modelId}/trainings/${trainingId}`, options);
  }

  /**
   * List payment methods available, calls the GET /paymentMethods endpoint.
   *
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns PaymentMethods response from the REST API
   */
  async listPaymentMethods(options?: ListPaymentMethodsOptions): Promise<PaymentMethodList> {
    return this.makeGetRequest('/paymentMethods', options);
  }

  /**
   * Creates a payment method, calls the POST /paymentMethods endpoint.
   *
   * @param options.description Optional description of payment method
   * @param options.name Optional name of payment method
   * @returns PaymentMethod response from REST API
   */
  async createPaymentMethod(options?: CreatePaymentMethodOptions): Promise<PaymentMethod> {
    return this.makePostRequest('/paymentMethods', options);
  }

  /**
   * Get payment method from the REST API, calls the GET /paymentMethods/{paymentMethodId} endpoint.
   *
   * @param paymentMethodId Id of the payment method
   * @returns PaymentMethod response from REST API
   */
  async getPaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return this.makeGetRequest(`/paymentMethods/${paymentMethodId}`);
  }

  /**
   * Updates a payment method, calls the PATCH /paymentMethods/{paymentMethodId} endpoint.
   *
   * @param paymentMethodId Id of the payment method
   * @param options.description Optional description of payment method
   * @param options.name Optional name of payment method
   * @param options.stripeSetupIntentSecret Optional input to confirm a payment method has been successfully set up through Stripe
   * @returns PaymentMethod response from REST API
   */
  async updatePaymentMethod(paymentMethodId: string, options: UpdatePaymentMethodOptions): Promise<PaymentMethod> {
    return this.makePatchRequest(`/paymentMethods/${paymentMethodId}`, options);
  }

  /**
   * Deletes a payment method, calls the DELETE /paymentMethods/{paymentMethodId} endpoint.
   *
   * @param paymentMethodId Id of the payment method to delete
   * @returns PaymentMethod response from REST API
   */
  async deletePaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return this.makeDeleteRequest(`/paymentMethods/${paymentMethodId}`);
  }

  /**
   * List plans available, calls the GET /plans endpoint.
   *
   * @param options.owner Organizations to retrieve plans from
   * @param options.maxResults Maximum number of results to be returned
   * @param options.nextToken A unique token for each page, use the returned token to retrieve the next page.
   * @returns Plans response from the REST API
   */
  async listPlans(options?: ListPlansOptions): Promise<PlanList> {
    return this.makeGetRequest('/plans', options);
  }

  /**
   * Get information about a specific plan, calls the GET /plans/{plan_id} endpoint.
   *
   * @param planId Id of the plan
   * @returns Plan response from the REST API
   */
  async getPlan(planId: string): Promise<Plan> {
    return this.makeGetRequest(`/plans/${planId}`);
  }

  /**
   * Get log, calls the GET /logs/{logId} endpoint.
   *
   * @param logId Id of the log
   * @returns Log response from REST API
   */
  async getLog(logId: string, options?: GetLogOptions): Promise<Log> {
    return this.makeGetRequest<Log>(`/logs/${logId}`, options);
  }

  /**
   * Get profile, calls the GET /profiles/{profileId} endpoint.
   *
   * @param profileId Id of the profile
   * @param options Request options
   * @returns Profile response from REST API
   */
  async getProfile(profileId: string, options?: GetProfileOptions): Promise<Profile> {
    return this.makeGetRequest<Profile>(`/profiles/${profileId}`, options);
  }

  /**
   * Updates a profile, calls the PATCH /profiles/{profileId} endpoint.
   *
   * @param profileId Id of the profile
   * @param options Request options
   * @returns Profile response from REST API
   */
  async updateProfile(profileId: string, options?: UpdateProfileOptions): Promise<Profile> {
    return this.makePatchRequest<Profile>(`/profiles/${profileId}`, options);
  }

  /**
   * List roles, calls the GET /roles endpoint.
   * @param options Request options
   * @returns Roles response from REST API
   */
  async listRoles(options?: ListRoleOptions): Promise<RoleList> {
    return this.makeGetRequest<RoleList>('/roles', options);
  }

  /**
   * Get role, calls the GET /roles/{roleId} endpoint.
   * @param roleId Id of the role
   * @param options Request options
   * @returns Role response from REST API
   */
  async getRole(roleId: string, options?: GetRoleOptions): Promise<Role> {
    return this.makeGetRequest<Role>(`/roles/${roleId}`, options);
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

  /**
   * Invoice section
   * Endpoint: /invoices
   *
   * Methods:
   * - listInvoices
   * - getInvoice
   * - createInvoice
   * - updateInvoice
   * - deleteInvoice
   */

  /**
   * List invoices, calls the GET /invoices endpoint.
   * @param options Object with list options
   * @returns InvoiceList response from REST API
   */
  async listInvoices(options?: ListInvoicesOptions): Promise<InvoiceList> {
    return this.makeGetRequest<InvoiceList>('/invoices', options);
  }

  /**
   * Get a invoice, calls the GET /invoices/:id endpoint.
   * @param invoiceId Id of the invoice
   * @param options Object with get options
   * @returns Invoice response from REST API
   */
  async getInvoice(invoiceId: string, options?: GetInvoiceOptions): Promise<Invoice> {
    return this.makeGetRequest<Invoice>(`/invoices/${invoiceId}`, options);
  }

  /**
   * Creates a invoice, calls the POST /invoices endpoint.
   *
   * @param options Object with create options
   * @returns Invoice response from REST API
   */
  async createInvoice(options: CreateInvoiceOptions): Promise<Invoice> {
    return this.makePostRequest<Invoice>('/invoices', options);
  }

  /**
   * Updates a invoice, calls the PATCH /invoices/:id endpoint.
   *
   * @param invoiceId Id of the invoice
   * @param options Object with update options
   */
  async updateInvoice(invoiceId: string, options: UpdateInvoiceOptions): Promise<Invoice> {
    return this.makePatchRequest(`/invoices/${invoiceId}`, options);
  }

  /**
   * Delete a invoice, calls the DELETE /invoices/:id endpoint.
   *
   * @param invoiceId Id of the invoice
   * @param options Object with delete options
   * @returns Invoice response from REST API
   */
  async deleteInvoice(invoiceId: string, options?: DeleteInvoiceOptions): Promise<Invoice> {
    return this.makeDeleteRequest(`/invoices/${invoiceId}`, options);
  }

  /**
   * Project section
   * Endpoint: /projects
   *
   * Methods:
   * - listProjects
   * - getProject
   * - createProject
   * - updateProject
   * - deleteProject
   */

  /**
   * List projects, calls the GET /projects endpoint.
   * @param options Object with list options
   * @returns ProjectList response from REST API
   */
  async listProjects(options?: ListProjectsOptions): Promise<ProjectList> {
    return this.makeGetRequest<ProjectList>('/projects', options);
  }

  /**
   * Get a project, calls the GET /projects/:id endpoint.
   * @param projectId Id of the project
   * @param options Object with get options
   * @returns Project response from REST API
   */
  async getProject(projectId: string, options?: GetProjectOptions): Promise<Project> {
    return this.makeGetRequest<Project>(`/projects/${projectId}`, options);
  }

  /**
   * Creates a project, calls the POST /projects endpoint.
   *
   * @param options Object with create options
   * @returns Project response from REST API
   */
  async createProject(options: CreateProjectOptions): Promise<Project> {
    return this.makePostRequest<Project>('/projects', options);
  }

  /**
   * Updates a project, calls the PATCH /projects/:id endpoint.
   *
   * @param projectId Id of the project
   * @param options Object with update options
   */
  async updateProject(projectId: string, options: UpdateProjectOptions): Promise<Project> {
    return this.makePatchRequest(`/projects/${projectId}`, options);
  }

  /**
   * Delete a project, calls the DELETE /projects/:id endpoint.
   *
   * @param projectId Id of the project
   * @param options Object with delete options
   * @returns Project response from REST API
   */
  async deleteProject(projectId: string, options?: DeleteProjectOptions): Promise<Project> {
    return this.makeDeleteRequest(`/projects/${projectId}`, options);
  }

  /**
   * ProjectRun section
   * Endpoint: /projects/:id/runs
   *
   * Methods:
   * - listProjectRuns
   * - getProjectRun
   * - createProjectRun
   * - updateProjectRun
   * - deleteProjectRun
   */

  /**
   * List project runs, calls the GET /projects/:id/runs endpoint.
   * @param projectId Id of the project
   * @param options Object with list options
   * @returns ProjectRunList response from REST API
   */
  async listProjectRuns(projectId: string, options?: ListProjectRunsOptions): Promise<ProjectRunList> {
    return this.makeGetRequest<ProjectRunList>(`/projects/${projectId}/runs`, options);
  }

  /**
   * Get a project run, calls the GET /projects/:id/runs/:id endpoint.
   * @param projectId Id of the project
   * @param runId Id of the run
   * @param options Object with get options
   * @returns ProjectRun response from REST API
   */
  async getProjectRun(projectId: string, runId: string, options?: GetProjectRunOptions): Promise<ProjectRun> {
    return this.makeGetRequest<ProjectRun>(`/projects/${projectId}/runs/${runId}`, options);
  }

  /**
   * Creates a project run, calls the POST /projects/:id/runs endpoint.
   *
   * @param options Object with create options
   * @param projectId Id of the project
   * @returns ProjectRun response from REST API
   */
  async createProjectRun(projectId: string, options: CreateProjectRunOptions): Promise<ProjectRun> {
    return this.makePostRequest<ProjectRun>(`/projects/${projectId}/runs`, options);
  }

  /**
   * Updates a project run, calls the PATCH /projects/:id/runs/:id endpoint.
   *
   * @param projectId Id of the project
   * @param runId Id of the run
   * @param options Object with update options
   */
  async updateProjectRun(projectId: string, runId: string, options: UpdateProjectRunOptions): Promise<ProjectRun> {
    return this.makePatchRequest(`/projects/${projectId}/runs/${runId}`, options);
  }

  /**
   * Delete a project run, calls the DELETE /projects/:id/runs/:id endpoint.
   *
   * @param projectId Id of the project
   * @param runId Id of the run
   * @param options Object with delete options
   * @returns ProjectRun response from REST API
   */
  async deleteProjectRun(projectId: string, runId: string, options?: DeleteProjectRunOptions): Promise<ProjectRun> {
    return this.makeDeleteRequest(`/projects/${projectId}/runs/${runId}`, options);
  }

  /**
   * Validation section
   * Endpoint: /validations
   *
   * Methods:
   * - listValidations
   * - getValidation
   * - createValidation
   * - updateValidation
   * - deleteValidation
   */

  /**
   * List validations, calls the GET /validations endpoint.
   * @param options Object with list options
   * @returns ValidationList response from REST API
   */
  async listValidations(options?: ListValidationsOptions): Promise<ValidationList> {
    return this.makeGetRequest<ValidationList>('/validations', options);
  }

  /**
   * Get a validation, calls the GET /validations/:id endpoint.
   * @param validationId Id of the validation
   * @param options Object with get options
   * @returns Validation response from REST API
   */
  async getValidation(validationId: string, options?: GetValidationOptions): Promise<Validation> {
    return this.makeGetRequest<Validation>(`/validations/${validationId}`, options);
  }

  /**
   * Creates a validation, calls the POST /validations endpoint.
   *
   * @param options Object with create options
   * @returns Validation response from REST API
   */
  async createValidation(options: CreateValidationOptions): Promise<Validation> {
    return this.makePostRequest<Validation>('/validations', options);
  }

  /**
   * Updates a validation, calls the PATCH /validations/:id endpoint.
   *
   * @param validationId Id of the validation
   * @param options Object with update options
   */
  async updateValidation(validationId: string, options: UpdateValidationOptions): Promise<Validation> {
    return this.makePatchRequest(`/validations/${validationId}`, options);
  }

  /**
   * Delete a validation, calls the DELETE /validations/:id endpoint.
   *
   * @param validationId Id of the validation
   * @param options Object with delete options
   * @returns Validation response from REST API
   */
  async deleteValidation(validationId: string, options?: DeleteValidationOptions): Promise<Validation> {
    return this.makeDeleteRequest(`/validations/${validationId}`, options);
  }

  /**
   * ValidationTask section
   * Endpoint: /validations/:id/tasks
   *
   * Methods:
   * - listValidationTasks
   * - getValidationTask
   * - createValidationTask
   * - updateValidationTask
   * - deleteValidationTask
   */

  /**
   * List validation tasks, calls the GET /validations/:id/tasks endpoint.
   * @param validationId Id of the validation
   * @param options Object with list options
   * @returns ValidationTaskList response from REST API
   */
  async listValidationTasks(validationId: string, options?: ListValidationTasksOptions): Promise<ValidationTaskList> {
    return this.makeGetRequest<ValidationTaskList>(`/validations/${validationId}/tasks`, options);
  }

  /**
   * Get a validation task, calls the GET /validations/:id/tasks/:id endpoint.
   * @param validationId Id of the validation
   * @param taskId Id of the task
   * @param options Object with get options
   * @returns ValidationTask response from REST API
   */
  async getValidationTask(
    validationId: string,
    taskId: string,
    options?: GetValidationTaskOptions,
  ): Promise<ValidationTask> {
    return this.makeGetRequest<ValidationTask>(`/validations/${validationId}/tasks/${taskId}`, options);
  }

  /**
   * Creates a validation task, calls the POST /validations/:id/tasks endpoint.
   *
   * @param options Object with create options
   * @param validationId Id of the validation
   * @returns ValidationTask response from REST API
   */
  async createValidationTask(validationId: string, options: CreateValidationTaskOptions): Promise<ValidationTask> {
    return this.makePostRequest<ValidationTask>(`/validations/${validationId}/tasks`, options);
  }

  /**
   * Updates a validation task, calls the PATCH /validations/:id/tasks/:id endpoint.
   *
   * @param validationId Id of the validation
   * @param taskId Id of the task
   * @param options Object with update options
   */
  async updateValidationTask(
    validationId: string,
    taskId: string,
    options: UpdateValidationTaskOptions,
  ): Promise<ValidationTask> {
    return this.makePatchRequest(`/validations/${validationId}/tasks/${taskId}`, options);
  }

  /**
   * Delete a validation task, calls the DELETE /validations/:id/tasks/:id endpoint.
   *
   * @param validationId Id of the validation
   * @param taskId Id of the task
   * @param options Object with delete options
   * @returns ValidationTask response from REST API
   */
  async deleteValidationTask(
    validationId: string,
    taskId: string,
    options?: DeleteValidationTaskOptions,
  ): Promise<ValidationTask> {
    return this.makeDeleteRequest(`/validations/${validationId}/tasks/${taskId}`, options);
  }

  /**
   * Hook section
   * Endpoint: /hooks
   *
   * Methods:
   * - listHooks
   * - getHook
   * - createHook
   * - updateHook
   * - deleteHook
   */

  /**
   * List hooks, calls the GET /hooks endpoint.
   * @param options Object with list options
   * @returns HookList response from REST API
   */
  async listHooks(options?: ListHooksOptions): Promise<HookList> {
    return this.makeGetRequest<HookList>('/hooks', options);
  }

  /**
   * Get a hook, calls the GET /hooks/:id endpoint.
   * @param hookId Id of the hook
   * @param options Object with get options
   * @returns Hook response from REST API
   */
  async getHook(hookId: string, options?: GetHookOptions): Promise<Hook> {
    return this.makeGetRequest<Hook>(`/hooks/${hookId}`, options);
  }

  /**
   * Creates a hook, calls the POST /hooks endpoint.
   *
   * @param options Object with create options
   * @returns Hook response from REST API
   */
  async createHook(options: CreateHookOptions): Promise<Hook> {
    return this.makePostRequest<Hook>('/hooks', options);
  }

  /**
   * Updates a hook, calls the PATCH /hooks/:id endpoint.
   *
   * @param hookId Id of the hook
   * @param options Object with update options
   */
  async updateHook(hookId: string, options: UpdateHookOptions): Promise<Hook> {
    return this.makePatchRequest(`/hooks/${hookId}`, options);
  }

  /**
   * Delete a hook, calls the DELETE /hooks/:id endpoint.
   *
   * @param hookId Id of the hook
   * @param options Object with delete options
   * @returns Hook response from REST API
   */
  async deleteHook(hookId: string, options?: DeleteHookOptions): Promise<Hook> {
    return this.makeDeleteRequest(`/hooks/${hookId}`, options);
  }

  /**
   * HookRun section
   * Endpoint: /hooks/:id/runs
   *
   * Methods:
   * - listHookRuns
   * - getHookRun
   * - createHookRun
   * - updateHookRun
   * - deleteHookRun
   */

  /**
   * List hook runs, calls the GET /hooks/:id/runs endpoint.
   * @param hookId Id of the hook
   * @param options Object with list options
   * @returns HookRunList response from REST API
   */
  async listHookRuns(hookId: string, options?: ListHookRunsOptions): Promise<HookRunList> {
    return this.makeGetRequest<HookRunList>(`/hooks/${hookId}/runs`, options);
  }

  /**
   * Get a hook run, calls the GET /hooks/:id/runs/:id endpoint.
   * @param hookId Id of the hook
   * @param runId Id of the run
   * @param options Object with get options
   * @returns HookRun response from REST API
   */
  async getHookRun(hookId: string, runId: string, options?: GetHookRunOptions): Promise<HookRun> {
    return this.makeGetRequest<HookRun>(`/hooks/${hookId}/runs/${runId}`, options);
  }

  /**
   * Creates a hook run, calls the POST /hooks/:id/runs endpoint.
   *
   * @param options Object with create options
   * @param hookId Id of the hook
   * @returns HookRun response from REST API
   */
  async createHookRun(hookId: string, options: CreateHookRunOptions): Promise<HookRun> {
    return this.makePostRequest<HookRun>(`/hooks/${hookId}/runs`, options);
  }

  /**
   * Updates a hook run, calls the PATCH /hooks/:id/runs/:id endpoint.
   *
   * @param hookId Id of the hook
   * @param runId Id of the run
   * @param options Object with update options
   */
  async updateHookRun(hookId: string, runId: string, options: UpdateHookRunOptions): Promise<HookRun> {
    return this.makePatchRequest(`/hooks/${hookId}/runs/${runId}`, options);
  }

  /**
   * Delete a hook run, calls the DELETE /hooks/:id/runs/:id endpoint.
   *
   * @param hookId Id of the hook
   * @param runId Id of the run
   * @param options Object with delete options
   * @returns HookRun response from REST API
   */
  async deleteHookRun(hookId: string, runId: string, options?: DeleteHookRunOptions): Promise<HookRun> {
    return this.makeDeleteRequest(`/hooks/${hookId}/runs/${runId}`, options);
  }

  /**
   * Function section
   * Endpoint: /functions
   *
   * Methods:
   * - listFunctions
   * - getFunction
   * - createFunction
   * - updateFunction
   * - deleteFunction
   */

  /**
   * List functions, calls the GET /functions endpoint.
   * @param options Object with list options
   * @returns FunctionList response from REST API
   */
  async listFunctions(options?: ListFunctionsOptions): Promise<FunctionList> {
    return this.makeGetRequest<FunctionList>('/functions', options);
  }

  /**
   * Get a function, calls the GET /functions/:id endpoint.
   * @param functionId Id of the function
   * @param options Object with get options
   * @returns Function response from REST API
   */
  async getFunction(functionId: string, options?: GetFunctionOptions): Promise<Function> {
    return this.makeGetRequest<Function>(`/functions/${functionId}`, options);
  }

  /**
   * Creates an function, calls the POST /functions endpoint.
   *
   * @param options Object with create options
   * @returns Function response from REST API
   */
  async createFunction(options: CreateFunctionOptions): Promise<Function> {
    return this.makePostRequest<Function>('/functions', options);
  }

  /**
   * Updates an function, calls the PATCH /functions/:id endpoint.
   *
   * @param functionId Id of the function
   * @param options Object with update options
   */
  async updateFunction(functionId: string, options: UpdateFunctionOptions): Promise<Function> {
    return this.makePatchRequest(`/functions/${functionId}`, options);
  }

  /**
   * Delete an function, calls the DELETE /functions/:id endpoint.
   *
   * @param functionId Id of the function
   * @param options Object with delete options
   * @returns Function response from REST API
   */
  async deleteFunction(functionId: string, options?: DeleteFunctionOptions): Promise<Function> {
    return this.makeDeleteRequest(`/functions/${functionId}`, options);
  }

  /**
   * Action section
   * Endpoint: /actions
   *
   * Methods:
   * - listActions
   * - getAction
   * - createAction
   * - updateAction
   * - deleteAction
   */

  /**
   * List actions, calls the GET /actions endpoint.
   * @param options Object with list options
   * @returns ActionList response from REST API
   */
  async listActions(options?: ListActionsOptions): Promise<ActionList> {
    return this.makeGetRequest<ActionList>('/actions', options);
  }

  /**
   * Get an action, calls the GET /actions/:id endpoint.
   * @param actionId Id of the action
   * @param options Object with get options
   * @returns Action response from REST API
   */
  async getAction(actionId: string, options?: GetActionOptions): Promise<Action> {
    return this.makeGetRequest<Action>(`/actions/${actionId}`, options);
  }

  /**
   * Creates an action, calls the POST /actions endpoint.
   *
   * @param options Object with create options
   * @returns Action response from REST API
   */
  async createAction(options: CreateActionOptions): Promise<Action> {
    return this.makePostRequest<Action>('/actions', options);
  }

  /**
   * Updates an action, calls the PATCH /actions/:id endpoint.
   *
   * @param actionId Id of the action
   * @param options Object with update options
   */
  async updateAction(actionId: string, options: UpdateActionOptions): Promise<Action> {
    return this.makePatchRequest(`/actions/${actionId}`, options);
  }

  /**
   * Delete an action, calls the DELETE /actions/:id endpoint.
   *
   * @param actionId Id of the action
   * @param options Object with delete options
   * @returns Action response from REST API
   */
  async deleteAction(actionId: string, options?: DeleteActionOptions): Promise<Action> {
    return this.makeDeleteRequest(`/actions/${actionId}`, options);
  }

  /**
   * ActionRun section
   * Endpoint: /actions/:id/runs
   *
   * Methods:
   * - listActionRuns
   * - getActionRun
   * - createActionRun
   * - updateActionRun
   * - deleteActionRun
   */

  /**
   * List action runs, calls the GET /actions/:id/runs endpoint.
   * @param actionId Id of the action
   * @param options Object with list options
   * @returns ActionRunList response from REST API
   */
  async listActionRuns(actionId: string, options?: ListActionRunsOptions): Promise<ActionRunList> {
    return this.makeGetRequest<ActionRunList>(`/actions/${actionId}/runs`, options);
  }

  /**
   * Get an action run, calls the GET /actions/:id/runs/:id endpoint.
   * @param actionId Id of the action
   * @param runId Id of the run
   * @param options Object with get options
   * @returns ActionRun response from REST API
   */
  async getActionRun(actionId: string, runId: string, options?: GetActionRunOptions): Promise<ActionRun> {
    return this.makeGetRequest<ActionRun>(`/actions/${actionId}/runs/${runId}`, options);
  }

  /**
   * Creates an action run, calls the POST /actions/:id/runs endpoint.
   *
   * @param options Object with create options
   * @param actionId Id of the action
   * @returns ActionRun response from REST API
   */
  async createActionRun(actionId: string, options: CreateActionRunOptions): Promise<ActionRun> {
    return this.makePostRequest<ActionRun>(`/actions/${actionId}/runs`, options);
  }

  /**
   * Updates an action run, calls the PATCH /actions/:id/runs/:id endpoint.
   *
   * @param actionId Id of the action
   * @param runId Id of the run
   * @param options Object with update options
   */
  async updateActionRun(actionId: string, runId: string, options: UpdateActionRunOptions): Promise<ActionRun> {
    return this.makePatchRequest<ActionRun>(`/actions/${actionId}/runs/${runId}`, options);
  }

  /**
   * Delete an action run, calls the DELETE /actions/:id/runs/:id endpoint.
   *
   * @param actionId Id of the action
   * @param runId Id of the run
   * @param options Object with delete options
   * @returns ActionRun response from REST API
   */
  async deleteActionRun(actionId: string, runId: string, options?: DeleteActionRunOptions): Promise<ActionRun> {
    return this.makeDeleteRequest<ActionRun>(`/actions/${actionId}/runs/${runId}`, options);
  }

  async makeGetRequest<T>(path: string, options: any = {}): Promise<T> {
    const { requestConfig, ...query } = options;
    return this.makeAuthorizedRequest<T>(axios.get, buildURL(path, query), requestConfig);
  }

  async makeDeleteRequest<T>(path: string, options: any = {}): Promise<T> {
    const { requestConfig, ...query } = options;
    return this.makeAuthorizedRequest(axios.delete, buildURL(path, query), requestConfig);
  }

  async makePostRequest<T>(path: string, options: any): Promise<T> {
    return this.makeAuthorizedBodyRequest(axios.post, path, options);
  }

  async makePatchRequest<T>(path: string, options: any): Promise<T> {
    return this.makeAuthorizedBodyRequest(axios.patch, path, options);
  }

  async makeFileServerGetRequest(fileUrl: string, options: any = {}): Promise<File> {
    const { requestConfig, ...query } = options;
    const constructedRequestConfig = { responseType: 'arraybuffer', ...requestConfig };
    return this.makeAuthorizedFileServerRequest(axios.get, buildURL(fileUrl, query), constructedRequestConfig);
  }

  async makeFileServerPutRequest<T>(fileUrl: string, content: Buffer, options: any = {}): Promise<T> {
    options.data = content;
    return this.makeAuthorizedFileServerBodyRequest<T>(axios.put, fileUrl, options);
  }

  private async makeAuthorizedFileServerRequest(
    axiosFn: AxiosFn,
    fileUrl: string,
    requestConfig: any = {},
  ): Promise<File> {
    const headers = await this.getAuthorizationHeaders();
    let config: AxiosRequestConfig = { headers };
    if (requestConfig) {
      config = { ...config, ...requestConfig };
    }
    const result = await axiosFn<ArrayBuffer>(fileUrl, config);
    if (fileUrl.includes('formatter')) {
      console.log('result', result);
    }
    return { content: result.data, mimeType: result.headers['content-type'] };
  }

  private async makeAuthorizedFileServerBodyRequest<T>(
    axiosFn: AxiosFn,
    fileUrl: string,
    options: any = {},
  ): Promise<T> {
    const headers = await this.getAuthorizationHeaders();
    const { requestConfig, data } = options;
    let config: AxiosRequestConfig = { headers };
    if (requestConfig) {
      config = { ...config, ...requestConfig };
    }

    const result = await axiosFn<T>(fileUrl, data, config);

    return result.data;
  }

  private async makeAuthorizedRequest<T>(axiosFn: AxiosFn, path: string, requestConfig: any = {}): Promise<T> {
    const endpoint = `${this.credentials.apiEndpoint}${path}`;
    const headers = await this.getAuthorizationHeaders();
    let config: AxiosRequestConfig = { headers };
    if (requestConfig) {
      config = { ...config, ...requestConfig };
    }

    const result = await axiosFn<T>(endpoint, config);
    return JSON.parse(JSON.stringify(result.data), (key, val) => maybeParseDate(val));
  }

  private async makeAuthorizedBodyRequest<T>(axiosFn: AxiosFn, path: string, options: any = {}): Promise<T> {
    const endpoint = `${this.credentials.apiEndpoint}${path}`;
    const headers = await this.getAuthorizationHeaders();
    const { requestConfig, ...body } = options;
    let config: AxiosRequestConfig = { headers };
    if (requestConfig) {
      config = { ...config, ...requestConfig };
    }

    const result = await axiosFn<T>(endpoint, body, config);
    return JSON.parse(JSON.stringify(result.data), (key, val) => maybeParseDate(val));
  }

  private async getAuthorizationHeaders(): Promise<AuthorizationHeaders> {
    const accessToken = await this.credentials.getAccessToken();
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}

export default Client;
