import cognito from './cognito';
import config from './config';
import 'isomorphic-fetch';


function queryParams(params) {
    const encode = s => encodeURIComponent(s);
    const queryString = Object.keys(params)
        .filter(k => params[k])
        .map(k => {
            return `${encode(k)}=${encode(params[k])}`;
        }).join('&');

    return queryString ? `?${queryString}` : '';
}


let localStorage;

if (global.window) {
    localStorage = window.localStorage;
} else {
    localStorage = require('localStorage');
}


const las = {
    callApi(path, params, method, body, contentType) {
        const apiKey = localStorage.getItem('apiKey');
        const baseEndpoint = config.endpoint;
        const stage = config.stage;

        return new Promise((resolve, reject) => {
            this.getSession().then(session => {
                const headers = new Headers({
                    'Content-Type': contentType,
                    'X-Api-Key': apiKey,
                    'Authorization': session.getIdToken().getJwtToken()
                });

                let endpoint = [baseEndpoint, stage, path].join('/');
                endpoint = `${endpoint}${queryParams(params)}`;

                const request = new Request(endpoint, {
                    headers: headers,
                    body: body,
                    method: method
                });

                fetch(request).then((response) => {
                    return response.json();
                }).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    },

    scanReceiptWithUrl(receiptUrl) {
        const params = {
            maxResults: 3,
            minConfidence: 0,
            url: receiptUrl
        };

        return this.callApi('receipts', params, 'POST', null, 'application/json');
    },

    scanReceiptWithFile(file) {
        const params = {
            maxResults: 3,
            minConfidence: 0
        };

        return this.callApi('receipts', params, 'POST', file, 'image/jpeg');
    },

    configure(apiKey) {
        localStorage.setItem('apiKey', apiKey);
    },

    getApiKey() {
        return localStorage.getItem('apiKey');
    },

    login(username, password) {
        return new Promise((resolve, reject) => {
            cognito.authenticate(username, password).then(({auth, user}) => {
                resolve(true);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getSession() {
        return new Promise((resolve, reject) => {
            let user = cognito.user();

            if (user) {
                user.getSession((error, session) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(session);
                    }
                });
            } else {
                reject('User is null');
            }
        });
    }
};


export default las;
