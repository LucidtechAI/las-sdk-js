import {Credentials, Token} from "./credentials";
import {Client} from "./client";

export class TestCredentials extends Credentials {
    testAccessToken: string;
    testExpiration: number;
    testRefreshToken: string;

    constructor(testApiKey: string, testAccessToken: string, testExpiresInSeconds: number, testRefreshToken: string) {
        super(testApiKey);

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
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
}

export function getTestClient() {
    const testApiKey = 'testApiKey';
    const testAccessToken = 'testAccessToken';
    const testExpiresInSeconds = 3600;
    const testRefreshToken = 'testRefreshToken';
    const credentials = new TestCredentials(testApiKey, testAccessToken, testExpiresInSeconds, testRefreshToken);
    const endpoint = 'http://localhost:8080';
    return new Client(endpoint, credentials);
}

test('Loading helpers', () => {});
