import { Credentials, Token } from './credentials';
import { Client } from './client';

const endpoint = 'http://localhost:4010';

export class TestCredentials extends Credentials {
  testAccessToken: string;

  testExpiration: number;

  testRefreshToken: string;

  constructor(
    testEndpoint: string,
    testApiKey: string,
    testAccessToken: string,
    testExpiresInSeconds: number,
    testRefreshToken: string,
  ) {
    super(testEndpoint, testApiKey);

    this.testAccessToken = testAccessToken;
    this.testExpiration = Date.now() + 1000 * testExpiresInSeconds;
    this.testRefreshToken = testRefreshToken;
  }

  getToken(): Promise<Token> {
    return new Promise<Token>((resolve, reject) => {
      resolve(new Token(this.testAccessToken, this.testExpiration, this.testRefreshToken));
    });
  }
}


export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

export function getTestClient() {
  const testApiKey = 'testApiKey';
  const testAccessToken = 'testAccessToken';
  const testExpiresInSeconds = 3600;
  const testRefreshToken = 'testRefreshToken';
  const credentials = new TestCredentials(endpoint, testApiKey, testAccessToken, testExpiresInSeconds, testRefreshToken);
  return new Client(credentials);
}
