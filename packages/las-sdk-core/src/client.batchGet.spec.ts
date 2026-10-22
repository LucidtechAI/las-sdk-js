/**
 * @jest-environment node
 */

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

let client = new Client(new StubCredentials('http://localhost:4010'));

beforeEach(() => {
  client = new Client(new StubCredentials('http://localhost:4010'));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Batch get through the list methods', () => {
  test.each([
    ['listActions', 'actions', 'actionId'],
    ['listHooks', 'hooks', 'hookId'],
    ['listModels', 'models', 'modelId'],
    ['listValidations', 'validations', 'validationId'],
    ['listFunctions', 'functions', 'functionId'],
  ] as const)('%s sends each ID as a repeated query parameter', async (method, path, key) => {
    const ids = [`cradl:x:${'a'.repeat(32)}`, `cradl:x:${'b'.repeat(32)}`];
    const response = { [path]: [], nextToken: null, unprocessedIds: [ids[1]] };
    const get = jest.spyOn(client, 'makeGetRequest').mockResolvedValue(response);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((client[method] as any)({ [key]: ids })).resolves.toEqual(response);

    expect(get).toHaveBeenCalledWith(`/${path}`, { [key]: ids });
  });
});
