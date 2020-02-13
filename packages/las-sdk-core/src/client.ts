import axios, { AxiosRequestConfig } from 'axios';
import { Credentials } from './credentials';
import { buildURL } from './utils';


/**
 * A high-level http client for communicating the Lucidtech REST API
 */
export class Client {
    apiEndpoint: string;

    credentials: Credentials;

    constructor(apiEndpoint: string, credentials: Credentials) {
      this.apiEndpoint = apiEndpoint;
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
    createDocument(content: string, contentType: string, consentId: string, batchId?: string, feedback?: Array<{[key: string]: string}>) {
      let body: any = {
        content: Buffer.from(content).toString('base64'),
        contentType,
        consentId,
      };

      if (!!batchId ) {
        body = {...body, batchId};
      }

      if (!!feedback) {
        body = {...body, feedback};
      }

      return this.makePostRequest('/documents', body);
    }

    /**
      * @param {string} batchId - the batch id that contains the documents of interest
      * @param {string} [consentId] - an identifier to mark the owner of the document handle
      * @returns {Promise} - documents from REST API contained in batch <batchId>
      */
    listDocuments(batchId: string, consentId?: string) {
      const query = consentId ? { batchId, consentId } : { batchId };
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
    updateDocument(documentId: string, feedback: Array<{[key: string]: string}>) {
      // TODO add test for this method
      const body = {
        feedback,
      };

      return this.makePostRequest(`/documents/${documentId}`, body);
    }

    /**
     * Run inference and create a prediction, calls the POST /predictions endpoint.
     *
     * @param {string} documentId - the document id to run inference and create a prediction on
     * @param {string} modelName - the name of the model to use for inference
     * @param {number} [maxPages] - maximum number of pages to run predicitons on
     * @param {boolean} [autoRotate] - whether or not to let the API try different rotations on
     * the document when runnin predictions
     * @returns {Promise} - prediction on document
     */
    createPrediction(documentId: string, modelName: string, maxPages?: number, autoRotate?: boolean) {
      let body: any = {
        documentId,
        modelName,
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
     * Modifies consent hash for a user, calls the PATCH /users/{user_id} endpoint.
     *
     * @param {string} userId - the user id to modify consent hash for
     * @param {string} consentHash - the consent hash to set
     * @returns {Promise} - batch handle id and pre-signed upload url
     */
    updateUser(userId: string, consentHash: string) {
      // TODO add test for this method
      const body = { consentHash };
      return this.makePatchRequest(`/users/${userId}`, body);
    }

    /**
     * Gets consent hash and user id for a given user id, calls the GET /users/{user_id} endpoint.
     *
     * @param {string} userId - the user id to get consent hash for
     * @returns {Promise} - batch handle id and pre-signed upload url
     */
    getUser(userId: string) {
      return this.makeGetRequest(`/users/${userId}`);
    }

    makeGetRequest(path: string, query?: any) {
      return this.makeAuthorizedRequest(axios.get, buildURL(path, query));
    }

    makeDeleteRequest(path: string) {
      return this.makeAuthorizedRequest(axios.delete, path);
    }

    makePostRequest(path: string, body: any) {
      return this.makeAuthorizedRequest(axios.post, path, body);
    }

    makePatchRequest(path: string, body: any) {
      return this.makeAuthorizedRequest(axios.patch, path, body);
    }

    private makeAuthorizedRequest(axiosFn: (url: string, body?: any, config?: AxiosRequestConfig) => Promise<any>, path: string, body?: any) {
      return new Promise<any>((resolve, reject) => {
        const endpoint = `${this.apiEndpoint}${path}`;
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
