/**
 * @jest-environment node
 */

import { v4 as uuidv4 } from 'uuid';
import { getTestClient } from './helpers';
import {
  ContentType,
  CreateAppClientOptions,
  CreateDataBundleOptions,
  CreateModelOptions,
  CreateTransitionOptions,
  CreateWorkflowOptions,
  FieldConfig,
  ListDocumentsOptions,
  TransitionType,
  UpdateModelOptions,
  UpdateSecretOptions,
  UpdateTransitionExecution,
  WorkflowSpecification,
} from './types';

let client = getTestClient();

const uuidWithoutDashes = () => uuidv4().replace(/-/g, '');
const createAppClientId = () => `las:app-client:${uuidWithoutDashes()}`;
const createAssetId = () => `las:asset:${uuidWithoutDashes()}`;
const createBatchId = () => `las:batch:${uuidWithoutDashes()}`;
const createConsentId = () => `las:consent:${uuidWithoutDashes()}`;
const createDataBundleId = () => `las:model-data-bundle:${uuidWithoutDashes()}`;
const createDatasetId = () => `las:dataset:${uuidWithoutDashes()}`;
const createDocumentId = () => `las:document:${uuidWithoutDashes()}`;
const createModelId = () => `las:model:${uuidWithoutDashes()}`;
const createOrganizationId = () => `las:organization:${uuidWithoutDashes()}`;
const createTransitionExecutionId = () => `las:transition-execution:${uuidWithoutDashes()}`;
const createTransitionId = () => `las:transition:${uuidWithoutDashes()}`;
const createUserId = () => `las:user:${uuidWithoutDashes()}`;
const createWorkflowExecutionId = () => `las:workflow-execution:${uuidWithoutDashes()}`;
const createWorkflowId = () => `las:workflow:${uuidWithoutDashes()}`;

beforeEach(() => {
  client = getTestClient();
});

describe('Organizations', () => {
  describe('getOrganization', () => {
    test('valid request', async () => {
      const organizationId = createOrganizationId();
      const getOrganizationPromise = client.getOrganization(organizationId);
      await expect(getOrganizationPromise).resolves.toHaveProperty('description');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfDocumentsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfDocumentsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfPredictionsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfPredictionsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfTransitionExecutionsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfTransitionExecutionsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfWorkflowExecutionsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfWorkflowExecutionsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('monthlyUsageSummary');
      await expect(getOrganizationPromise).resolves.toHaveProperty('name');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfAppClientsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfAppClientsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfAssetsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfAssetsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfBatchesAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfBatchesCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfModelsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfModelsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfSecretsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfSecretsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfTransitionsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfTransitionsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfUsersAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfUsersCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfWorkflowsAllowed');
      await expect(getOrganizationPromise).resolves.toHaveProperty('numberOfWorkflowsCreated');
      await expect(getOrganizationPromise).resolves.toHaveProperty('organizationId');
    });
  });

  describe('updateOrganization', () => {
    test('valid request', async () => {
      const organizationId = createOrganizationId();
      const name = 'My Company Name';
      const description = 'My Company Description';
      const options = { name, description };
      const updateOrganizationPromise = client.updateOrganization(organizationId, options);
      await expect(updateOrganizationPromise).resolves.toHaveProperty('description');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfDocumentsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfDocumentsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfPredictionsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfPredictionsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfTransitionExecutionsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfTransitionExecutionsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfWorkflowExecutionsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyNumberOfWorkflowExecutionsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('monthlyUsageSummary');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('name');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfAppClientsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfAppClientsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfAssetsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfAssetsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfBatchesAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfBatchesCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfModelsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfModelsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfSecretsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfSecretsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfTransitionsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfTransitionsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfUsersAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfUsersCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfWorkflowsAllowed');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('numberOfWorkflowsCreated');
      await expect(updateOrganizationPromise).resolves.toHaveProperty('organizationId');
    });
  });
});

describe('Documents', () => {
  describe('createDocument', () => {
    test('valid request body', async () => {
      const content = uuidv4();
      const contentType = 'image/jpeg';
      const consentId = createConsentId();
      const batchId = createBatchId();
      const datasetId = createDatasetId();
      const createDocumentPromise = client.createDocument(content, contentType, {
        batchId,
        consentId,
        datasetId,
      });
      await expect(createDocumentPromise).resolves.toHaveProperty('batchId');
      await expect(createDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(createDocumentPromise).resolves.toHaveProperty('contentType');
      await expect(createDocumentPromise).resolves.toHaveProperty('datasetId');
      await expect(createDocumentPromise).resolves.toHaveProperty('documentId');
    });

    test.each<ContentType>(['image/jpeg', 'application/pdf', 'image/png', 'image/tiff'])('allows content type: %s', async (contentType) => {
      const content = uuidv4();
      const createDocumentPromise = client.createDocument(content, contentType);
      await expect(createDocumentPromise).resolves.toHaveProperty('contentType');
      await expect(createDocumentPromise).resolves.toHaveProperty('documentId');
    });

    test('invalid Content-Type', async () => {
      const content = uuidv4();
      const contentType = ('erroneousContentType' as unknown) as ContentType;
      const consentId = createConsentId();
      const createDocumentPromise = client.createDocument(content, contentType, { consentId });
      await expect(createDocumentPromise).rejects.toBeDefined();
    });

    test('invalid consentId pattern', async () => {
      const content = uuidv4();
      const contentType = 'image/jpeg';
      const consentId = uuidv4();
      const createDocumentPromise = client.createDocument(content, contentType, { consentId });
      await expect(createDocumentPromise).rejects.toBeDefined();
    });

    test('invalid datasetId pattern', async () => {
      const content = uuidv4();
      const contentType = 'image/jpeg';
      const datasetId = uuidv4();
      const createDocumentPromise = client.createDocument(content, contentType, { datasetId });
      await expect(createDocumentPromise).rejects.toBeDefined();
    });
  });

  describe('getDocument', () => {
    test('valid request', async () => {
      const documentId = createDocumentId();
      const getDocumentPromise = client.getDocument(documentId);
      await expect(getDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(getDocumentPromise).resolves.toHaveProperty('documentId');
      await expect(getDocumentPromise).resolves.toHaveProperty('contentType');
    });
  });

  describe('updateDocument', () => {
    test('valid request', async () => {
      const documentId = createDocumentId();
      const groundTruth = [{ label: 'test', value: 'test' }];
      const updateDocumentPromise = client.updateDocument(documentId, { groundTruth });
      await expect(updateDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('documentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('contentType');
    });
  });

  describe('deleteDocument', () => {
    test('valid request', async () => {
      const documentId = createDocumentId();
      const deleteDocumentPromise = client.deleteDocument(documentId);
      await expect(deleteDocumentPromise).resolves.toHaveProperty('contentType');
      await expect(deleteDocumentPromise).resolves.toHaveProperty('documentId');
    });
  });

  describe('deleteDocuments', () => {
    test('with batchId', async () => {
      const batchId = createBatchId();
      const deleteDocumentsPromise = client.deleteDocuments({ batchId });
      await expect(deleteDocumentsPromise).resolves.toHaveProperty('documents');
    });

    test('with consentId', async () => {
      const consentId = createConsentId();
      const deleteDocumentsPromise = client.deleteDocuments({ consentId });
      await expect(deleteDocumentsPromise).resolves.toHaveProperty('documents');
    });

    test('with nextToken', async () => {
      const nextToken = uuidv4();
      let deleteDocumentsPromise = client.deleteDocuments({ nextToken });
      await expect(deleteDocumentsPromise).resolves.toHaveProperty('documents');
    });

    test('with maxResults', async () => {
      const maxResults = 100;
      let deleteDocumentsPromise = client.deleteDocuments({ maxResults });
      await expect(deleteDocumentsPromise).resolves.toHaveProperty('documents');
    });
  });

  describe('listDocuments', () => {
    test.each<[ListDocumentsOptions]>([
      [{ batchId: createBatchId() }],
      [{ consentId: createConsentId() }],
      [{ datasetId: createDatasetId() }],
    ])('parameters: %s', async (options) => {
      const listDocumentsPromise = client.listDocuments(options);
      await expect(listDocumentsPromise).resolves;
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listDocumentsPromise = client.listDocuments({ maxResults, nextToken });
      await expect(listDocumentsPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('Transitions', () => {
  describe('createTransition', () => {
    test.each<[TransitionType, CreateTransitionOptions | undefined]>([
      ['manual', {}],
      ['docker', {}],
      ['docker', { parameters: { imageUrl: 'test' } }],
      ['docker', { parameters: { imageUrl: 'test', cpu: 256, memory: 1024 } }],
      ['docker', { parameters: { assets: { jsRemoteComponent: createAssetId() }}}],
    ])('parameters: %s', async (transitionType, options) => {
      const createTransitionPromise = client.createTransition(transitionType, options);
      await expect(createTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('getTransition', () => {
    test('valid request', async () => {
      const transitionId = createTransitionId();
      const getTransitionPromise = client.getTransition(transitionId);
      await expect(getTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('listTransitions', () => {
    test('valid request', async () => {
      const listTransitionsPromise = client.listTransitions();
      await expect(listTransitionsPromise).resolves.toHaveProperty('transitions');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listTransitionsPromise = client.listTransitions({ maxResults, nextToken });
      await expect(listTransitionsPromise).resolves.toHaveProperty('nextToken');
    });
  });

  describe('updateTransition', () => {
    test('valid request', async () => {
      const transitionId = createTransitionId();
      const updateTransitionPromise = client.updateTransition(transitionId, { name: 'new name' });
      await expect(updateTransitionPromise).resolves.toHaveProperty('name');
      await expect(updateTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('deleteTransition', () => {
    test('valid request', async () => {
      const transitionId = createTransitionId();
      const deleteTransitionPromise = client.deleteTransition(transitionId);
      await expect(deleteTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('executeTransition', () => {
    test('valid request', async () => {
      const transitionId = createTransitionId();
      const executeTransitionPromise = client.executeTransition(transitionId);
      await expect(executeTransitionPromise).resolves.toHaveProperty('executionId');
      await expect(executeTransitionPromise).resolves.toHaveProperty('status');
      await expect(executeTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('getTransitionExecution', () => {
    test('valid request', async () => {
      const transitionId = createTransitionId();
      const transitionExecutionId = createTransitionExecutionId();
      const getTransitionExecutionPromise = client.getTransitionExecution(transitionId, transitionExecutionId);
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('executionId');
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('status');
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('transitionId');
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('completedBy');
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('input');
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('startTime');
      await expect(getTransitionExecutionPromise).resolves.toHaveProperty('endTime');
    });
  });

  describe('updateTransitionExecution', () => {
    test.each<UpdateTransitionExecution>([
      { status: 'failed', error: { message: 'test' } },
      { status: 'succeeded', output: {} },
      { status: 'succeeded', output: {} },
      { status: 'failed', error: { message: 'test' } },
      { status: 'succeeded', output: { something: 'test' }, startTime: '2020-01-01 09:31:00.002431Z' },
    ])('input: %o', async (input) => {
      const transitionId = createTransitionId();
      const transitionExecutionId = createTransitionExecutionId();
      const updateTransitionExecutionPromise = client.updateTransitionExecution(transitionId, transitionExecutionId, input);
      await expect(updateTransitionExecutionPromise).resolves.toHaveProperty('executionId');
      await expect(updateTransitionExecutionPromise).resolves.toHaveProperty('status');
      await expect(updateTransitionExecutionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('listTransitionExecutions', () => {
    test('valid request', async () => {
      const listTransitionExecutionsPromise = client.listTransitionExecutions('foo');
      await expect(listTransitionExecutionsPromise).resolves.toHaveProperty('executions');
    });
  });

  describe('sendHeartbeat', () => {
    // Seems like a Prism issue where this will just never resolve or reject, making Jest time out
    test.skip('valid request', async () => {
      const transitionId = createTransitionId();
      const transitionExecutionId = createTransitionExecutionId();
      const sendHeartbeatPromise = await client.sendHeartbeat(transitionId, transitionExecutionId);
      await expect(sendHeartbeatPromise).resolves.toBe('')
    })
  })
});

describe('Workflows', () => {
  describe('createWorkflow', () => {
    test.each<[string, WorkflowSpecification, CreateWorkflowOptions | undefined]>([
      [
        'test',
        { definition: {} },
        { description: 'test', errorConfig: { email: 'test@test.com' } },
      ],
      [
        'test',
        { definition: {} },
        undefined,
      ],
      [
        'test',
        { definition: {} },
        { errorConfig: { email: 'test@test.com' } },
      ],
      [
        'test',
        { definition: {}, language: 'ASL', version: '1.0.0' },
        { description: 'test', errorConfig: { email: 'test@test.com' } },
      ],
      [
        'test',
        { definition: {} },
        { description: 'test', errorConfig: { email: 'test@test.com' } },
      ],
    ])('input: %o', async (name, specification, options) => {
      const createWorkflowPromise = client.createWorkflow(name, specification, options);
      await expect(createWorkflowPromise).resolves.toHaveProperty('name');
      await expect(createWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('getWorkflow', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const getWorkflowPromise = client.getWorkflow(workflowId);
      await expect(getWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('listWorkflows', () => {
    test('valid request', async () => {
      const listWorkflowsPromise = client.listWorkflows();
      await expect(listWorkflowsPromise).resolves.toHaveProperty('workflows');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listWorkflowsPromise = client.listWorkflows({ maxResults, nextToken });
      await expect(listWorkflowsPromise).resolves.toHaveProperty('nextToken');
    });
  });

  describe('updateWorkflow', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const updateWorkflowPromise = client.updateWorkflow(workflowId, { name: 'New name' });
      await expect(updateWorkflowPromise).resolves.toHaveProperty('name');
      await expect(updateWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('deleteWorkflow', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const deleteWorkflowPromise = client.deleteWorkflow(workflowId);
      await expect(deleteWorkflowPromise).resolves.toHaveProperty('name');
      await expect(deleteWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('executeWorkflow', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const executeWorkflowPromise = client.executeWorkflow(workflowId, { some: 'input' });
      await expect(executeWorkflowPromise).resolves.toHaveProperty('executionId');
      await expect(executeWorkflowPromise).resolves.toHaveProperty('status');
      await expect(executeWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('getWorkflowExecution', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const workflowExecutionId = createWorkflowExecutionId();
      const getWorkflowExecutionPromise = client.getWorkflowExecution(workflowId, workflowExecutionId);
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('executionId');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('completedBy');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('endTime');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('input');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('output');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('startTime');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('status');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('transitionExecutions');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('updateWorkflowExecution', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const workflowExecutionId = createWorkflowExecutionId();
      const nextTransitionId = createTransitionId();
      const options = { nextTransitionId };
      const getWorkflowExecutionPromise = client.updateWorkflowExecution(workflowId, workflowExecutionId, options);
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('executionId');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('completedBy');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('endTime');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('input');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('output');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('startTime');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('status');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('transitionExecutions');
      await expect(getWorkflowExecutionPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('listWorkflowExecutions', () => {
    test.each([undefined, 'test'])('status: %s', async (status) => {
      const workflowId = createWorkflowId();
      const listWorkflowExecutionsPromise = client.listWorkflowExecutions(workflowId, { status });
      await expect(listWorkflowExecutionsPromise).resolves.toHaveProperty('executions');
      await expect(listWorkflowExecutionsPromise).resolves.toHaveProperty('workflowId');
    });

    test('accepts pagination params', async () => {
      const workflowId = createWorkflowId();
      const maxResults = 1;
      const nextToken = uuidv4();
      const listWorkflowsPromise = client.listWorkflowExecutions(workflowId, { maxResults, nextToken });
      await expect(listWorkflowsPromise).resolves.toHaveProperty('nextToken');
    });
  });

  describe('deleteWorkflowExecution', () => {
    test('valid request', async () => {
      const workflowId = createWorkflowId();
      const workflowExecutionId = createWorkflowExecutionId();
      const deleteWorkflowExecutionPromise = client.deleteWorkflowExecution(workflowId, workflowExecutionId);
      await expect(deleteWorkflowExecutionPromise).resolves.toHaveProperty('workflowId');
    });
  });
});

describe('Users', () => {
  describe('createUser', () => {
    test('valid request', async () => {
      const createUserPromise = client.createUser('test@test.com');
      await expect(createUserPromise).resolves.toHaveProperty('email');
      await expect(createUserPromise).resolves.toHaveProperty('userId');
    });

    test('invalid email', async () => {
      const createUserPromise = client.createUser('invalidEmail');
      await expect(createUserPromise).rejects.toBeDefined();
    });
  });

  describe('getUser', () => {
    test('valid request', async () => {
      const userId = createUserId();
      const getUserPromise = client.getUser(userId);
      await expect(getUserPromise).resolves.toHaveProperty('email');
      await expect(getUserPromise).resolves.toHaveProperty('userId');
    });
  });

  describe('updateUser', () => {
    test('valid request', async () => {
      const userId = createUserId();
      const updateUserPromise = client.updateUser(userId, { name: 'I want a new name' });
      await expect(updateUserPromise).resolves.toHaveProperty('email');
      await expect(updateUserPromise).resolves.toHaveProperty('name');
    });
  });

  describe('deleteUser', () => {
    test('valid request', async () => {
      const userId = createUserId();
      const deleteUserPromise = client.deleteUser(userId);
      await expect(deleteUserPromise).resolves.toHaveProperty('email');
      await expect(deleteUserPromise).resolves.toHaveProperty('userId');
    });
  });

  describe('listUsers', () => {
    test('valid request', async () => {
      const listUsersPromise = client.listUsers();
      await expect(listUsersPromise).resolves.toHaveProperty('users');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listUsersPromise = client.listUsers({ maxResults, nextToken });
      await expect(listUsersPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('Secrets', () => {
  describe('createSecret', () => {
    test('valid request', async () => {
      const input = { data: { username: 'foo', password: 'bar' } };
      const createSecretPromise = client.createSecret(input);
      await expect(createSecretPromise).resolves.toHaveProperty('secretId');
    });
  });

  describe('listSecrets', () => {
    test('valid request', async () => {
      const listSecretsPromise = client.listSecrets();
      await expect(listSecretsPromise).resolves.toHaveProperty('secrets');
    });

    test.each<[number | undefined, string | undefined]>([
      [100, 'foo'],
      [undefined, 'foo'],
      [undefined, undefined],
      [1, undefined],
    ])('accepts pagination parameters: %s, %s', async (maxResults?: number, nextToken?: string) => {
      const listSecretsPromise = client.listSecrets({ maxResults, nextToken });
      await expect(listSecretsPromise).resolves.toHaveProperty('secrets');
    });
  });

  describe('updateSecret', () => {
    test.each<UpdateSecretOptions>([{ data: { user: 'foo' } }, { description: 'bar' }, { name: 'foo' }])(
      'with input: %o',
      async (options) => {
        const updateSecretPromise = client.updateSecret('foo', options);
        await expect(updateSecretPromise).resolves.toHaveProperty('secretId');
      }
    );
  });
});

describe('Predictions', () => {
  describe('createPredictions', () => {
    test('valid request', async () => {
      const documentId = createDocumentId();
      const modelId = createModelId();
      const createPredictionPromise = client.createPrediction(documentId, modelId);
      await expect(createPredictionPromise).resolves.toHaveProperty('documentId');
      await expect(createPredictionPromise).resolves.toHaveProperty('predictions');
    });

    test('with options', async () => {
      const documentId = createDocumentId();
      const modelId = createModelId();
      const createPredictionPromise = client.createPrediction(documentId, modelId, {
        autoRotate: true,
        imageQuality: 'HIGH',
        maxPages: 2,
      });
      await expect(createPredictionPromise).resolves.toHaveProperty('documentId');
      await expect(createPredictionPromise).resolves.toHaveProperty('predictions');
    });

    test('invalid model name', async () => {
      const documentId = createDocumentId();
      const modelId = 'erroneousModelId';
      const createPredictionPromise = client.createPrediction(documentId, modelId);
      await expect(createPredictionPromise).rejects.toBeDefined();
    });
  });

  describe('listPredictions', () => {
    test('valid request', async () => {
      const listPredictionsPromise = client.listPredictions();
      await expect(listPredictionsPromise).resolves.toHaveProperty('predictions');
    });
  });
});

describe('Assets', () => {
  describe('createAsset', () => {
    test('valid request', async () => {
      const content = uuidv4();
      const createAssetPromise = client.createAsset(content);
      await expect(createAssetPromise).resolves.toHaveProperty('assetId');
    });
  });

  describe('deleteAsset', () => {
    test('valid request', async () => {
      const assetId = createAssetId();
      const deleteAssetPromise = client.deleteAsset(assetId);
      await expect(deleteAssetPromise).resolves.toHaveProperty('assetId');
      await expect(deleteAssetPromise).resolves.toHaveProperty('content');
    });
  });

  describe('listAssets', () => {
    test('valid request', async () => {
      const listAssetsPromise = client.listAssets();
      await expect(listAssetsPromise).resolves.toHaveProperty('assets');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listAssetsPromise = client.listAssets({ maxResults, nextToken });
      await expect(listAssetsPromise).resolves.toHaveProperty('nextToken');
    });
  });

  describe('getAsset', () => {
    test('valid request', async () => {
      const assetId = createAssetId();
      const getAssetPromise = client.getAsset(assetId);
      await expect(getAssetPromise).resolves.toHaveProperty('assetId');
      await expect(getAssetPromise).resolves.toHaveProperty('content');
    });
  });

  describe('updateAsset', () => {
    test('valid request', async () => {
      const assetId = createAssetId();
      const content = uuidv4();
      const updateAssetPromise = client.updateAsset(assetId, { content });
      await expect(updateAssetPromise).resolves.toHaveProperty('assetId');
    });
  });
});

describe('Datasets', () => {
  describe('getDataset', () => {
    test('valid request', async () => {
      const datasetId = createDatasetId();
      const getDatasetPromise = client.getDataset(datasetId);
      await expect(getDatasetPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(getDatasetPromise).resolves.toHaveProperty('createdTime');
      await expect(getDatasetPromise).resolves.toHaveProperty('datasetId');
      await expect(getDatasetPromise).resolves.toHaveProperty('description');
      await expect(getDatasetPromise).resolves.toHaveProperty('numberOfDocuments');
      await expect(getDatasetPromise).resolves.toHaveProperty('retentionInDays');
      await expect(getDatasetPromise).resolves.toHaveProperty('storageLocation');
      await expect(getDatasetPromise).resolves.toHaveProperty('updatedTime');
      await expect(getDatasetPromise).resolves.toHaveProperty('version');
    });
  });

  describe('createDataset', () => {
    test('valid request', async () => {
      const description = 'I am going to create a new dataset, give me a dataset ID!';
      const name = 'my dataset name';
      const containsPersonallyIdentifiableInformation = false;
      const options = { description, name, containsPersonallyIdentifiableInformation };
      const createDatasetPromise = client.createDataset(options);
      await expect(createDatasetPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(createDatasetPromise).resolves.toHaveProperty('createdTime');
      await expect(createDatasetPromise).resolves.toHaveProperty('datasetId');
      await expect(createDatasetPromise).resolves.toHaveProperty('description');
      await expect(createDatasetPromise).resolves.toHaveProperty('numberOfDocuments');
      await expect(createDatasetPromise).resolves.toHaveProperty('retentionInDays');
      await expect(createDatasetPromise).resolves.toHaveProperty('storageLocation');
      await expect(createDatasetPromise).resolves.toHaveProperty('updatedTime');
      await expect(createDatasetPromise).resolves.toHaveProperty('version');
    });
  });

  describe('updateDataset', () => {
    test('valid request', async () => {
      const datasetId = createDatasetId();
      const description = 'I am going to create a new dataset, give me a dataset ID!';
      const name = 'my dataset name';
      const options = { description, name };
      const updateDatasetPromise = client.updateDataset(datasetId, options);
      await expect(updateDatasetPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(updateDatasetPromise).resolves.toHaveProperty('createdTime');
      await expect(updateDatasetPromise).resolves.toHaveProperty('datasetId');
      await expect(updateDatasetPromise).resolves.toHaveProperty('description');
      await expect(updateDatasetPromise).resolves.toHaveProperty('numberOfDocuments');
      await expect(updateDatasetPromise).resolves.toHaveProperty('retentionInDays');
      await expect(updateDatasetPromise).resolves.toHaveProperty('storageLocation');
      await expect(updateDatasetPromise).resolves.toHaveProperty('updatedTime');
      await expect(updateDatasetPromise).resolves.toHaveProperty('version');
    });
  });

  describe('deleteDataset', () => {
    test('valid request', async () => {
      const datasetId = createDatasetId();
      const deleteDatasetPromise = client.deleteDataset(datasetId);
      await expect(deleteDatasetPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('createdTime');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('datasetId');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('description');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('numberOfDocuments');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('retentionInDays');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('storageLocation');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('updatedTime');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('version');
    });

    test('with documents', async () => {
      const datasetId = createDatasetId();
      const deleteDatasetPromise = client.deleteDataset(datasetId, true);
      await expect(deleteDatasetPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('createdTime');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('datasetId');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('description');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('numberOfDocuments');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('retentionInDays');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('storageLocation');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('updatedTime');
      await expect(deleteDatasetPromise).resolves.toHaveProperty('version');
    });
  });

  describe('listDatasets', () => {
    test('valid request', async () => {
      const listDatasetsPromise = client.listDatasets();
      await expect(listDatasetsPromise).resolves.toHaveProperty('datasets');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listDatasetsPromise = client.listDatasets({ maxResults, nextToken });
      await expect(listDatasetsPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('Batches', () => {
  describe('createBatch', () => {
    test('valid request', async () => {
      const description = 'I am going to create a new batch, give me a batch ID!';
      const name = 'my batch name';
      const containsPersonallyIdentifiableInformation = false;
      const options = { description, name, containsPersonallyIdentifiableInformation };
      const createBatchPromise = client.createBatch(options);
      await expect(createBatchPromise).resolves.toHaveProperty('batchId');
      await expect(createBatchPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(createBatchPromise).resolves.toHaveProperty('createdTime');
      await expect(createBatchPromise).resolves.toHaveProperty('description');
      await expect(createBatchPromise).resolves.toHaveProperty('numDocuments');
      await expect(createBatchPromise).resolves.toHaveProperty('retentionInDays');
      await expect(createBatchPromise).resolves.toHaveProperty('storageLocation');
    });
  });

  describe('updateBatch', () => {
    test('valid request', async () => {
      const batchId = createBatchId();
      const description = 'I am going to create a new batch, give me a batch ID!';
      const name = 'my batch name';
      const options = { description, name };
      const updateBatchPromise = client.updateBatch(batchId, options);
      await expect(updateBatchPromise).resolves.toHaveProperty('batchId');
      await expect(updateBatchPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(updateBatchPromise).resolves.toHaveProperty('createdTime');
      await expect(updateBatchPromise).resolves.toHaveProperty('description');
      await expect(updateBatchPromise).resolves.toHaveProperty('numDocuments');
      await expect(updateBatchPromise).resolves.toHaveProperty('retentionInDays');
      await expect(updateBatchPromise).resolves.toHaveProperty('storageLocation');
    });
  });

  describe('deleteBatch', () => {
    test('valid request', async () => {
      const batchId = createBatchId();
      const deleteBatchPromise = client.deleteBatch(batchId);
      await expect(deleteBatchPromise).resolves.toHaveProperty('batchId');
      await expect(deleteBatchPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(deleteBatchPromise).resolves.toHaveProperty('createdTime');
      await expect(deleteBatchPromise).resolves.toHaveProperty('description');
      await expect(deleteBatchPromise).resolves.toHaveProperty('numDocuments');
      await expect(deleteBatchPromise).resolves.toHaveProperty('retentionInDays');
      await expect(deleteBatchPromise).resolves.toHaveProperty('storageLocation');
    });

    test('with documents', async () => {
      const batchId = createBatchId();
      const deleteBatchPromise = client.deleteBatch(batchId, true);
      await expect(deleteBatchPromise).resolves.toHaveProperty('batchId');
      await expect(deleteBatchPromise).resolves.toHaveProperty('containsPersonallyIdentifiableInformation');
      await expect(deleteBatchPromise).resolves.toHaveProperty('createdTime');
      await expect(deleteBatchPromise).resolves.toHaveProperty('description');
      await expect(deleteBatchPromise).resolves.toHaveProperty('numDocuments');
      await expect(deleteBatchPromise).resolves.toHaveProperty('retentionInDays');
      await expect(deleteBatchPromise).resolves.toHaveProperty('storageLocation');
    });
  });

  describe('listBatches', () => {
    test('valid request', async () => {
      const listBatchesPromise = client.listBatches();
      await expect(listBatchesPromise).resolves.toHaveProperty('batches');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listBatchesPromise = client.listBatches({ maxResults, nextToken });
      await expect(listBatchesPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('Models', () => {
  describe('createModel', () => {
    test.each<[FieldConfig, number, number, CreateModelOptions | undefined]>([
      [
        {
          total_amount: { type: 'amount', maxLength: 20, description: 'Total Amount' },
          purchase_date: { type: 'date', maxLength: 10, description: 'Purchase Date' },
          supplier_id: { type: 'alphanum', maxLength: 25, description: 'Supplier ID' },
        },
        100,
        100,
        {
          preprocessConfig: { autoRotate: true, imageQuality: 'HIGH', maxPages: 3 },
          name: 'My model name',
          description: 'My model description',
        },
      ],
      [
        {
          total_amount: { type: 'amount', maxLength: 20, description: 'Total Amount' },
          purchase_date: { type: 'date', maxLength: 10, description: 'Purchase Date' },
          supplier_id: { type: 'alphanum', maxLength: 25, description: 'Supplier ID' },
        },
        100,
        100,
        undefined
      ],
    ])('input: %o', async (fieldConfig, width, height, options) => {
      const createModelPromise = client.createModel(fieldConfig, width, height, options);
      await expect(createModelPromise).resolves.toHaveProperty('createdTime');
      await expect(createModelPromise).resolves.toHaveProperty('description');
      await expect(createModelPromise).resolves.toHaveProperty('fieldConfig');
      await expect(createModelPromise).resolves.toHaveProperty('height');
      await expect(createModelPromise).resolves.toHaveProperty('modelId');
      await expect(createModelPromise).resolves.toHaveProperty('name');
      await expect(createModelPromise).resolves.toHaveProperty('preprocessConfig');
      await expect(createModelPromise).resolves.toHaveProperty('status');
      await expect(createModelPromise).resolves.toHaveProperty('updatedTime');
      await expect(createModelPromise).resolves.toHaveProperty('width');
    });
  });

  describe('getModel', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const getModelPromise = client.getModel(modelId);
      await expect(getModelPromise).resolves.toHaveProperty('createdTime');
      await expect(getModelPromise).resolves.toHaveProperty('description');
      await expect(getModelPromise).resolves.toHaveProperty('fieldConfig');
      await expect(getModelPromise).resolves.toHaveProperty('height');
      await expect(getModelPromise).resolves.toHaveProperty('modelId');
      await expect(getModelPromise).resolves.toHaveProperty('name');
      await expect(getModelPromise).resolves.toHaveProperty('preprocessConfig');
      await expect(getModelPromise).resolves.toHaveProperty('status');
      await expect(getModelPromise).resolves.toHaveProperty('updatedTime');
      await expect(getModelPromise).resolves.toHaveProperty('width');
    });
  });

  describe('updateModel', () => {
    test.each<[string, UpdateModelOptions]>([
      [
        createModelId(),
        {
          fieldConfig: {
            total_amount: { type: 'amount', maxLength: 20, description: 'Total Amount' },
            purchase_date: { type: 'date', maxLength: 10, description: 'Purchase Date' },
            supplier_id: { type: 'alphanum', maxLength: 25, description: 'Supplier ID' },
          },
          preprocessConfig: { autoRotate: true, imageQuality: 'HIGH', maxPages: 3 },
          name: 'My model name',
          description: 'My model description',
          width: 100,
          height: 100,
          status: 'training'
        },
      ],
    ])('input: %o', async (modelId, options) => {
      const updateModelPromise = client.updateModel(modelId, options);
      await expect(updateModelPromise).resolves.toHaveProperty('createdTime');
      await expect(updateModelPromise).resolves.toHaveProperty('description');
      await expect(updateModelPromise).resolves.toHaveProperty('fieldConfig');
      await expect(updateModelPromise).resolves.toHaveProperty('height');
      await expect(updateModelPromise).resolves.toHaveProperty('modelId');
      await expect(updateModelPromise).resolves.toHaveProperty('name');
      await expect(updateModelPromise).resolves.toHaveProperty('preprocessConfig');
      await expect(updateModelPromise).resolves.toHaveProperty('status');
      await expect(updateModelPromise).resolves.toHaveProperty('updatedTime');
      await expect(updateModelPromise).resolves.toHaveProperty('width');
    });
  });

  describe('deleteModel', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const deleteModelPromise = client.deleteModel(modelId);
      await expect(deleteModelPromise).resolves.toHaveProperty('createdTime');
      await expect(deleteModelPromise).resolves.toHaveProperty('description');
      await expect(deleteModelPromise).resolves.toHaveProperty('fieldConfig');
      await expect(deleteModelPromise).resolves.toHaveProperty('height');
      await expect(deleteModelPromise).resolves.toHaveProperty('modelId');
      await expect(deleteModelPromise).resolves.toHaveProperty('name');
      await expect(deleteModelPromise).resolves.toHaveProperty('preprocessConfig');
      await expect(deleteModelPromise).resolves.toHaveProperty('status');
      await expect(deleteModelPromise).resolves.toHaveProperty('updatedTime');
      await expect(deleteModelPromise).resolves.toHaveProperty('width');
    });
  });

  describe('listModels', () => {
    test('valid request', async () => {
      const listModelsPromise = client.listModels();
      await expect(listModelsPromise).resolves.toHaveProperty('models');
    });
  });
});

describe('Logs', () => {
  describe('getLog', () => {
    test('valid request', async () => {
      const getLogPromise = client.getLog('logId');
      await expect(getLogPromise).resolves.toHaveProperty('logId');
      await expect(getLogPromise).resolves.toHaveProperty('events');
    });
  });
});

describe('AppClients', () => {
  describe('createAppClient', () => {
    test.each<[CreateAppClientOptions]>([
      [
        {
          generateSecret: true,
          name: 'App client name',
          description: 'App client description',
        },
      ],
      [
        {
          generateSecret: false,
          name: 'App client name',
          description: 'App client description',
          callbackUrls: [ 'http://localhost:3030/authCallback' ],
          logoutUrls: [ 'http://localhost:3030/logout' ],
          loginUrls: [ 'http://localhost:3030/login' ],
          defaultLoginUrl: 'http://localhost:3030/login',
        },
      ],
    ])('input: %o', async (options) => {
      const createAppClientPromise = client.createAppClient(options);
      await expect(createAppClientPromise).resolves.toHaveProperty('apiKey');
      await expect(createAppClientPromise).resolves.toHaveProperty('appClientId');
      await expect(createAppClientPromise).resolves.toHaveProperty('callbackUrls');
      await expect(createAppClientPromise).resolves.toHaveProperty('clientId');
      await expect(createAppClientPromise).resolves.toHaveProperty('clientSecret');
      await expect(createAppClientPromise).resolves.toHaveProperty('createdTime');
      await expect(createAppClientPromise).resolves.toHaveProperty('description');
      await expect(createAppClientPromise).resolves.toHaveProperty('hasSecret');
      await expect(createAppClientPromise).resolves.toHaveProperty('logoutUrls');
      await expect(createAppClientPromise).resolves.toHaveProperty('loginUrls');
      await expect(createAppClientPromise).resolves.toHaveProperty('defaultLoginUrl');
      await expect(createAppClientPromise).resolves.toHaveProperty('name');
    });
  });

  describe('updateAppClient', () => {
    test('valid request', async () => {
      const appClientId = createAppClientId();
      const defaultLoginUrl = 'http://localhost:3030/login';
      const description = 'My app client description';
      const loginUrls = [ 'http://localhost:3030/login' ];
      const name = 'My app client name';
      const options = { description, name, defaultLoginUrl, loginUrls };
      const updateAppClientPromise = client.updateAppClient(appClientId, options);
      await expect(updateAppClientPromise).resolves.toHaveProperty('apiKey');
      await expect(updateAppClientPromise).resolves.toHaveProperty('appClientId');
      await expect(updateAppClientPromise).resolves.toHaveProperty('callbackUrls');
      await expect(updateAppClientPromise).resolves.toHaveProperty('clientId');
      await expect(updateAppClientPromise).resolves.toHaveProperty('clientSecret');
      await expect(updateAppClientPromise).resolves.toHaveProperty('createdTime');
      await expect(updateAppClientPromise).resolves.toHaveProperty('description');
      await expect(updateAppClientPromise).resolves.toHaveProperty('hasSecret');
      await expect(updateAppClientPromise).resolves.toHaveProperty('logoutUrls');
      await expect(updateAppClientPromise).resolves.toHaveProperty('loginUrls');
      await expect(updateAppClientPromise).resolves.toHaveProperty('defaultLoginUrl');
      await expect(updateAppClientPromise).resolves.toHaveProperty('name');
    });
  });

  describe('deleteAppClient', () => {
    test('valid request', async () => {
      const appClientId = createAppClientId();
      const deleteAppClientPromise = client.deleteAppClient(appClientId);
      await expect(deleteAppClientPromise).resolves.toHaveProperty('apiKey');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('appClientId');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('callbackUrls');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('clientId');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('createdTime');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('description');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('hasSecret');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('logoutUrls');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('loginUrls');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('defaultLoginUrl');
      await expect(deleteAppClientPromise).resolves.toHaveProperty('name');
    });
  });

  describe('listAppClients', () => {
    test('valid request', async () => {
      const listAppClientsPromise = client.listAppClients();
      await expect(listAppClientsPromise).resolves.toHaveProperty('appClients');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listAppClientsPromise = client.listAppClients({ maxResults, nextToken });
      await expect(listAppClientsPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('DataBundles', () => {
  describe('createDataBundle', () => {
    test.each<[Array<string>, CreateDataBundleOptions]>([
      [
        [ createDatasetId() ],
        {
          name: 'Data bundle name',
          description: 'Data bundle description',
        },
      ],
      [
        [ createDatasetId(), createDatasetId(), createDatasetId() ],
        {
          name: 'Data bundle name',
          description: 'Data bundle description',
        },
      ],
    ])('input: %o', async (datasetIds, options) => {
      const modelId = createModelId();
      const createDataBundlePromise = client.createDataBundle(modelId, datasetIds, options);
      await expect(createDataBundlePromise).resolves.toHaveProperty('createdTime');
      await expect(createDataBundlePromise).resolves.toHaveProperty('dataBundleId');
      await expect(createDataBundlePromise).resolves.toHaveProperty('datasets');
      await expect(createDataBundlePromise).resolves.toHaveProperty('description');
      await expect(createDataBundlePromise).resolves.toHaveProperty('modelId');
      await expect(createDataBundlePromise).resolves.toHaveProperty('name');
      await expect(createDataBundlePromise).resolves.toHaveProperty('status');
      await expect(createDataBundlePromise).resolves.toHaveProperty('summary');
      await expect(createDataBundlePromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('updateDataBundle', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const dataBundleId = createDataBundleId();
      const description = 'My data bundle description';
      const name = 'My data bundle name';
      const options = { description, name };
      const updateDataBundlePromise = client.updateDataBundle(modelId, dataBundleId, options);
      await expect(updateDataBundlePromise).resolves.toHaveProperty('createdTime');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('dataBundleId');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('datasets');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('description');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('modelId');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('name');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('status');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('summary');
      await expect(updateDataBundlePromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('deleteDataBundle', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const dataBundleId = createDataBundleId();
      const deleteDataBundlePromise = client.deleteDataBundle(modelId, dataBundleId);
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('createdTime');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('dataBundleId');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('datasets');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('description');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('modelId');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('name');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('status');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('summary');
      await expect(deleteDataBundlePromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('listDataBundles', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const listDataBundlesPromise = client.listDataBundles(modelId);
      await expect(listDataBundlesPromise).resolves.toHaveProperty('dataBundles');
    });

    test('accepts pagination params', async () => {
      const modelId = createModelId();
      const maxResults = 1;
      const nextToken = uuidv4();
      const listDataBundlesPromise = client.listDataBundles(modelId, { maxResults, nextToken });
      await expect(listDataBundlesPromise).resolves.toHaveProperty('nextToken');
    });
  });
});
