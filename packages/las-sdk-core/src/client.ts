import axios, { AxiosRequestConfig } from 'axios';
import { Credentials } from './credentials';
import {
  PatchTransistionExecutionId, PostTransitionParams, PostTransitions, PostWorkflows, WorkflowSpecification,
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
     * Get document from the REST API, calls the GET /documets/{documentId} endpoint
     *
     * @param {string} documentId - the document id to run inference and create a prediction on
     * @returns {Promise} - document response from REST API
      */
    getDocument(documentId: string) {
      return this.makeGetRequest(`/documents/${documentId}`);
    }

    /**
     * Creates a document handle, calls the POST /documents endpoint.
     *
     * @param {string} content - The contents to POST
     * @param {string} contentType - A MIME type for the document handle
     * @param {string} consentId - An identifier to mark the owner of the document handle
     * @param {string} [batchId] - The batch to put the document it
     * @param {Array<{ [label: string]: string }>} [feedback] A list of items
     * { label: value } representing the ground truth values for the document
     * @returns {Promise} - document handle id
     */
    createDocument(content: string, contentType: string, consentId?: string, batchId?: string, feedback?: Array<{[key: string]: string}>): Promise<any> {
      let body: any = {
        content: Buffer.from(content).toString('base64'),
        contentType,
      };

      if (consentId) {
        body = { ...body, consentId };
      }
      if (batchId) {
        body = { ...body, batchId };
      }

      if (feedback) {
        body = { ...body, feedback };
      }

      return this.makePostRequest('/documents', body);
    }

    /**
      * @param {string} [batchId] - the batch id that contains the documents of interest
      * @param {string} [consentId] - an identifier to mark the owner of the document handle
      * @returns {Promise} - documents from REST API contained in batch <batchId>
      */
    listDocuments(batchId?: string, consentId?: string): Promise<any> {
      const query = { batchId, consentId };
      return this.makeGetRequest('/documents', query);
    }

    /**
     * Post feedback to the REST API, calls the POST /documents/{documentId} endpoint.
     * Posting feedback means posting the ground truth data for the particular document.
     * This enables the API to learn from past mistakes.
     *
     * @param {string} documentId - the document id to run inference and create a prediction on
     * @param {Array<{ [label: string]: string }>} feedback - a list of feedback items
     * { label: value } representing the ground truth values for the document
     * @returns {Promise} - feedback response from REST API
    */
    updateDocument(documentId: string, feedback: Array<{[key: string]: string}>): Promise<any> {
      const body = {
        feedback,
      };

      return this.makePostRequest(`/documents/${documentId}`, body);
    }

    /**
     * Delete documents with the provided consentId, calls the DELETE /documents endpoint.
     *
     * @param consentId Id of the consent that marks the owner of the document handle
     */
    deleteDocument(consentId?: string): Promise<any> {
      const query = consentId ? { consentId } : undefined;

      return this.makeDeleteRequest('/documents', query);
    }

    /**
     * Creates a transition handle, calls the POST /transitions endpoint.
     *
     * @param {'docker' | 'manual'} transitionType Type of transition "docker"|"manual"
     * @param {object} inputJsonSchema Json-schema that defines the input to the transition
     * @param {object} outputJsonSchema Json-schema that defines the output of the transition
     * @param {PostTransitionParams} params Extra parameters to the transition
     */
    createTransition(transitionType: 'docker' | 'manual', inputJsonSchema: object, outputJsonSchema: object, params?: PostTransitionParams): Promise<any> {
      let body: PostTransitions = {
        transitionType,
        inputJsonSchema,
        outputJsonSchema,
      };

      if (params) {
        body = { ...body, params };
      }
      return this.makePostRequest('/transitions', body);
    }

    /**
     * Start executing a manual transition, calls the POST /transitions/{transitionId}/executions endpoint.
     *
     * @param {string} transitionId Id of the transition
     */
    executeTransition(transitionId: string): Promise<any> {
      return this.makePostRequest(`/transitions/${transitionId}/executions`, {});
    }

    /**
     * Ends the processing of the transition execution, calls the PATCH /transitions/{transition_id}/executions/{execution_id} endpoint.
     *
     * @param {string} transitionId Id of the transition that performs the execution
     * @param {string} executionId Id of the execution to update
     * @param {'succeeded' | 'failed'} status Status of the execution 'succeeded|failed'
     * @param {object} output Output from the execution, required when status is 'succeded'
     * @param { message: string } error Error from the execution, required when status is 'failed', needs to contain 'message'
     */
    updateTransitionExecution(transitionId: string, executionId: string, status: 'succeeded' | 'failed', output?: object, error?: { message: string }): Promise<any> {
      let body: PatchTransistionExecutionId = {
        status,
      };

      if (output) {
        body = { ...body, output };
      }

      if (error) {
        body = { ...body, error };
      }

      return this.makePatchRequest(`/transitions/${transitionId}/executions/${executionId}`, body);
    }

    /**
     * Creates a new workflow, calls the POST /workflows endpoint.
     *
     * @param {WorkflowSpecification} specification Specification of the workflow
     * @param {string} name Name of the workflow
     * @param {string} description Description of the workflow
     * @param {{ email: string }} errorConfig Configuration of error handler
     */
    createWorkflow(specification: WorkflowSpecification, name: string, description?: string, errorConfig?: { email: string }): Promise<any> {
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

      return this.makePostRequest('/workflows', body);
    }

    /**
     * List workflows, calls the GET /workflows endpoint.
     */
    listWorkflows(): Promise<any> {
      return this.makeGetRequest('/workflows');
    }

    /**
     * Delete the workflow with the provided workflowId, calls the DELETE /workflows/{workflowId} endpoint.
     * @param workflowId Id of the workflow
     */
    deleteWorkflow(workflowId: string): Promise<any> {
      return this.makeDeleteRequest(`/workflows/${workflowId}`);
    }

    /**
     * Start a workflow execution, calls the POST /workflows/{workflowId}/executions endpoint.
     *
     * @param {string} workflowId Id of the workflow
     * @param {object} input Input to the first step of the workflow
     */
    executeWorkflow(workflowId: string, input: object): Promise<any> {
      const body = {
        input,
      };

      return this.makePostRequest(`/workflows/${workflowId}/executions`, body);
    }

    /**
     * List executions in a workflow, calls the GET /workflows/{workflowId}/executions endpoint.
     *
     * @param {string }workflowId Id of the workflow
     * @param {string} status Status of the executions
     */
    listWorkflowExecutions(workflowId: string, status?: string): Promise<any> {
      const query = status ? { status } : undefined;

      return this.makeGetRequest(`/workflows/${workflowId}/executions`, query);
    }

    /**
     * Run inference and create a prediction, calls the POST /predictions endpoint.
     *
     * @param {string} documentId - the document id to run inference and create a prediction on
     * @param {string} modelId - the model id to use for inference
     * @param {number} [maxPages] - maximum number of pages to run predicitons on
     * @param {boolean} [autoRotate] - whether or not to let the API try different rotations on
     * the document when running predictions
     * @returns {Promise} - prediction on document
     */
    createPrediction(documentId: string, modelId: string, maxPages?: number, autoRotate?: boolean): Promise<any> {
      let body: any = {
        documentId,
        modelId,
      };

      if (maxPages !== undefined) {
        body = { ...body, maxPages };
      }

      if (autoRotate !== undefined) {
        body = { ...body, autoRotate };
      }

      return this.makePostRequest('/predictions', body);
    }

    /**
     * Creates a batch handle, calls the POST /batches endpoint
     *
     * @param {string} description - a short description of the batch you intend to create
     * @returns {Promise} - batch handle id and pre-signed upload url
     */
    createBatch(description: string) {
      const body = {
        description,
      };

      return this.makePostRequest('/batches', body);
    }

    /**
     * Creates a new user, calls the POST /users endpoint.
     *
     * @param {string} email Email to the new user
     */
    createUser(email: string): Promise<any> {
      return this.makePostRequest('/users', { email });
    }

    /**
     * List users, calls the GET /users endpoint.
     */
    listUsers(): Promise<any> {
      return this.makeGetRequest('/users');
    }


    /**
     * Get information about a specific user, calls the GET /users/{user_id} endpoint.
     *
     * @param {string} userId - Id of the user
     * @returns {Promise} - User response from REST API
     */
    getUser(userId: string): Promise<any> {
      return this.makeGetRequest(`/users/${userId}`);
    }

    /**
     * Delete the user with the provided user_id, calls the DELETE /users/{userId} endpoint.
     *
     * @param userId Id of the user
     */
    deleteUser(userId: string): Promise<any> {
      return this.makeDeleteRequest(`/users/${userId}`);
    }

    makeGetRequest(path: string, query?: any) {
      return this.makeAuthorizedRequest(axios.get, buildURL(path, query));
    }

    makeDeleteRequest(path: string, query?: any) {
      return this.makeAuthorizedRequest(axios.delete, buildURL(path, query));
    }

    makePostRequest(path: string, body: any) {
      return this.makeAuthorizedRequest(axios.post, path, body);
    }

    makePatchRequest(path: string, body: any) {
      return this.makeAuthorizedRequest(axios.patch, path, body);
    }

    private makeAuthorizedRequest(axiosFn: (url: string, body?: any, config?: AxiosRequestConfig) => Promise<any>, path: string, body?: any) {
      return new Promise<any>((resolve, reject) => {
        const endpoint = `${this.credentials.apiEndpoint}${path}`;
        this.getAuthorizationHeaders().then((headers) => {
          const config = { headers };
          const handle = body
            ? () => axiosFn(endpoint, body, config)
            : () => axiosFn(endpoint, config);

          handle().then((response) => {
            resolve(response.data);
          }).catch((error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    }

    private getAuthorizationHeaders(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.credentials.getAccessToken().then((accessToken) => {
          const headers = {
            'X-Api-Key': this.credentials.apiKey,
            Authorization: `Bearer ${accessToken}`,
          };

          resolve(headers);
        }).catch((error) => {
          reject(error);
        });
      });
    }
}

export default Client;
