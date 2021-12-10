import { v4 as uuidv4 } from 'uuid';

import { Credentials, Token } from './credentials';
import { Client } from './client';

const endpoint = 'http://localhost:4010';

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
    return new Promise<Token>((resolve, _reject) => {
      resolve(new Token(this.testAccessToken, this.testExpiration, this.testRefreshToken));
    });
  }
}

export const uuidWithoutDashes = () => uuidv4().replace(/-/g, '');

export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

export function getTestClient() {
  const testAccessToken = 'testAccessToken';
  const testExpiresInSeconds = 3600;
  const testRefreshToken = 'testRefreshToken';
  const credentials = new TestCredentials(endpoint, testAccessToken, testExpiresInSeconds, testRefreshToken);
  return new Client(credentials);
}
