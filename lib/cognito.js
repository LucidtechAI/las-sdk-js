import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import config from './config';
import * as log from 'loglevel';

import {
    AUTHENTICATED,
    NOT_AUTHENTICATED,
    NEW_PASSWORD_REQUIRED,
    MFA_CODE_REQUIRED,
    PASSWORD_RESET_REQUIRED
} from './constants';


const cognito = {
    userPool: new CognitoUserPool({
        UserPoolId: config.userPoolId,
        ClientId: config.clientId
    }),

    user() {
        return this.userPool.getCurrentUser();
    },

    authenticate(username, password) {
        return new Promise((resolve, reject) => {
            let user = new CognitoUser({Username: username, Pool: this.userPool});

            let authDetails = new AuthenticationDetails({
                Username: username,
                Password: password
            });

            let response = (auth) => ({auth: auth, user: user});

            user.authenticateUser(authDetails, {
                onSuccess: (session) => {
                    log.info(session, 'authenticate.onSuccess');
                    resolve(response(AUTHENTICATED));
                },

                onFailure: (error) => {
                    log.warn(error, 'authenticate.onFailure');
                    if (error.code === 'PasswordResetRequiredException') {
                        resolve(response(PASSWORD_RESET_REQUIRED));
                    } else {
                        reject(error);
                    }
                },

                newPasswordRequired(userAttributes, requiredAttributes) {
                    log.info(requiredAttributes, 'authenticate.newPasswordRequired');
                    resolve(response(NEW_PASSWORD_REQUIRED));
                },

                mfaRequired(deliveryDetails) {
                    log.info(deliveryDetails, 'authenticate.mfaRequired');
                    resolve(response(MFA_CODE_REQUIRED));
                },

                customChallenge(details) {
                    log.info(details, 'authenticate.customChallenge');
                    const error = new Error('username or password is incorrect');
                    reject(error);
                }
            });
        });
    },

    signOut(user) {
        let response = (auth) => ({auth: auth, user: user});

        return new Promise((resolve, reject) => {
            if (user) {
                user.signOut();
                resolve(response(NOT_AUTHENTICATED));
            } else {
                reject(response(NOT_AUTHENTICATED));
            }
        });
    },

    newPassword(user, password) {
        let response = (auth) => ({auth: auth, user: user});

        return new Promise((resolve, reject) => {
            user.completeNewPasswordChallenge(password, null, {
                onSuccess: (session) => {
                    log.info(session, 'newPassword.onSuccess');
                    resolve(response(AUTHENTICATED));
                },

                onFailure: (error) => {
                    log.warn(error, 'newPassword.onFailure');
                    reject(error);
                }
            });
        });
    },

    resetPassword(user, code, password) {
        let response = (auth) => ({auth: auth, user: user});

        return new Promise((resolve, reject) => {
            user.confirmPassword(code, password, {
                onSuccess: (session) => {
                    log.info(session, 'resetPassword.onSuccess');
                    resolve(response(NOT_AUTHENTICATED));
                },

                onFailure: (error) => {
                    log.warn(error, 'resetPassword.onFailure');
                    reject(error);
                }
            });
        });
    },

    forgotPassword(username) {
        return new Promise((resolve, reject) => {
            let user = new CognitoUser({Username: username, Pool: this.userPool});

            let response = (auth) => ({auth: auth, user: user});

            user.forgotPassword({
                onSuccess: (data) => {
                    log.info(data, 'forgotPassword.onSuccess');
                    resolve(response(PASSWORD_RESET_REQUIRED));
                },

                onFailure: (error) => {
                    log.warn(error, 'forgotPassword.onFailure');
                    reject(error);
                }
            });
        });
    }
};


export default cognito;