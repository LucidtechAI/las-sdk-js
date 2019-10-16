export class Token {
    readonly accessToken: string;
    readonly expiration: number;
    readonly refreshToken?: string;

    isActive() {
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
    getPersistentToken?: (...args: any[]) => Token|null;
    setPersistentToken?: (...args: any[]) => void;

    protected constructor(apiKey: string, options?: { [key: string]: any }) {
        this.apiKey = apiKey;

        if (options == null) {
          return;
        }

        const { getPersistentToken, setPersistentToken } = options;
        this.getPersistentToken = getPersistentToken;
        this.setPersistentToken = setPersistentToken;
    }

    getAccessToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (this.getPersistentToken) {
                const token = this.getPersistentToken();

                if (!!token && token.isActive()) {
                    return resolve(token.accessToken);
                }
            }

            if (!!this.token && this.token.isActive()) {
                return resolve(this.token.accessToken);
            }

            this.getToken().then(token => {
                this.token = token;

                if (this.setPersistentToken) {
                  this.setPersistentToken(token);
                }

                resolve(token.accessToken);
            }).catch(error => {
                reject(error);
            });
        })
    }

    protected abstract getToken(): Promise<Token>
}
