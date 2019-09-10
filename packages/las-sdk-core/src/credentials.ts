export class Token {
    readonly accessToken: string;
    readonly expiration: number;
    readonly refreshToken?: string;

    constructor(accessToken: string, expiration: number, refreshToken?: string) {
        this.accessToken = accessToken;
        this.expiration = expiration;
        this.refreshToken = refreshToken;
    }
}

export abstract class Credentials {
    readonly apiKey: string;
    protected token?: Token;

    protected constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    getAccessToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (!!this.token && Date.now() < this.token.expiration) {
                resolve(this.token.accessToken);
            } else {
                this.getToken().then(token => {
                    this.token = token;
                    resolve(token.accessToken);
                }).catch(error => {
                    reject(error);
                });
            }
        })
    }

    protected abstract getToken(): Promise<Token>
}

