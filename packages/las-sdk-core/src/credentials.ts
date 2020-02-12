import { TokenStorage } from './storage';


/**
 * Wrapper class for an AWS Cognito token
 */
export class Token {
    readonly accessToken: string;

    readonly expiration: number;

    readonly refreshToken?: string;

    /**
     * Checks if current timestamp is larger than token expiration time
     */
    isValid(): boolean {
      return Date.now() < this.expiration;
    }

    /**
     * @param {string} accessToken
     * @param {number} expiration
     * @param {string} [refreshToken]
     */
    constructor(accessToken: string, expiration: number, refreshToken?: string) {
      this.accessToken = accessToken;
      this.expiration = expiration;
      this.refreshToken = refreshToken;
    }
}

/**
 * Use to fetch and store credentials and to generate/cache an access token
 */
export abstract class Credentials {
    readonly apiKey: string;

    protected token?: Token;

    protected storage?: TokenStorage<Token>;

    protected constructor(apiKey: string, storage?: TokenStorage<Token>) {
      this.apiKey = apiKey;
      this.storage = storage;
    }

    /**
     * Method used to get and cache an access token. Algorithm used:
     * 1. Look for a valid token in memory.
     * 2. Look for a valid token in the storage (if provided);
     * 3. Fetch a new token from server and cache it (both in memory and in storage).
     */
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
