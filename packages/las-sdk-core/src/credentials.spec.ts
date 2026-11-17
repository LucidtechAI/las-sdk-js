import { Token } from './credentials';
import { TestCredentials, testEndpoint } from './helpers';
import { TokenStorage } from './storage';

class MemoryStorage implements TokenStorage<Token> {
  token: Token | null = null;

  getPersistentToken() {
    return this.token;
  }

  setPersistentToken(value: Token) {
    this.token = value;
  }
}

class StoredCredentials extends TestCredentials {
  constructor(storage: TokenStorage<Token>, expiresInSeconds = 3600) {
    super(testEndpoint, 'newAccessToken', expiresInSeconds, 'refreshToken');
    this.storage = storage;
  }
}

describe('Token', () => {
  test('is valid until it expires', () => {
    expect(new Token('a', Date.now() + 1000).isValid()).toBe(true);
    expect(new Token('a', Date.now() - 1).isValid()).toBe(false);
    expect(new Token('a').isValid()).toBe(false);
  });
});

describe('getAccessToken', () => {
  test('gets a token, and reuses it while it is valid', async () => {
    const credentials = new TestCredentials(testEndpoint, 'accessToken', 3600, 'refreshToken');
    const getToken = jest.spyOn(credentials, 'getToken');

    await expect(credentials.getAccessToken()).resolves.toBe('accessToken');
    await expect(credentials.getAccessToken()).resolves.toBe('accessToken');
    expect(getToken).toHaveBeenCalledTimes(1);
  });

  test('gets a new token when it has expired', async () => {
    const credentials = new TestCredentials(testEndpoint, 'accessToken', -1, 'refreshToken');
    const getToken = jest.spyOn(credentials, 'getToken');

    await credentials.getAccessToken();
    await credentials.getAccessToken();
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  test('uses a valid token from the storage', async () => {
    const storage = new MemoryStorage();
    storage.token = new Token('storedAccessToken', Date.now() + 1000);
    const credentials = new StoredCredentials(storage);
    const getToken = jest.spyOn(credentials, 'getToken');

    await expect(credentials.getAccessToken()).resolves.toBe('storedAccessToken');
    expect(getToken).not.toHaveBeenCalled();
  });

  test('stores the new token when the stored one has expired', async () => {
    const storage = new MemoryStorage();
    storage.token = new Token('storedAccessToken', Date.now() - 1);
    const credentials = new StoredCredentials(storage);

    await expect(credentials.getAccessToken()).resolves.toBe('newAccessToken');
    expect(storage.token?.accessToken).toBe('newAccessToken');
  });

  test('rejects when getting a token fails', async () => {
    const credentials = new TestCredentials(testEndpoint, 'accessToken', 3600, 'refreshToken');
    const error = new Error('invalid_client');
    jest.spyOn(credentials, 'getToken').mockRejectedValue(error);

    await expect(credentials.getAccessToken()).rejects.toBe(error);
  });
});
