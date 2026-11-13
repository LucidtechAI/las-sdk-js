/**
 * @jest-environment node
 */

import axios from 'axios';

import { Client } from './client';
import { Credentials, Token } from './credentials';

// Not helpers.getTestClient: helpers imports uuid, an ES module jest doesn't load. Requests are stubbed here anyway.
class StubCredentials extends Credentials {
  constructor(apiEndpoint: string) {
    super(apiEndpoint);
  }

  getToken(): Promise<Token> {
    return Promise.resolve(new Token('testAccessToken', Date.now() + 3600 * 1000, 'testRefreshToken'));
  }
}

const apiEndpoint = 'http://localhost:4010';
let client = new Client(new StubCredentials(apiEndpoint));

beforeEach(() => {
  client = new Client(new StubCredentials(apiEndpoint));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Versions and aliases', () => {
  describe.each([
    ['Agent', 'agents', 'cradl:agent:abc'],
    ['Model', 'models', 'cradl:model:abc'],
    ['Function', 'functions', 'cradl:function:abc'],
  ] as const)('%s', (resource, path, id) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const call = (method: string, ...args: unknown[]) => (client as any)[method.replace('$', resource)](id, ...args);

    test('list$Versions requests GET /:id/versions', async () => {
      const get = jest.spyOn(client, 'makeGetRequest').mockResolvedValue({ versions: [], nextToken: null });

      await call('list$Versions', { maxResults: 5 });
      expect(get).toHaveBeenCalledWith(`/${path}/${id}/versions`, { maxResults: 5 });
    });

    test('create$Version requests POST /:id/versions', async () => {
      const post = jest.spyOn(client, 'makePostRequest').mockResolvedValue({});

      await call('create$Version');
      expect(post).toHaveBeenCalledWith(`/${path}/${id}/versions`, undefined);
    });

    test('list$Aliases requests GET /:id/aliases', async () => {
      const get = jest.spyOn(client, 'makeGetRequest').mockResolvedValue({ aliases: [] });

      await call('list$Aliases');
      expect(get).toHaveBeenCalledWith(`/${path}/${id}/aliases`, undefined);
    });

    test('get$Alias requests GET /:id/aliases/:alias', async () => {
      const get = jest.spyOn(client, 'makeGetRequest').mockResolvedValue({});

      await call('get$Alias', 'prod');
      expect(get).toHaveBeenCalledWith(`/${path}/${id}/aliases/prod`, undefined);
    });

    test('set$Alias sends the version with PUT /:id/aliases/:alias', async () => {
      const put = jest.spyOn(client, 'makePutRequest').mockResolvedValue({});

      await call('set$Alias', 'prod', { resourceVersion: 3 });
      expect(put).toHaveBeenCalledWith(`/${path}/${id}/aliases/prod`, { resourceVersion: 3 });
    });

    test('delete$Alias requests DELETE /:id/aliases/:alias', async () => {
      const del = jest.spyOn(client, 'makeDeleteRequest').mockResolvedValue({});

      await call('delete$Alias', 'prod');
      expect(del).toHaveBeenCalledWith(`/${path}/${id}/aliases/prod`, undefined);
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  test('setAgentAlias sends an environment, and null to clear it', async () => {
    const put = jest.spyOn(axios, 'put').mockResolvedValue({ data: {} });

    await client.setAgentAlias('cradl:agent:abc', 'prod', { resourceVersion: 2, environmentId: 'env-0123456789ab' });
    await client.setAgentAlias('cradl:agent:abc', 'prod', { resourceVersion: 2, environmentId: null });

    const url = `${apiEndpoint}/agents/cradl:agent:abc/aliases/prod`;
    expect(put).toHaveBeenNthCalledWith(
      1,
      url,
      { resourceVersion: 2, environmentId: 'env-0123456789ab' },
      expect.anything(),
    );
    expect(put).toHaveBeenNthCalledWith(2, url, { resourceVersion: 2, environmentId: null }, expect.anything());
  });

  test('createAgentVersion sends an empty body', async () => {
    const post = jest.spyOn(axios, 'post').mockResolvedValue({ data: {} });

    await client.createAgentVersion('cradl:agent:abc');
    expect(post).toHaveBeenCalledWith(`${apiEndpoint}/agents/cradl:agent:abc/versions`, {}, expect.anything());
  });

  test("a version's publishedTime is a Date", async () => {
    const publishedTime = '2026-11-12T10:00:00.123456+0000';
    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { versions: [{ agentId: 'cradl:agent:abc:1', publishedTime }] } });

    const { versions } = await client.listAgentVersions('cradl:agent:abc');
    expect(versions[0].publishedTime).toEqual(new Date(publishedTime));
  });
});

describe('Qualified and organization-named IDs in paths', () => {
  test.each([
    ['cradl:agent:abc:3', '/agents/cradl:agent:abc:3'],
    ['cradl:agent:abc:@prod', '/agents/cradl:agent:abc:@prod'],
    ['cradl:agent:abc:$latest', '/agents/cradl:agent:abc:$latest'],
  ])('getAgent(%s) requests %s', async (agentId, path) => {
    const get = jest.spyOn(axios, 'get').mockResolvedValue({ data: {} });

    await client.getAgent(agentId);
    expect(get).toHaveBeenCalledWith(`${apiEndpoint}${path}`, expect.anything());
  });

  test("an ID naming its organization has its '/' encoded", async () => {
    const get = jest.spyOn(axios, 'get').mockResolvedValue({ data: {} });

    await client.getFunction('cradl:organization:cradl/cradl:function:abc:@prod');
    expect(get).toHaveBeenCalledWith(
      `${apiEndpoint}/functions/cradl:organization:cradl%2Fcradl:function:abc:@prod`,
      expect.anything(),
    );
  });
});

describe('Agents', () => {
  test('deleteAgent sends deleteResources in the query', async () => {
    const del = jest.spyOn(axios, 'delete').mockResolvedValue({ data: {} });

    await client.deleteAgent('cradl:agent:abc', { deleteResources: true });
    await client.deleteAgent('cradl:agent:abc');

    expect(del).toHaveBeenNthCalledWith(
      1,
      `${apiEndpoint}/agents/cradl:agent:abc?deleteResources=true`,
      expect.anything(),
    );
    expect(del).toHaveBeenNthCalledWith(2, `${apiEndpoint}/agents/cradl:agent:abc`, expect.anything());
  });

  test('updateAgent sends environments and the draft environment', async () => {
    const patch = jest.spyOn(client, 'makePatchRequest').mockResolvedValue({});
    const options = {
      environments: [{ name: 'prod', variables: [{ name: 'API_URL', value: 'https://example.com' }] }],
      draftEnvironmentId: null,
    };

    await client.updateAgent('cradl:agent:abc', options);
    expect(patch).toHaveBeenCalledWith('/agents/cradl:agent:abc', options);
  });

  test('createAgentRun sends the trigger', async () => {
    const post = jest.spyOn(client, 'makePostRequest').mockResolvedValue({});

    await client.createAgentRun('cradl:agent:abc:@prod', { triggerId: 'cradl:action:abc', variables: { a: 1 } });
    expect(post).toHaveBeenCalledWith('/agents/cradl:agent:abc:@prod/runs', {
      triggerId: 'cradl:action:abc',
      variables: { a: 1 },
    });
  });
});

describe('AppClients', () => {
  test('createAppClient creates an app client with a secret', async () => {
    const post = jest.spyOn(client, 'makePostRequest').mockResolvedValue({});

    await client.createAppClient({ name: 'name', roleIds: [] });
    expect(post).toHaveBeenCalledWith('/appClients', { name: 'name', roleIds: [], generateSecret: true });
  });
});

describe('Models', () => {
  test('are created and updated with a supported LLM version only', async () => {
    const post = jest.spyOn(client, 'makePostRequest').mockResolvedValue({});
    jest.spyOn(client, 'makePatchRequest').mockResolvedValue({});

    await client.createModel({ fieldConfig: {}, llmVersion: 'sonnet-5.5' });
    expect(post).toHaveBeenCalledWith('/models', { fieldConfig: {}, llmVersion: 'sonnet-5.5' });

    // @ts-expect-error sonnet-4.5 is no longer supported
    await client.createModel({ fieldConfig: {}, llmVersion: 'sonnet-4.5' });
    // @ts-expect-error haiku-5.5 is no longer supported
    await client.updateModel('cradl:model:abc', { llmVersion: 'haiku-5.5' });
  });
});
