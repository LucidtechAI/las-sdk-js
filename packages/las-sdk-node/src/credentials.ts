import axios, { AxiosResponse } from 'axios';
import { Credentials, Token, TokenStorage } from '@lucidtech/las-sdk-core';


export class ClientCredentials extends Credentials {
    private readonly clientId: string;

    private readonly clientSecret: string;

    private readonly authEndpoint: string;

    protected readonly storage?: TokenStorage<Token>;

    constructor(apiKey: string, clientId: string, clientSecret: string, authEndpoint: string, storage?: TokenStorage<Token>) {
      super(apiKey, storage);

      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.authEndpoint = authEndpoint;
    }

    protected getToken(): Promise<Token> {
      return new Promise<Token>((resolve, reject) => {
        const endpoint = `https://${this.authEndpoint}/oauth2/token?grant_type=client_credentials`;
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const auth = { username: this.clientId, password: this.clientSecret };
        const config = { headers, auth };

        axios.post(endpoint, null, config).then((response: AxiosResponse) => {
          const token = new Token(
            response.data.accessToken,
            Date.now() + 1000 * response.data.expiration,
          );

          resolve(token);
        }).catch((error) => {
          reject(error);
        });
      });
    }
}
