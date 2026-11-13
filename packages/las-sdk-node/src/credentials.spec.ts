import { Token, TokenStorage } from '@lucidtech/las-sdk-core';
import axios from 'axios';

import { ClientCredentials } from './credentials';

const authEndpoint = 'https://auth.cradl.ai/oauth2/token';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('ClientCredentials', () => {
  test('gets a token with the client credentials grant', async () => {
    const now = Date.now();
    jest.spyOn(Date, 'now').mockReturnValue(now);
    const post = jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { access_token: 'accessToken', expires_in: 3600 } });
    const credentials = new ClientCredentials('http://localhost:4010', 'clientId', 'clientSecret', authEndpoint);

    await expect(credentials.getAccessToken()).resolves.toBe('accessToken');

    const form = new URLSearchParams(post.mock.calls[0][1] as string);
    expect(post).toHaveBeenCalledWith(authEndpoint, expect.any(String));
    expect(Object.fromEntries(form)).toEqual({
      grant_type: 'client_credentials',
      client_id: 'clientId',
      client_secret: 'clientSecret',
      audience: 'https://api.cradl.ai/v1',
    });

    // The token is reused until it expires
    await credentials.getAccessToken();
    expect(post).toHaveBeenCalledTimes(1);
  });

  test('stores the token it gets', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { access_token: 'accessToken', expires_in: 3600 } });
    const storage: TokenStorage<Token> = { getPersistentToken: jest.fn(() => null), setPersistentToken: jest.fn() };
    const credentials = new ClientCredentials('http://localhost:4010', 'id', 'secret', authEndpoint, storage);

    await credentials.getAccessToken();

    expect(storage.setPersistentToken).toHaveBeenCalledWith(expect.objectContaining({ accessToken: 'accessToken' }));
  });

  test('rejects when the auth endpoint does', async () => {
    const error = new Error('Request failed with status code 401');
    jest.spyOn(axios, 'post').mockRejectedValue(error);
    const credentials = new ClientCredentials('http://localhost:4010', 'id', 'secret', authEndpoint);

    await expect(credentials.getAccessToken()).rejects.toBe(error);
  });
});
