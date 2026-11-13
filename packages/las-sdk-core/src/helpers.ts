import { Client } from './client';
import { Credentials, Token } from './credentials';

export const testEndpoint = 'http://localhost:4010';

export class TestCredentials extends Credentials {
  testAccessToken: string;

  testExpiration: number;

  testRefreshToken: string;

  constructor(testEndpoint: string, testAccessToken: string, testExpiresInSeconds: number, testRefreshToken: string) {
    super(testEndpoint);

    this.testAccessToken = testAccessToken;
    this.testExpiration = Date.now() + 1000 * testExpiresInSeconds;
    this.testRefreshToken = testRefreshToken;
  }

  getToken(): Promise<Token> {
    return Promise.resolve(new Token(this.testAccessToken, this.testExpiration, this.testRefreshToken));
  }
}

export function getTestClient() {
  const testAccessToken = 'testAccessToken';
  const testExpiresInSeconds = 3600;
  const testRefreshToken = 'testRefreshToken';
  const credentials = new TestCredentials(testEndpoint, testAccessToken, testExpiresInSeconds, testRefreshToken);
  return new Client(credentials);
}
