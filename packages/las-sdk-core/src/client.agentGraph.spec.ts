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

let counter = 0;
const createAgentId = () => `cradl:agent:${String(++counter).padStart(32, '0')}`;

beforeEach(() => {
  client = new Client(new StubCredentials('http://localhost:4010'));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Agent graph', () => {
  describe('getAgentGraph', () => {
    test('requests GET /agents/:id/graph', async () => {
      const agentId = createAgentId();
      const graph = { agentId, nodes: [], edges: [], layout: {} };
      const get = jest.spyOn(client, 'makeGetRequest').mockResolvedValue(graph);

      await expect(client.getAgentGraph(agentId)).resolves.toEqual(graph);
      expect(get).toHaveBeenCalledWith(`/agents/${agentId}/graph`, undefined);
    });
  });

  describe('updateAgentGraph', () => {
    test('sends the moved nodes with PATCH /agents/:id/graph', async () => {
      const agentId = createAgentId();
      const options = { layout: { 'cradl:action:abc': { x: 12.5, y: -3 }, 'cradl:hook:def': null } };
      const graph = { agentId, nodes: [], edges: [], layout: { 'cradl:action:abc': { x: 12.5, y: -3 } } };
      const patch = jest.spyOn(client, 'makePatchRequest').mockResolvedValue(graph);

      await expect(client.updateAgentGraph(agentId, options)).resolves.toEqual(graph);
      expect(patch).toHaveBeenCalledWith(`/agents/${agentId}/graph`, options);
    });
  });

  describe('agentId on create', () => {
    test('is sent with the resource', async () => {
      const agentId = createAgentId();
      const post = jest.spyOn(client, 'makePostRequest').mockResolvedValue({});

      await client.createAction({ agentId, config: {}, functionId: 'cradl:organization:cradl/cradl:function:f' });
      await client.createHook({ agentId, config: {}, functionId: null, trigger: 'Document is Created' });
      await client.createModel({ agentId, fieldConfig: {} });
      await client.createValidation({ agentId, config: {} });

      for (const [path] of [['/actions'], ['/hooks'], ['/models'], ['/validations']]) {
        expect(post).toHaveBeenCalledWith(path, expect.objectContaining({ agentId }));
      }
    });

    test('is not an update option: a resource stays in the agent it was created for', async () => {
      const agentId = createAgentId();
      jest.spyOn(client, 'makePatchRequest').mockResolvedValue({});

      // @ts-expect-error agentId can only be set on create
      await client.updateAction('cradl:action:abc', { agentId });
      // @ts-expect-error agentId can only be set on create
      await client.updateHook('cradl:hook:abc', { agentId });
      // @ts-expect-error agentId can only be set on create
      await client.updateModel('cradl:model:abc', { agentId });
      // @ts-expect-error agentId can only be set on create
      await client.updateValidation('cradl:validation:abc', { agentId });
    });
  });
});
