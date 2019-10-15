import axios from 'axios';
import {SHA256} from 'crypto-js';
import * as base64 from 'crypto-js/enc-base64';
import {Credentials, Token} from '@lucidtech/las-sdk-core';

const utils = {
    randomString(alphabet: string, length: number) {
        const buffer = new Uint8Array(length);
        window.crypto.getRandomValues(buffer);
        let chars: string[] = [];
        buffer.forEach(v => chars.push(alphabet[v % alphabet.length]));
        return chars.join('');
    }
};

export default utils;

export class PKCE {
    static readonly CODE_CHALLENGE_ALPHABET: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._~-';
    static readonly CODE_CHALLENGE_LENGTH: number = 64;
    static readonly VERIFIER_KEY: string = 'pkceVerifier';
    static readonly CHALLENGE_KEY: string = 'pkceChallenge';

    readonly verifier: string;
    readonly challenge: string;

    constructor(verifier?: string, challenge?: string) {
        this.verifier = verifier || PKCE.generateVerifier();
        this.challenge = challenge || PKCE.generateChallenge(this.verifier);

        window.sessionStorage.setItem(PKCE.VERIFIER_KEY, this.verifier);
        window.sessionStorage.setItem(PKCE.CHALLENGE_KEY, this.challenge);
    }

    private static generateVerifier(): string {
        return utils.randomString(PKCE.CODE_CHALLENGE_ALPHABET, PKCE.CODE_CHALLENGE_LENGTH);
    }

    private static generateChallenge(verifier: string): string {
        return SHA256(verifier).toString(base64)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
}

export class PKCEDerived extends PKCE {
    readonly code: string;

    constructor(verifier: string, challenge: string, code: string) {
        super(verifier, challenge);
        this.code = code;
    }

    static createFromCode(code?: string): PKCEDerived | null {
        const verifier = window.sessionStorage.getItem(PKCE.VERIFIER_KEY);
        const challenge = window.sessionStorage.getItem(PKCE.CHALLENGE_KEY);

        if (!!code && !!verifier && !!challenge) {
            return new PKCEDerived(verifier, challenge, code);
        }

        return null;
    }
}


export class AuthorizationCodeCredentials extends Credentials {
    private readonly clientId: string;
    private readonly authEndpoint: string;
    private readonly redirectUri: string;
    private readonly launchUriFn: (uri: string) => void;
    private readonly pkce?: PKCEDerived;
    readonly getPersistentToken?: () => Token;
    readonly setPersistentToken?: (value: Token) => void;

    constructor(
        apiKey: string,
        clientId: string,
        authEndpoint: string,
        redirectUri: string,
        launchUriFn: (uri: string) => void,
        pkce?: PKCEDerived,
        getPersistentToken?: () => Token,
        setPersistentToken?: (value: Token) => void,
    ) {
        super(apiKey);

        this.clientId = clientId;
        this.authEndpoint = authEndpoint;
        this.redirectUri = redirectUri;
        this.launchUriFn = launchUriFn;
        this.pkce = pkce;
        this.getPersistentToken = getPersistentToken;
        this.setPersistentToken = setPersistentToken;
    }

    protected getToken(): Promise<Token> {
        return new Promise<Token>((resolve, reject) => {
            this.getRefreshToken().then(token => {
                resolve(token);
            }).catch(error => {
                this.getTokenFromCode().then(token => {
                    resolve(token);
                }).catch(error => {
                    this.initiateOAuthFlow();
                    reject(error);
                });
            });
        });
    }

    protected getRefreshToken(): Promise<Token> {
        return new Promise<Token>((resolve, reject) => {
            if (!!this.token && !!this.token.refreshToken) {
                const params = {
                    'grant_type': 'refresh_token',
                    'client_id': this.clientId,
                    'refresh_token': this.token.refreshToken
                };

                this.postToTokenEndpoint(params).then(token => {
                    resolve(token);
                }).catch(error => {
                    reject(error);
                });
            } else {
                reject({'message': 'No refresh token available'});
            }
        });
    }

    private getTokenFromCode(): Promise<Token> {
        return new Promise<Token>((resolve, reject) => {
            if (!!this.pkce) {
                const params = {
                    'grant_type': 'authorization_code',
                    'code': this.pkce.code,
                    'client_id': this.clientId,
                    'redirect_uri': this.redirectUri,
                    'code_verifier': this.pkce.verifier
                };

                this.postToTokenEndpoint(params).then(token => {
                    resolve(token);
                }).catch(error => {
                    reject(error);
                });
            } else {
                reject({'message': 'No PKCE code available'});
            }
        });
    }

    private postToTokenEndpoint(params: any): Promise<Token> {
        return new Promise<Token>((resolve, reject) => {
            const endpoint = `https://${this.authEndpoint}/oauth2/token`;
            const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
            const config = {headers: headers, params: params};

            axios.post(endpoint, null, config).then(response => {
                const token = new Token(
                    response.data['access_token'],
                    Date.now() + 1000 * response.data['expires_in'],
                    response.data['refresh_token']
                );
                resolve(token);
            }).catch(error => {
                reject(error);
            });
        });
    }

    initiateOAuthFlow(): void {
        const pkce = new PKCE();

        const params = {
            'response_type': 'code',
            'client_id': this.clientId,
            'redirect_uri': this.redirectUri,
            'code_challenge_method': 'S256',
            'code_challenge': pkce.challenge
        };

        const endpoint = `https://${this.authEndpoint}/oauth2/authorize`;
        const config = {url: endpoint, params: params};
        const uri = axios.getUri(config);
        this.launchUriFn(uri);
    }

    initiateLogoutFlow(): void {
        const params = {
            'client_id': this.clientId,
            'logout_uri': this.redirectUri
        };

        const endpoint = `https://${this.authEndpoint}/logout`;
        const config = {url: endpoint, params: params};
        const uri = axios.getUri(config);
        this.launchUriFn(uri);
    }

    isLoggedIn(): boolean {
        return !!this.token || !!this.pkce;
    }
}

