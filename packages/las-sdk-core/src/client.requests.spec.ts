/**
 * @jest-environment node
 */

import axios from 'axios';

import { Client } from './client';
import { getTestClient, testEndpoint } from './helpers';

let client = getTestClient();

beforeEach(() => {
  client = getTestClient();
  for (const verb of ['get', 'delete', 'post', 'patch', 'put'] as const) {
    jest.spyOn(axios, verb).mockResolvedValue({ data: {}, headers: {} });
  }
});

afterEach(() => {
  jest.restoreAllMocks();
});

type Verb = 'get' | 'delete' | 'post' | 'patch' | 'put';
type Row = [method: string, args: unknown[], verb: Verb, path: string, body?: object];

const page = { maxResults: 2, nextToken: 'token' };
const pageQuery = '?maxResults=2&nextToken=token';
const update = { name: 'name' };

/* Every API method: what it's called with, and the request it makes */
const requests: Row[] = [
  ['listActions', [page], 'get', `/actions${pageQuery}`],
  ['getAction', ['cradl:action:a'], 'get', '/actions/cradl:action:a'],
  [
    'createAction',
    [{ config: {}, functionId: 'cradl:function:f' }],
    'post',
    '/actions',
    { config: {}, functionId: 'cradl:function:f' },
  ],
  ['updateAction', ['cradl:action:a', update], 'patch', '/actions/cradl:action:a', update],
  ['deleteAction', ['cradl:action:a'], 'delete', '/actions/cradl:action:a'],
  ['listActionRuns', ['cradl:action:a', page], 'get', `/actions/cradl:action:a/runs${pageQuery}`],
  ['getActionRun', ['cradl:action:a', 'run'], 'get', '/actions/cradl:action:a/runs/run'],
  ['createActionRun', ['cradl:action:a', { input: {} }], 'post', '/actions/cradl:action:a/runs', { input: {} }],
  [
    'updateActionRun',
    ['cradl:action:a', 'run', { output: {} }],
    'patch',
    '/actions/cradl:action:a/runs/run',
    { output: {} },
  ],
  ['deleteActionRun', ['cradl:action:a', 'run'], 'delete', '/actions/cradl:action:a/runs/run'],

  ['listAgents', [page], 'get', `/agents${pageQuery}`],
  ['getAgent', ['cradl:agent:a'], 'get', '/agents/cradl:agent:a'],
  ['createAgent', [update], 'post', '/agents', update],
  ['updateAgent', ['cradl:agent:a', update], 'patch', '/agents/cradl:agent:a', update],
  ['deleteAgent', ['cradl:agent:a'], 'delete', '/agents/cradl:agent:a'],
  ['getAgentGraph', ['cradl:agent:a'], 'get', '/agents/cradl:agent:a/graph'],
  ['updateAgentGraph', ['cradl:agent:a', { layout: {} }], 'patch', '/agents/cradl:agent:a/graph', { layout: {} }],
  ['listAgentVersions', ['cradl:agent:a', page], 'get', `/agents/cradl:agent:a/versions${pageQuery}`],
  ['createAgentVersion', ['cradl:agent:a'], 'post', '/agents/cradl:agent:a/versions', {}],
  ['listAgentAliases', ['cradl:agent:a'], 'get', '/agents/cradl:agent:a/aliases'],
  ['getAgentAlias', ['cradl:agent:a', 'prod'], 'get', '/agents/cradl:agent:a/aliases/prod'],
  [
    'setAgentAlias',
    ['cradl:agent:a', 'prod', { resourceVersion: 1 }],
    'put',
    '/agents/cradl:agent:a/aliases/prod',
    { resourceVersion: 1 },
  ],
  ['deleteAgentAlias', ['cradl:agent:a', 'prod'], 'delete', '/agents/cradl:agent:a/aliases/prod'],
  ['listAgentRuns', ['cradl:agent:a', page], 'get', `/agents/cradl:agent:a/runs${pageQuery}`],
  ['getAgentRun', ['cradl:agent:a', 'run'], 'get', '/agents/cradl:agent:a/runs/run'],
  ['createAgentRun', ['cradl:agent:a', { variables: {} }], 'post', '/agents/cradl:agent:a/runs', { variables: {} }],
  [
    'updateAgentRun',
    ['cradl:agent:a', 'run', { metadata: {} }],
    'patch',
    '/agents/cradl:agent:a/runs/run',
    { metadata: {} },
  ],
  ['deleteAgentRun', ['cradl:agent:a', 'run'], 'delete', '/agents/cradl:agent:a/runs/run'],
  ['getAgentStatistics', ['cradl:agent:a'], 'get', '/agents/cradl:agent:a/statistics'],

  ['listAppClients', [page], 'get', `/appClients${pageQuery}`],
  ['getAppClient', ['cradl:app-client:a'], 'get', '/appClients/cradl:app-client:a'],
  ['createAppClient', [{ roleIds: [] }], 'post', '/appClients', { roleIds: [], generateSecret: true }],
  ['updateAppClient', ['cradl:app-client:a', update], 'patch', '/appClients/cradl:app-client:a', update],
  ['deleteAppClient', ['cradl:app-client:a'], 'delete', '/appClients/cradl:app-client:a'],

  ['listConnections', [page], 'get', `/connections${pageQuery}`],
  ['getConnection', ['cradl:connection:a'], 'get', '/connections/cradl:connection:a'],
  ['createConnection', [update], 'post', '/connections', update],
  ['updateConnection', ['cradl:connection:a', update], 'patch', '/connections/cradl:connection:a', update],
  ['deleteConnection', ['cradl:connection:a'], 'delete', '/connections/cradl:connection:a'],

  ['listDocuments', [{ documentId: ['d1', 'd2'] }], 'get', '/documents?documentId=d1&documentId=d2'],
  ['getDocument', ['cradl:document:a'], 'get', '/documents/cradl:document:a'],
  ['createDocument', [update], 'post', '/documents', update],
  ['updateDocument', ['cradl:document:a', update], 'patch', '/documents/cradl:document:a', update],
  ['deleteDocument', ['cradl:document:a'], 'delete', '/documents/cradl:document:a'],

  [
    'listFunctions',
    [{ sortBy: 'createdTime', order: 'descending' }],
    'get',
    '/functions?sortBy=createdTime&order=descending',
  ],
  ['getFunction', ['cradl:function:a'], 'get', '/functions/cradl:function:a'],
  ['createFunction', [{ runtime: 'python' }], 'post', '/functions', { runtime: 'python' }],
  ['updateFunction', ['cradl:function:a', update], 'patch', '/functions/cradl:function:a', update],
  ['deleteFunction', ['cradl:function:a'], 'delete', '/functions/cradl:function:a'],
  ['listFunctionVersions', ['cradl:function:a'], 'get', '/functions/cradl:function:a/versions'],
  ['createFunctionVersion', ['cradl:function:a'], 'post', '/functions/cradl:function:a/versions', {}],
  ['listFunctionAliases', ['cradl:function:a'], 'get', '/functions/cradl:function:a/aliases'],
  ['getFunctionAlias', ['cradl:function:a', 'prod'], 'get', '/functions/cradl:function:a/aliases/prod'],
  [
    'setFunctionAlias',
    ['cradl:function:a', 'prod', { resourceVersion: 1 }],
    'put',
    '/functions/cradl:function:a/aliases/prod',
    { resourceVersion: 1 },
  ],
  ['deleteFunctionAlias', ['cradl:function:a', 'prod'], 'delete', '/functions/cradl:function:a/aliases/prod'],

  ['listHooks', [page], 'get', `/hooks${pageQuery}`],
  ['getHook', ['cradl:hook:a'], 'get', '/hooks/cradl:hook:a'],
  ['createHook', [{ trigger: 'Document is Created' }], 'post', '/hooks', { trigger: 'Document is Created' }],
  ['updateHook', ['cradl:hook:a', update], 'patch', '/hooks/cradl:hook:a', update],
  ['deleteHook', ['cradl:hook:a'], 'delete', '/hooks/cradl:hook:a'],
  ['listHookRuns', ['cradl:hook:a', page], 'get', `/hooks/cradl:hook:a/runs${pageQuery}`],
  ['getHookRun', ['cradl:hook:a', 'run'], 'get', '/hooks/cradl:hook:a/runs/run'],
  ['createHookRun', ['cradl:hook:a', { input: {} }], 'post', '/hooks/cradl:hook:a/runs', { input: {} }],
  [
    'updateHookRun',
    ['cradl:hook:a', 'run', { status: 'ignored' }],
    'patch',
    '/hooks/cradl:hook:a/runs/run',
    { status: 'ignored' },
  ],
  ['deleteHookRun', ['cradl:hook:a', 'run'], 'delete', '/hooks/cradl:hook:a/runs/run'],

  ['listInvoices', [page], 'get', `/invoices${pageQuery}`],
  ['getInvoice', ['cradl:invoice:a'], 'get', '/invoices/cradl:invoice:a'],

  ['listLogs', [{ order: 'descending' }], 'get', '/logs?order=descending'],
  ['getLog', ['cradl:log:a'], 'get', '/logs/cradl:log:a'],

  [
    'listModels',
    [{ owner: ['me', 'cradl:organization:cradl'] }],
    'get',
    '/models?owner=me&owner=cradl%3Aorganization%3Acradl',
  ],
  ['getModel', ['cradl:model:a'], 'get', '/models/cradl:model:a'],
  ['createModel', [{ fieldConfig: {} }], 'post', '/models', { fieldConfig: {} }],
  ['updateModel', ['cradl:model:a', update], 'patch', '/models/cradl:model:a', update],
  ['deleteModel', ['cradl:model:a'], 'delete', '/models/cradl:model:a'],
  ['listModelVersions', ['cradl:model:a'], 'get', '/models/cradl:model:a/versions'],
  ['createModelVersion', ['cradl:model:a'], 'post', '/models/cradl:model:a/versions', {}],
  ['listModelAliases', ['cradl:model:a'], 'get', '/models/cradl:model:a/aliases'],
  ['getModelAlias', ['cradl:model:a', 'prod'], 'get', '/models/cradl:model:a/aliases/prod'],
  [
    'setModelAlias',
    ['cradl:model:a', 'prod', { resourceVersion: 1 }],
    'put',
    '/models/cradl:model:a/aliases/prod',
    { resourceVersion: 1 },
  ],
  ['deleteModelAlias', ['cradl:model:a', 'prod'], 'delete', '/models/cradl:model:a/aliases/prod'],

  ['listOrganizations', [page], 'get', `/organizations${pageQuery}`],
  ['getOrganization', ['me'], 'get', '/organizations/me'],
  ['createOrganization', [update], 'post', '/organizations', update],
  ['updateOrganization', ['me', update], 'patch', '/organizations/me', update],

  ['listPaymentMethods', [page], 'get', `/paymentMethods${pageQuery}`],
  ['getPaymentMethod', ['cradl:payment-method:a'], 'get', '/paymentMethods/cradl:payment-method:a'],
  ['createPaymentMethod', [update], 'post', '/paymentMethods', update],
  [
    'updatePaymentMethod',
    ['cradl:payment-method:a', update],
    'patch',
    '/paymentMethods/cradl:payment-method:a',
    update,
  ],
  ['deletePaymentMethod', ['cradl:payment-method:a'], 'delete', '/paymentMethods/cradl:payment-method:a'],

  ['listPlans', [page], 'get', `/plans${pageQuery}`],
  ['getPlan', ['cradl:organization:cradl/cradl:plan:a'], 'get', '/plans/cradl:organization:cradl%2Fcradl:plan:a'],

  ['listPredictions', [{ modelId: 'cradl:model:a' }], 'get', '/predictions?modelId=cradl%3Amodel%3Aa'],
  ['getPrediction', ['cradl:prediction:a'], 'get', '/predictions/cradl:prediction:a'],
  ['createPrediction', [{ documentId: 'd', modelId: 'm' }], 'post', '/predictions', { documentId: 'd', modelId: 'm' }],
  ['deletePrediction', ['cradl:prediction:a'], 'delete', '/predictions/cradl:prediction:a'],

  ['getProfile', ['me'], 'get', '/profiles/me'],
  ['updateProfile', ['me', update], 'patch', '/profiles/me', update],

  ['listRoles', [page], 'get', `/roles${pageQuery}`],
  ['getRole', ['cradl:role:a'], 'get', '/roles/cradl:role:a'],
  ['createRole', [{ permissions: [] }], 'post', '/roles', { permissions: [] }],
  ['updateRole', ['cradl:role:a', update], 'patch', '/roles/cradl:role:a', update],
  ['deleteRole', ['cradl:role:a'], 'delete', '/roles/cradl:role:a'],

  ['listSecrets', [page], 'get', `/secrets${pageQuery}`],
  ['getSecret', ['cradl:secret:a'], 'get', '/secrets/cradl:secret:a'],
  ['createSecret', [{ data: { a: 'b' } }], 'post', '/secrets', { data: { a: 'b' } }],
  ['updateSecret', ['cradl:secret:a', update], 'patch', '/secrets/cradl:secret:a', update],
  ['deleteSecret', ['cradl:secret:a'], 'delete', '/secrets/cradl:secret:a'],

  ['listUsers', [page], 'get', `/users${pageQuery}`],
  ['getUser', ['cradl:user:a'], 'get', '/users/cradl:user:a'],
  ['createUser', [{ email: 'a@example.com', roleIds: [] }], 'post', '/users', { email: 'a@example.com', roleIds: [] }],
  ['updateUser', ['cradl:user:a', update], 'patch', '/users/cradl:user:a', update],
  ['deleteUser', ['cradl:user:a'], 'delete', '/users/cradl:user:a'],

  ['listValidations', [page], 'get', `/validations${pageQuery}`],
  ['getValidation', ['cradl:validation:a'], 'get', '/validations/cradl:validation:a'],
  ['createValidation', [{ config: {} }], 'post', '/validations', { config: {} }],
  ['updateValidation', ['cradl:validation:a', update], 'patch', '/validations/cradl:validation:a', update],
  ['deleteValidation', ['cradl:validation:a'], 'delete', '/validations/cradl:validation:a'],
  ['listValidationTasks', ['cradl:validation:a', page], 'get', `/validations/cradl:validation:a/tasks${pageQuery}`],
  ['getValidationTask', ['cradl:validation:a', 'task'], 'get', '/validations/cradl:validation:a/tasks/task'],
  [
    'createValidationTask',
    ['cradl:validation:a', { input: {} }],
    'post',
    '/validations/cradl:validation:a/tasks',
    { input: {} },
  ],
  [
    'updateValidationTask',
    ['cradl:validation:a', 'task', { output: {} }],
    'patch',
    '/validations/cradl:validation:a/tasks/task',
    { output: {} },
  ],
  ['deleteValidationTask', ['cradl:validation:a', 'task'], 'delete', '/validations/cradl:validation:a/tasks/task'],
];

const authorization = { headers: { Authorization: 'Bearer testAccessToken' } };

describe('Requests', () => {
  // A rest parameter: jest takes a parameter beyond the row's length (body, for a GET) to be the done callback
  test.each(requests)('%s', async (...row) => {
    const [method, args, verb, path, body] = row;
    const response = { id: 'a' };
    jest.spyOn(axios, verb).mockResolvedValue({ data: response, headers: {} });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((client as any)[method](...args)).resolves.toEqual(response);

    if (verb === 'get' || verb === 'delete') {
      expect(axios[verb]).toHaveBeenCalledWith(`${testEndpoint}${path}`, authorization);
    } else {
      expect(axios[verb]).toHaveBeenCalledWith(`${testEndpoint}${path}`, body, authorization);
    }
  });

  test('every API method is in the table', () => {
    const internal = (name: string) =>
      name === 'constructor' || name.startsWith('make') || name === 'getAuthorizationHeaders';
    const methods = Object.getOwnPropertyNames(Client.prototype).filter((name) => !internal(name));
    expect(requests.map(([method]) => method).sort()).toEqual(methods.sort());
  });
});

describe('Request config', () => {
  test('is passed to axios, and its headers are added to the authorization header', async () => {
    const controller = new AbortController();
    const requestConfig = { headers: { 'X-Test': 'yes' }, signal: controller.signal };

    await client.getAgent('cradl:agent:a', { requestConfig });
    await client.updateAgent('cradl:agent:a', { name: 'name', requestConfig });

    const config = { signal: controller.signal, headers: { Authorization: 'Bearer testAccessToken', 'X-Test': 'yes' } };
    expect(axios.get).toHaveBeenCalledWith(`${testEndpoint}/agents/cradl:agent:a`, config);
    expect(axios.patch).toHaveBeenCalledWith(`${testEndpoint}/agents/cradl:agent:a`, { name: 'name' }, config);
  });

  test('is neither in the query nor in the body', async () => {
    await client.listAgents({ maxResults: 1, requestConfig: { timeout: 5 } });
    await client.createAgent({ name: 'name', requestConfig: { timeout: 5 } });

    const config = { timeout: 5, ...authorization };
    expect(axios.get).toHaveBeenCalledWith(`${testEndpoint}/agents?maxResults=1`, config);
    expect(axios.post).toHaveBeenCalledWith(`${testEndpoint}/agents`, { name: 'name' }, config);
  });
});

describe('Responses', () => {
  test('timestamps are parsed as dates, other values are left as they are', async () => {
    const createdTime = '2026-11-12T10:00:00.123456+0000';
    const updatedTime = '2026-11-12T11:00:00.5Z';
    const data = {
      createdTime,
      updatedTime,
      name: createdTime,
      events: [{ timestamp: createdTime }],
      description: 'createdTime',
      publishedTime: null,
      updatedBy: 'not a date',
    };
    jest.spyOn(axios, 'get').mockResolvedValue({ data, headers: {} });

    await expect(client.getAgent('cradl:agent:a')).resolves.toEqual({
      ...data,
      createdTime: new Date(createdTime),
      updatedTime: new Date(updatedTime),
      events: [{ timestamp: new Date(createdTime) }],
    });
  });

  test('a timestamp that is not ISO 8601 with fractional seconds stays a string', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: { createdTime: '2026-11-12' }, headers: {} });

    await expect(client.getAgent('cradl:agent:a')).resolves.toEqual({ createdTime: '2026-11-12' });
  });

  test('a failed request rejects', async () => {
    const error = new Error('Request failed with status code 404');
    jest.spyOn(axios, 'get').mockRejectedValue(error);

    await expect(client.getAgent('cradl:agent:a')).rejects.toBe(error);
  });

  test('credentials that fail to get a token reject the request, which is not sent', async () => {
    const error = new Error('invalid_client');
    jest.spyOn(client.credentials, 'getAccessToken').mockRejectedValue(error);

    await expect(client.getAgent('cradl:agent:a')).rejects.toBe(error);
    expect(axios.get).not.toHaveBeenCalled();
  });
});

describe('Agent runs and statistics', () => {
  test('listAgentRuns and getAgentStatistics take no options', async () => {
    await client.listAgentRuns('cradl:agent:a');
    await client.getAgentStatistics('cradl:agent:a');

    expect(axios.get).toHaveBeenCalledWith(`${testEndpoint}/agents/cradl:agent:a/runs`, authorization);
    expect(axios.get).toHaveBeenCalledWith(`${testEndpoint}/agents/cradl:agent:a/statistics`, authorization);
  });

  test('listAgentRuns sends sort keys and time ranges as the API takes them', async () => {
    await client.listAgentRuns('cradl:agent:a', {
      status: ['error', 'ready-for-review'],
      sort: [
        { column: 'createdTime', order: 'asc' },
        { column: 'status', order: 'desc' },
      ],
      createdTimeAfter: new Date('2026-11-01T00:00:00.000Z'),
      updatedTimeBefore: new Date('2026-11-02T00:00:00.000Z'),
    });

    const query = new URLSearchParams([
      ['status', 'error'],
      ['status', 'ready-for-review'],
      ['sort', 'createdTime:asc'],
      ['sort', 'status:desc'],
      ['createdTimeAfter', '2026-11-01T00:00:00.000Z'],
      ['updatedTimeBefore', '2026-11-02T00:00:00.000Z'],
    ]);
    expect(axios.get).toHaveBeenCalledWith(`${testEndpoint}/agents/cradl:agent:a/runs?${query}`, authorization);
  });

  test('getAgentStatistics sends dates as ISO 8601, and strings as they are', async () => {
    await client.getAgentStatistics('cradl:agent:a', { after: new Date('2026-11-01T00:00:00.000Z') });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.getAgentStatistics('cradl:agent:a', { before: '2026-11-02' as any });

    await client.getAgentStatistics('cradl:agent:a', { requestConfig: { timeout: 5 } });

    const path = `${testEndpoint}/agents/cradl:agent:a/statistics`;
    expect(axios.get).toHaveBeenCalledWith(path, { timeout: 5, ...authorization });
    expect(axios.get).toHaveBeenCalledWith(`${path}?after=2026-11-01T00%3A00%3A00.000Z`, authorization);
    expect(axios.get).toHaveBeenCalledWith(`${path}?before=2026-11-02`, authorization);
  });
});

describe('File server', () => {
  const fileUrl = 'https://fileserver.cradl.ai/documents/cradl:document:a';

  test('makeFileServerGetRequest gets the file with the authorization header', async () => {
    const lastModified = 'Thu, 12 Nov 2026 10:00:00 GMT';
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: new TextEncoder().encode('content').buffer,
      headers: { 'content-type': 'application/pdf', 'last-modified': lastModified },
    });

    const file = await client.makeFileServerGetRequest(fileUrl, { width: 10 });

    expect(axios.get).toHaveBeenCalledWith(`${fileUrl}?width=10`, { responseType: 'arraybuffer', ...authorization });
    expect(file.type).toBe('application/pdf');
    expect(file.lastModified).toBe(new Date(lastModified).getTime());
    await expect(file.text()).resolves.toBe('content');
  });

  test('makeFileServerPutRequest uploads the content with its headers and the authorization header', async () => {
    const content = Buffer.from('content');
    const options = { headers: { 'Content-Type': 'application/pdf' } };

    const file = await client.makeFileServerPutRequest(fileUrl, content, options);

    expect(axios.put).toHaveBeenCalledWith(fileUrl, content, {
      headers: { Authorization: 'Bearer testAccessToken', 'Content-Type': 'application/pdf' },
    });
    expect(file.type).toBe('application/pdf');
    await expect(file.text()).resolves.toBe('content');
    expect(options).toEqual({ headers: { 'Content-Type': 'application/pdf' } });
  });

  test('makeFileServerPutRequest works without headers', async () => {
    const file = await client.makeFileServerPutRequest(fileUrl, Buffer.from('content'));

    expect(axios.put).toHaveBeenCalledWith(fileUrl, Buffer.from('content'), authorization);
    expect(file.type).toBe('');
  });
});
