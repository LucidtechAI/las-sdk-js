import { Client } from '@lucidtech/las-sdk-core';
import axios from 'axios';

import { TokenCredentials } from './credentials';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('TokenCredentials', () => {
  test('authorizes requests with the access token it was given', async () => {
    const credentials = new TokenCredentials('http://localhost:4010', 'accessToken', 'cradl:organization:a');
    const get = jest.spyOn(axios, 'get').mockResolvedValue({ data: {}, headers: {} });

    await expect(credentials.getAccessToken()).resolves.toBe('accessToken');
    await new Client(credentials).getAgent('cradl:agent:a');

    expect(credentials.organizationId).toBe('cradl:organization:a');
    // It has no other token to get
    await expect(credentials['getToken']()).resolves.toEqual(expect.objectContaining({ accessToken: 'accessToken' }));
    expect(get).toHaveBeenCalledWith('http://localhost:4010/agents/cradl:agent:a', {
      headers: { Authorization: 'Bearer accessToken' },
    });
  });
});
