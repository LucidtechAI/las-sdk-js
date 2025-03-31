import axios, { AxiosRequestConfig } from 'axios';
import { Buffer } from 'buffer';

import { Credentials } from './credentials';
import type {
  Action,
  ActionList,
  ActionRun,
  ActionRunList,
  AppClient,
  AppClientList,
  AuthorizationHeaders,
  AxiosFn,
  Connection,
  ConnectionList,
  CreateActionOptions,
  CreateActionRunOptions,
  CreateAppClientOptions,
  CreateConnectionOptions,
  CreateDocumentOptions,
  CreateFunctionOptions,
  CreateHookOptions,
  CreateHookRunOptions,
  CreateModelOptions,
  CreateOrganizationOptions,
  CreatePaymentMethodOptions,
  CreatePredictionOptions,
  CreateProjectOptions,
  CreateProjectRunOptions,
  CreateRoleOptions,
  CreateSecretOptions,
  CreateUserOptions,
  CreateValidationOptions,
  CreateValidationTaskOptions,
  DeleteActionOptions,
  DeleteActionRunOptions,
  DeleteAppClientOptions,
  DeleteConnectionOptions,
  DeleteDocumentOptions,
  DeleteFunctionOptions,
  DeleteHookOptions,
  DeleteHookRunOptions,
  DeleteModelOptions,
  DeletePaymentMethodOptions,
  DeletePredictionOptions,
  DeleteProjectOptions,
  DeleteProjectRunOptions,
  DeleteRoleOptions,
  DeleteSecretOptions,
  DeleteUserOptions,
  DeleteValidationOptions,
  DeleteValidationTaskOptions,
  Document,
  DocumentList,
  Function,
  FunctionList,
  GetActionOptions,
  GetActionRunOptions,
  GetAppClientOptions,
  GetConnectionOptions,
  GetDocumentOptions,
  GetFunctionOptions,
  GetHookOptions,
  GetHookRunOptions,
  GetInvoiceOptions,
  GetLogOptions,
  GetModelOptions,
  GetOrganizationOptions,
  GetPaymentMethodOptions,
  GetPlanOptions,
  GetPredictionOptions,
  GetProfileOptions,
  GetProjectOptions,
  GetProjectRunOptions,
  GetRoleOptions,
  GetSecretOptions,
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
  ListConnectionsOptions,
  ListDocumentsOptions,
  ListFunctionsOptions,
  ListHookRunsOptions,
  ListHooksOptions,
  ListInvoicesOptions,
  ListLogsOptions,
  ListModelsOptions,
  ListOrganizationsOptions,
  ListPaymentMethodsOptions,
  ListPlansOptions,
  ListPredictionsOptions,
  ListProjectRunsOptions,
  ListProjectsOptions,
  ListRolesOptions,
  ListSecretsOptions,
  ListUsersOptions,
  ListValidationsOptions,
  ListValidationTasksOptions,
  Log,
  LogList,
  Model,
  ModelList,
  Organization,
  OrganizationList,
  PaymentMethod,
  PaymentMethodList,
  Plan,
  PlanList,
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
  UpdateActionOptions,
  UpdateActionRunOptions,
  UpdateAppClientOptions,
  UpdateConnectionOptions,
  UpdateDocumentOptions,
  UpdateFunctionOptions,
  UpdateHookOptions,
  UpdateHookRunOptions,
  UpdateModelOptions,
  UpdateOrganizationOptions,
  UpdatePaymentMethodOptions,
  UpdateProfileOptions,
  UpdateProjectOptions,
  UpdateProjectRunOptions,
  UpdateRoleOptions,
  UpdateSecretOptions,
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
import { toListProjectRunsQueryParams } from './types';
import { buildURL } from './utils';

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
 * A high-level http client for communicating with the Cradl REST API
 */
export class Client {
  credentials: Credentials;

  constructor(credentials: Credentials) {
    this.credentials = credentials;
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

  /**
   * AppClient section
   * Endpoint: /appClients
   *
   * Methods:
   * - listAppClients
   * - getAppClient
   * - createAppClient
   * - updateAppClient
   * - deleteAppClient
   */

  /**
   * List appClients, calls the GET /appClients endpoint.
   * @param options Object with list options
   * @returns AppClientList response from REST API
   */
  async listAppClients(options?: ListAppClientsOptions): Promise<AppClientList> {
    return this.makeGetRequest<AppClientList>('/appClients', options);
  }

  /**
   * Get a appClient, calls the GET /appClients/:id endpoint.
   * @param appClientId Id of the appClient
   * @param options Object with get options
   * @returns AppClient response from REST API
   */
  async getAppClient(appClientId: string, options?: GetAppClientOptions): Promise<AppClient> {
    return this.makeGetRequest<AppClient>(`/appClients/${appClientId}`, options);
  }

  /**
   * Creates a appClient, calls the POST /appClients endpoint.
   *
   * @param options Object with create options
   * @returns AppClient response from REST API
   */
  async createAppClient(options: CreateAppClientOptions): Promise<AppClient> {
    return this.makePostRequest<AppClient>('/appClients', options);
  }

  /**
   * Updates a appClient, calls the PATCH /appClients/:id endpoint.
   *
   * @param appClientId Id of the appClient
   * @param options Object with update options
   */
  async updateAppClient(appClientId: string, options: UpdateAppClientOptions): Promise<AppClient> {
    return this.makePatchRequest(`/appClients/${appClientId}`, options);
  }

  /**
   * Delete a appClient, calls the DELETE /appClients/:id endpoint.
   *
   * @param appClientId Id of the appClient
   * @param options Object with delete options
   * @returns AppClient response from REST API
   */
  async deleteAppClient(appClientId: string, options?: DeleteAppClientOptions): Promise<AppClient> {
    return this.makeDeleteRequest(`/appClients/${appClientId}`, options);
  }

  /**
   * Document section
   * Endpoint: /documents
   *
   * Methods:
   * - listDocuments
   * - getDocument
   * - createDocument
   * - updateDocument
   * - deleteDocument
   */

  /**
   * List documents, calls the GET /documents endpoint.
   * @param options Object with list options
   * @returns DocumentList response from REST API
   */
  async listDocuments(options?: ListDocumentsOptions): Promise<DocumentList> {
    return this.makeGetRequest<DocumentList>('/documents', options);
  }

  /**
   * Get a document, calls the GET /documents/:id endpoint.
   * @param documentId Id of the document
   * @param options Object with get options
   * @returns Document response from REST API
   */
  async getDocument(documentId: string, options?: GetDocumentOptions): Promise<Document> {
    return this.makeGetRequest<Document>(`/documents/${documentId}`, options);
  }

  /**
   * Creates a document, calls the POST /documents endpoint.
   *
   * @param options Object with create options
   * @returns Document response from REST API
   */
  async createDocument(options: CreateDocumentOptions): Promise<Document> {
    return this.makePostRequest<Document>('/documents', options);
  }

  /**
   * Updates a document, calls the PATCH /documents/:id endpoint.
   *
   * @param documentId Id of the document
   * @param options Object with update options
   */
  async updateDocument(documentId: string, options: UpdateDocumentOptions): Promise<Document> {
    return this.makePatchRequest(`/documents/${documentId}`, options);
  }

  /**
   * Delete a document, calls the DELETE /documents/:id endpoint.
   *
   * @param documentId Id of the document
   * @param options Object with delete options
   * @returns Document response from REST API
   */
  async deleteDocument(documentId: string, options?: DeleteDocumentOptions): Promise<Document> {
    return this.makeDeleteRequest(`/documents/${documentId}`, options);
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
    return this.makeGetRequest<Function>(`/functions/${encodeURIComponent(functionId)}`, options);
  }

  /**
   * Creates a function, calls the POST /functions endpoint.
   *
   * @param options Object with create options
   * @returns Function response from REST API
   */
  async createFunction(options: CreateFunctionOptions): Promise<Function> {
    return this.makePostRequest<Function>('/functions', options);
  }

  /**
   * Updates a function, calls the PATCH /functions/:id endpoint.
   *
   * @param functionId Id of the function
   * @param options Object with update options
   */
  async updateFunction(functionId: string, options: UpdateFunctionOptions): Promise<Function> {
    return this.makePatchRequest(`/functions/${functionId}`, options);
  }

  /**
   * Delete a function, calls the DELETE /functions/:id endpoint.
   *
   * @param functionId Id of the function
   * @param options Object with delete options
   * @returns Function response from REST API
   */
  async deleteFunction(functionId: string, options?: DeleteFunctionOptions): Promise<Function> {
    return this.makeDeleteRequest(`/functions/${functionId}`, options);
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
   * Invoice section
   * Endpoint: /invoices
   *
   * Methods:
   * - listInvoices
   * - getInvoice
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
   * Log section
   * Endpoint: /logs
   *
   * Methods:
   * - listLogs
   * - getLog
   */

  /**
   * List logs, calls the GET /logs endpoint.
   * @param options Object with list options
   * @returns LogList response from REST API
   */
  async listLogs(options?: ListLogsOptions): Promise<LogList> {
    return this.makeGetRequest<LogList>('/logs', options);
  }

  /**
   * Get a log, calls the GET /logs/:id endpoint.
   * @param logId Id of the log
   * @param options Object with get options
   * @returns Log response from REST API
   */
  async getLog(logId: string, options?: GetLogOptions): Promise<Log> {
    return this.makeGetRequest<Log>(`/logs/${logId}`, options);
  }

  /**
   * Model section
   * Endpoint: /models
   *
   * Methods:
   * - listModels
   * - getModel
   * - createModel
   * - updateModel
   * - deleteModel
   */

  /**
   * List models, calls the GET /models endpoint.
   * @param options Object with list options
   * @returns ModelList response from REST API
   */
  async listModels(options?: ListModelsOptions): Promise<ModelList> {
    return this.makeGetRequest<ModelList>('/models', options);
  }

  /**
   * Get a model, calls the GET /models/:id endpoint.
   * @param modelId Id of the model
   * @param options Object with get options
   * @returns Model response from REST API
   */
  async getModel(modelId: string, options?: GetModelOptions): Promise<Model> {
    return this.makeGetRequest<Model>(`/models/${modelId}`, options);
  }

  /**
   * Creates a model, calls the POST /models endpoint.
   *
   * @param options Object with create options
   * @returns Model response from REST API
   */
  async createModel(options: CreateModelOptions): Promise<Model> {
    return this.makePostRequest<Model>('/models', options);
  }

  /**
   * Updates a model, calls the PATCH /models/:id endpoint.
   *
   * @param modelId Id of the model
   * @param options Object with update options
   */
  async updateModel(modelId: string, options: UpdateModelOptions): Promise<Model> {
    return this.makePatchRequest(`/models/${modelId}`, options);
  }

  /**
   * Delete a model, calls the DELETE /models/:id endpoint.
   *
   * @param modelId Id of the model
   * @param options Object with delete options
   * @returns Model response from REST API
   */
  async deleteModel(modelId: string, options?: DeleteModelOptions): Promise<Model> {
    return this.makeDeleteRequest(`/models/${modelId}`, options);
  }

  /**
   * Organization section
   * Endpoint: /organizations
   *
   * Methods:
   * - listOrganizations
   * - getOrganization
   * - createOrganization
   * - updateOrganization
   */

  /**
   * List organizations, calls the GET /organizations endpoint.
   * @param options Object with list options
   * @returns OrganizationList response from REST API
   */
  async listOrganizations(options?: ListOrganizationsOptions): Promise<OrganizationList> {
    return this.makeGetRequest<OrganizationList>('/organizations', options);
  }

  /**
   * Get an organization, calls the GET /organizations/:id endpoint.
   * @param organizationId Id of the organization
   * @param options Object with get options
   * @returns Organization response from REST API
   */
  async getOrganization(organizationId: string, options?: GetOrganizationOptions): Promise<Organization> {
    return this.makeGetRequest<Organization>(`/organizations/${organizationId}`, options);
  }

  /**
   * Creates an organization, calls the POST /organizations endpoint.
   *
   * @param options Object with create options
   * @returns Organization response from REST API
   */
  async createOrganization(options: CreateOrganizationOptions): Promise<Organization> {
    return this.makePostRequest<Organization>('/organizations', options);
  }

  /**
   * Updates an organization, calls the PATCH /organizations/:id endpoint.
   *
   * @param organizationId Id of the organization
   * @param options Object with update options
   */
  async updateOrganization(organizationId: string, options: UpdateOrganizationOptions): Promise<Organization> {
    return this.makePatchRequest(`/organizations/${organizationId}`, options);
  }

  /**
   * PaymentMethod section
   * Endpoint: /paymentMethods
   *
   * Methods:
   * - listPaymentMethods
   * - getPaymentMethod
   * - createPaymentMethod
   * - updatePaymentMethod
   * - deletePaymentMethod
   */

  /**
   * List paymentMethods, calls the GET /paymentMethods endpoint.
   * @param options Object with list options
   * @returns PaymentMethodList response from REST API
   */
  async listPaymentMethods(options?: ListPaymentMethodsOptions): Promise<PaymentMethodList> {
    return this.makeGetRequest<PaymentMethodList>('/paymentMethods', options);
  }

  /**
   * Get a paymentMethod, calls the GET /paymentMethods/:id endpoint.
   * @param paymentMethodId Id of the paymentMethod
   * @param options Object with get options
   * @returns PaymentMethod response from REST API
   */
  async getPaymentMethod(paymentMethodId: string, options?: GetPaymentMethodOptions): Promise<PaymentMethod> {
    return this.makeGetRequest<PaymentMethod>(`/paymentMethods/${paymentMethodId}`, options);
  }

  /**
   * Creates a paymentMethod, calls the POST /paymentMethods endpoint.
   *
   * @param options Object with create options
   * @returns PaymentMethod response from REST API
   */
  async createPaymentMethod(options: CreatePaymentMethodOptions): Promise<PaymentMethod> {
    return this.makePostRequest<PaymentMethod>('/paymentMethods', options);
  }

  /**
   * Updates a paymentMethod, calls the PATCH /paymentMethods/:id endpoint.
   *
   * @param paymentMethodId Id of the paymentMethod
   * @param options Object with update options
   */
  async updatePaymentMethod(paymentMethodId: string, options: UpdatePaymentMethodOptions): Promise<PaymentMethod> {
    return this.makePatchRequest(`/paymentMethods/${paymentMethodId}`, options);
  }

  /**
   * Delete a paymentMethod, calls the DELETE /paymentMethods/:id endpoint.
   *
   * @param paymentMethodId Id of the paymentMethod
   * @param options Object with delete options
   * @returns PaymentMethod response from REST API
   */
  async deletePaymentMethod(paymentMethodId: string, options?: DeletePaymentMethodOptions): Promise<PaymentMethod> {
    return this.makeDeleteRequest(`/paymentMethods/${paymentMethodId}`, options);
  }

  /**
   * Plan section
   * Endpoint: /plans
   *
   * Methods:
   * - listPlans
   * - getPlan
   */

  /**
   * List plans, calls the GET /plans endpoint.
   * @param options Object with list options
   * @returns PlanList response from REST API
   */
  async listPlans(options?: ListPlansOptions): Promise<PlanList> {
    return this.makeGetRequest<PlanList>('/plans', options);
  }

  /**
   * Get a plan, calls the GET /plans/:id endpoint.
   * @param planId Id of the plan
   * @param options Object with get options
   * @returns Plan response from REST API
   */
  async getPlan(planId: string, options?: GetPlanOptions): Promise<Plan> {
    return this.makeGetRequest<Plan>(`/plans/${encodeURIComponent(planId)}`, options);
  }

  /**
   * Prediction section
   * Endpoint: /predictions
   *
   * Methods:
   * - listPredictions
   * - getPrediction
   * - createPrediction
   * - deletePrediction
   */

  /**
   * List predictions, calls the GET /predictions endpoint.
   * @param options Object with list options
   * @returns PredictionList response from REST API
   */
  async listPredictions(options?: ListPredictionsOptions): Promise<PredictionList> {
    return this.makeGetRequest<PredictionList>('/predictions', options);
  }

  /**
   * Get a prediction, calls the GET /predictions/:id endpoint.
   * @param predictionId Id of the prediction
   * @param options Object with get options
   * @returns Prediction response from REST API
   */
  async getPrediction(predictionId: string, options?: GetPredictionOptions): Promise<Prediction> {
    return this.makeGetRequest<Prediction>(`/predictions/${predictionId}`, options);
  }

  /**
   * Creates a prediction, calls the POST /predictions endpoint.
   *
   * @param options Object with create options
   * @returns Prediction response from REST API
   */
  async createPrediction(options: CreatePredictionOptions): Promise<Prediction> {
    return this.makePostRequest<Prediction>('/predictions', options);
  }

  /**
   * Delete a prediction, calls the DELETE /predictions/:id endpoint.
   *
   * @param predictionId Id of the prediction
   * @param options Object with delete options
   * @returns Prediction response from REST API
   */
  async deletePrediction(predictionId: string, options?: DeletePredictionOptions): Promise<Prediction> {
    return this.makeDeleteRequest(`/predictions/${predictionId}`, options);
  }

  /**
   * Profile section
   * Endpoint: /profiles
   *
   * Methods:
   * - getProfile
   * - updateProfile
   */

  /**
   * Get a profile, calls the GET /profiles/:id endpoint.
   * @param profileId Id of the profile
   * @param options Object with get options
   * @returns Profile response from REST API
   */
  async getProfile(profileId: string, options?: GetProfileOptions): Promise<Profile> {
    return this.makeGetRequest<Profile>(`/profiles/${profileId}`, options);
  }

  /**
   * Updates a profile, calls the PATCH /profiles/:id endpoint.
   *
   * @param profileId Id of the profile
   * @param options Object with update options
   */
  async updateProfile(profileId: string, options: UpdateProfileOptions): Promise<Profile> {
    return this.makePatchRequest(`/profiles/${profileId}`, options);
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
    return this.makeGetRequest<ProjectRunList>(`/projects/${projectId}/runs`, toListProjectRunsQueryParams(options));
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
   * Role section
   * Endpoint: /roles
   *
   * Methods:
   * - listRoles
   * - getRole
   * - createRole
   * - updateRole
   * - deleteRole
   */

  /**
   * List roles, calls the GET /roles endpoint.
   * @param options Object with list options
   * @returns RoleList response from REST API
   */
  async listRoles(options?: ListRolesOptions): Promise<RoleList> {
    return this.makeGetRequest<RoleList>('/roles', options);
  }

  /**
   * Get a role, calls the GET /roles/:id endpoint.
   * @param roleId Id of the role
   * @param options Object with get options
   * @returns Role response from REST API
   */
  async getRole(roleId: string, options?: GetRoleOptions): Promise<Role> {
    return this.makeGetRequest<Role>(`/roles/${roleId}`, options);
  }

  /**
   * Creates a role, calls the POST /roles endpoint.
   *
   * @param options Object with create options
   * @returns Role response from REST API
   */
  async createRole(options: CreateRoleOptions): Promise<Role> {
    return this.makePostRequest<Role>('/roles', options);
  }

  /**
   * Updates a role, calls the PATCH /roles/:id endpoint.
   *
   * @param roleId Id of the role
   * @param options Object with update options
   */
  async updateRole(roleId: string, options: UpdateRoleOptions): Promise<Role> {
    return this.makePatchRequest(`/roles/${roleId}`, options);
  }

  /**
   * Delete a role, calls the DELETE /roles/:id endpoint.
   *
   * @param roleId Id of the role
   * @param options Object with delete options
   * @returns Role response from REST API
   */
  async deleteRole(roleId: string, options?: DeleteRoleOptions): Promise<Role> {
    return this.makeDeleteRequest(`/roles/${roleId}`, options);
  }

  /**
   * Secret section
   * Endpoint: /secrets
   *
   * Methods:
   * - listSecrets
   * - getSecret
   * - createSecret
   * - updateSecret
   * - deleteSecret
   */

  /**
   * List secrets, calls the GET /secrets endpoint.
   * @param options Object with list options
   * @returns SecretList response from REST API
   */
  async listSecrets(options?: ListSecretsOptions): Promise<SecretList> {
    return this.makeGetRequest<SecretList>('/secrets', options);
  }

  /**
   * Get a secret, calls the GET /secrets/:id endpoint.
   * @param secretId Id of the secret
   * @param options Object with get options
   * @returns Secret response from REST API
   */
  async getSecret(secretId: string, options?: GetSecretOptions): Promise<Secret> {
    return this.makeGetRequest<Secret>(`/secrets/${secretId}`, options);
  }

  /**
   * Creates a secret, calls the POST /secrets endpoint.
   *
   * @param options Object with create options
   * @returns Secret response from REST API
   */
  async createSecret(options: CreateSecretOptions): Promise<Secret> {
    return this.makePostRequest<Secret>('/secrets', options);
  }

  /**
   * Updates a secret, calls the PATCH /secrets/:id endpoint.
   *
   * @param secretId Id of the secret
   * @param options Object with update options
   */
  async updateSecret(secretId: string, options: UpdateSecretOptions): Promise<Secret> {
    return this.makePatchRequest(`/secrets/${secretId}`, options);
  }

  /**
   * Delete a secret, calls the DELETE /secrets/:id endpoint.
   *
   * @param secretId Id of the secret
   * @param options Object with delete options
   * @returns Secret response from REST API
   */
  async deleteSecret(secretId: string, options?: DeleteSecretOptions): Promise<Secret> {
    return this.makeDeleteRequest(`/secrets/${secretId}`, options);
  }

  /**
   * User section
   * Endpoint: /users
   *
   * Methods:
   * - listUsers
   * - getUser
   * - createUser
   * - updateUser
   * - deleteUser
   */

  /**
   * List users, calls the GET /users endpoint.
   * @param options Object with list options
   * @returns UserList response from REST API
   */
  async listUsers(options?: ListUsersOptions): Promise<UserList> {
    return this.makeGetRequest<UserList>('/users', options);
  }

  /**
   * Get a user, calls the GET /users/:id endpoint.
   * @param userId Id of the user
   * @param options Object with get options
   * @returns User response from REST API
   */
  async getUser(userId: string, options?: GetUserOptions): Promise<User> {
    return this.makeGetRequest<User>(`/users/${userId}`, options);
  }

  /**
   * Creates a user, calls the POST /users endpoint.
   *
   * @param options Object with create options
   * @returns User response from REST API
   */
  async createUser(options: CreateUserOptions): Promise<User> {
    return this.makePostRequest<User>('/users', options);
  }

  /**
   * Updates a user, calls the PATCH /users/:id endpoint.
   *
   * @param userId Id of the user
   * @param options Object with update options
   */
  async updateUser(userId: string, options: UpdateUserOptions): Promise<User> {
    return this.makePatchRequest(`/users/${userId}`, options);
  }

  /**
   * Delete a user, calls the DELETE /users/:id endpoint.
   *
   * @param userId Id of the user
   * @param options Object with delete options
   * @returns User response from REST API
   */
  async deleteUser(userId: string, options?: DeleteUserOptions): Promise<User> {
    return this.makeDeleteRequest(`/users/${userId}`, options);
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
   * Connection section
   * Endpoint: /connections
   *
   * Methods:
   * - listConnections
   * - getConnection
   * - createConnection
   * - updateConnection
   * - deleteConnection
   */

  /**
   * List connections, calls the GET /connections endpoint.
   * @param options Object with list options
   * @returns ConnectionList response from REST API
   */
  async listConnections(options?: ListConnectionsOptions): Promise<ConnectionList> {
    return this.makeGetRequest<ConnectionList>('/connections', options);
  }

  /**
   * Get a connection, calls the GET /connections/:id endpoint.
   * @param connectionId Id of the connection
   * @param options Object with get options
   * @returns Connection response from REST API
   */
  async getConnection(connectionId: string, options?: GetConnectionOptions): Promise<Connection> {
    return this.makeGetRequest<Connection>(`/connections/${connectionId}`, options);
  }

  /**
   * Creates a connection, calls the POST /connections endpoint.
   *
   * @param options Object with create options
   * @returns Connection response from REST API
   */
  async createConnection(options: CreateConnectionOptions): Promise<Connection> {
    return this.makePostRequest<Connection>('/connections', options);
  }

  /**
   * Updates a connection, calls the PATCH /connections/:id endpoint.
   *
   * @param connectionId Id of the connection
   * @param options Object with update options
   */
  async updateConnection(connectionId: string, options: UpdateConnectionOptions): Promise<Connection> {
    return this.makePatchRequest(`/connections/${connectionId}`, options);
  }

  /**
   * Delete a connection, calls the DELETE /connections/:id endpoint.
   *
   * @param connectionId Id of the connection
   * @param options Object with delete options
   * @returns Connection response from REST API
   */
  async deleteConnection(connectionId: string, options?: DeleteConnectionOptions): Promise<Connection> {
    return this.makeDeleteRequest(`/connections/${connectionId}`, options);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async makeGetRequest<T>(path: string, options: any = {}): Promise<T> {
    const { requestConfig, ...query } = options;
    return this.makeAuthorizedRequest<T>(axios.get, buildURL(path, query), requestConfig);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async makeDeleteRequest<T>(path: string, options: any = {}): Promise<T> {
    const { requestConfig, ...query } = options;
    return this.makeAuthorizedRequest(axios.delete, buildURL(path, query), requestConfig);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async makePostRequest<T>(path: string, options: any): Promise<T> {
    return this.makeAuthorizedBodyRequest(axios.post, path, options);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async makePatchRequest<T>(path: string, options: any): Promise<T> {
    return this.makeAuthorizedBodyRequest(axios.patch, path, options);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async makeFileServerGetRequest(fileUrl: string, options: any = {}): Promise<Blob> {
    const { requestConfig, ...query } = options;
    const constructedRequestConfig = { responseType: 'arraybuffer', ...requestConfig };
    return this.makeAuthorizedFileServerRequest(axios.get, buildURL(fileUrl, query), constructedRequestConfig);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async makeFileServerPutRequest(fileUrl: string, content: Buffer, options: any = {}): Promise<Blob> {
    options.data = content;
    await this.makeAuthorizedFileServerBodyRequest(axios.put, fileUrl, options);
    return new Blob([content], { type: options.headers['Content-Type'] });
  }

  private async makeAuthorizedFileServerRequest(
    axiosFn: AxiosFn,
    fileUrl: string,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    requestConfig: any = {},
  ): Promise<Blob> {
    const headers = await this.getAuthorizationHeaders();
    let config: AxiosRequestConfig = { headers };
    if (requestConfig) {
      config = { ...config, ...requestConfig };
    }
    const result = await axiosFn<ArrayBuffer>(fileUrl, config);
    return new Blob([result.data], { type: result.headers['content-type'] });
  }

  private async makeAuthorizedFileServerBodyRequest<T>(
    axiosFn: AxiosFn,
    fileUrl: string,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    options: any = {},
  ): Promise<T> {
    const authHeaders = await this.getAuthorizationHeaders();
    const { requestConfig, data, headers } = options;
    let config: AxiosRequestConfig = { headers: { ...authHeaders, ...headers } };
    if (requestConfig) {
      config = { ...config, ...requestConfig };
    }

    const result = await axiosFn<T>(fileUrl, data, config);

    return result.data;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
