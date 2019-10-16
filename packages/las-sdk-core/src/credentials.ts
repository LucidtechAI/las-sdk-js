import { ITokenStorage } from './storage';


export class Token {
    readonly accessToken: string;
    readonly expiration: number;
    readonly refreshToken?: string;

    isValid() {
        return Date.now() < this.expiration;
    }

    constructor(accessToken: string, expiration: number, refreshToken?: string) {
        this.accessToken = accessToken;
        this.expiration = expiration;
        this.refreshToken = refreshToken;
    }
}

export abstract class Credentials {
    readonly apiKey: string;
    protected token?: Token;
    protected storage?: ITokenStorage<Token>;

    protected constructor(apiKey: string, storage?: ITokenStorage<Token>) {
        this.apiKey = apiKey;
        this.storage = storage;
    }

    getAccessToken(): Promise<string> {
        const storage = this.storage;

        return new Promise<string>((resolve, reject) => {
            const token = storage
              ? storage.getPersistentToken() || undefined
              : this.token;

            if (token && token.isValid()) {
                return resolve(token.accessToken);
            }

            this.getToken().then(token => {
                this.token = token;

                if (storage) {
                  storage.setPersistentToken(token);
                }

                resolve(token.accessToken);
            }).catch(error => {
                reject(error);
            });
        })
    }

    protected abstract getToken(): Promise<Token>
}
