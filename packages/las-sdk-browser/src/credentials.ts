import { Credentials, Token } from '@lucidtech/las-sdk-core';

export class TokenCredentials extends Credentials {
  readonly organizationId: string;

  constructor(apiEndpoint: string, accessToken: string, organizationId: string) {
    super(apiEndpoint, undefined, new Token(accessToken));
    this.organizationId = organizationId;
  }

  getAccessToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve(this.token.accessToken);
    });
  }

  protected getToken(): Promise<Token> {
    return new Promise<Token>((resolve, reject) => {
      resolve(this.token);
    });
  }
}
