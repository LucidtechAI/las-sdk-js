import axios, { AxiosRequestConfig } from 'axios';
import { Credentials } from './credentials';
import { buildURL } from './utils';

export class Client {
    apiEndpoint: string;

    credentials: Credentials;

    constructor(apiEndpoint: string, credentials: Credentials) {
      this.apiEndpoint = apiEndpoint;
      this.credentials = credentials;
    }

    getDocument(documentId: string) {
      return this.makeGetRequest(`/documents/${documentId}`);
    }

    getData() {
      return this.makeGetRequest('/data');
    }

    postDocuments(content: string, contentType: string, consentId: string) {
      const body = {
        content: Buffer.from(content).toString('base64'),
        contentType,
        consentId,
      };

      return this.makePostRequest('/documents', body);
    }

    postPredictions(documentId: string, modelName: string) {
      const body = {
        documentId,
        modelName,
      };

      return this.makePostRequest('/predictions', body);
    }

    getProcesses(search?: { [key: string]: string|Array<string> }) {
      const url = buildURL('/processes', search);
      return this.makeGetRequest(url);
    }

    postProcesses(stateMachineArn: string, inputData: any) {
      const body = {
        stateMachineArn,
        inputData,
      };

      return this.makePostRequest('/processes', body);
    }

    postTasks(activityArn: string) {
      const body = {
        activityArn,
      };

      return this.makePostRequest('/tasks', body);
    }

    deleteProcess(processId: string) {
      const url = `/processes/${processId}`;
      return this.makeDeleteRequest(url);
    }

    /**
     * Either taskResult or taskError shoud be provided, but not both.
     */
    patchTasks(taskId: string, taskResult?: any, taskError?: any) {
      const body = taskResult ? { taskResult } : { taskError };
      return this.makePatchRequest(`/tasks/${taskId}`, body);
    }

    makeGetRequest(path: string) {
      return this.makeAuthorizedRequest(axios.get, path);
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
          const handle = body ? () => axiosFn(endpoint, body, config) : () => axiosFn(endpoint, config);

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
