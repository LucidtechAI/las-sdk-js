import { TokenStorage } from './storage';


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

    protected storage?: TokenStorage<Token>;

    protected constructor(apiKey: string, storage?: TokenStorage<Token>) {
      this.apiKey = apiKey;
      this.storage = storage;
    }

    getAccessToken(): Promise<string> {
      const { storage } = this;

      return new Promise<string>((resolve, reject) => {
        let token = this.token || null;

        if (!(token && token.isValid()) && storage) {
          token = storage.getPersistentToken();
        }

        if (token && token.isValid()) {
          this.token = token;
          return resolve(token.accessToken);
        }

        this.getToken().then((newToken) => {
          this.token = newToken;

          if (storage) {
            storage.setPersistentToken(newToken);
          }

          resolve(newToken.accessToken);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    protected abstract getToken(): Promise<Token>
}
