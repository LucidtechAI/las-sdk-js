import { Credentials, Token } from '@lucidtech/las-sdk-core';

export class TokenCredentials extends Credentials {
  readonly organizationId: string;

  constructor(apiEndpoint: string, accessToken: string, organizationId: string) {
    super(apiEndpoint, undefined, new Token(accessToken));
    this.organizationId = organizationId;
  }

  getAccessToken(): Promise<string> {
    return Promise.resolve(this.token.accessToken);
  }

  protected getToken(): Promise<Token> {
    return Promise.resolve(this.token);
  }
}
