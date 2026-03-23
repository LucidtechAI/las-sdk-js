import axios, { AxiosResponse } from 'axios';
import * as qs from 'querystring';
import { Credentials, Token, TokenStorage } from '@lucidtech/las-sdk-core';

export class ClientCredentials extends Credentials {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly authEndpoint: string;

  constructor(
    apiEndpoint: string,
    clientId: string,
    clientSecret: string,
    authEndpoint: string,
    storage?: TokenStorage<Token>,
  ) {
    super(apiEndpoint, storage);

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.authEndpoint = authEndpoint;
  }

  protected getToken(): Promise<Token> {
    return new Promise<Token>((resolve, reject) => {
      const data = {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: 'https://api.cradl.ai/v1',
      }

      axios
        .post(this.authEndpoint, qs.stringify(data))
        .then((response: AxiosResponse) => {
          const token = new Token(response.data.access_token, Date.now() + 1000 * response.data.expires_in);

          resolve(token);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
