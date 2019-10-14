import axios, {AxiosRequestConfig} from 'axios';
import {Credentials} from './credentials';

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

    postDocuments(content: string, contentType: string, consentId: string) {
        const body = {
            'content': Buffer.from(content).toString('base64'),
            'contentType': contentType,
            'consentId': consentId
        };

        return this.makePostRequest('/documents', body);
    }

    postPredictions(documentId: string, modelName: string) {
        const body = {
            'documentId': documentId,
            'modelName': modelName
        };

        return this.makePostRequest('/predictions', body);
    }

    getProcesses() {
        return this.makeGetRequest('/processes');
    }

    postProcesses(stateMachineArn: string, inputData: any) {
        const body = {
            'stateMachineArn': stateMachineArn,
            'inputData': inputData
        };

        return this.makePostRequest('/processes', body);
    }

    postTasks(activityArn: string) {
        const body = {
            'activityArn': activityArn
        };

        return this.makePostRequest('/tasks', body);
    }

    patchTasks(taskId: string, taskResult: any) {
        const body = {
            'taskResult': taskResult
        };

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
             this.getAuthorizationHeaders().then(headers => {
                 const config = {headers: headers};
                 const handle = !!body ? () => axiosFn(endpoint, body, config) : () => axiosFn(endpoint, config);

                 handle().then(response => {
                     resolve(response.data);
                 }).catch(error => {
                     reject(error);
                 })
             }).catch(error => {
                 reject(error);
             })
        });
    }

    private getAuthorizationHeaders(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.credentials.getAccessToken().then(accessToken => {
                const headers = {
                    'X-Api-Key': this.credentials.apiKey,
                    'Authorization': `Bearer ${accessToken}`
                };

                resolve(headers);
            }).catch(error => {
                reject(error);
            });
        });
    }
}

