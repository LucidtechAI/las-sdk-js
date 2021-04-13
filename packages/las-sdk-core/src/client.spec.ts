/**
 * @jest-environment node
 */

import { v4 as uuidv4 } from 'uuid';
import { getTestClient } from './helpers';
import {
  ContentType,
  CreateTransitionOptions,
  CreateWorkflowOptions,
  UpdateSecretOptions,
  UpdateTransitionExecution,
  TransitionType,
  WorkflowSpecification,
} from './types';

let client = getTestClient();

const uuidWithoutDashes = () => uuidv4().replace(/-/g, '');
const transitionId = () => `las:transition:${uuidWithoutDashes()}`;
const transitionExecutionId = () => `las:transition-execution:${uuidWithoutDashes()}`;
const consentId = () => `las:consent:${uuidWithoutDashes()}`;
const batchId = () => `las:batch:${uuidWithoutDashes()}`;
const documentId = () => `las:document:${uuidWithoutDashes()}`;
const workflowId = () => `las:workflow:${uuidWithoutDashes()}`;
const modelId = () => `las:model:${uuidWithoutDashes()}`;

beforeEach(() => {
  client = getTestClient();
});

describe('Documents', () => {
  describe('createDocument', () => {
    test('valid request body', async () => {
      const testContent = uuidv4();
      const testContentType = 'image/jpeg';
      const testConsentId = consentId();
      const testBatchId = batchId();
      const createDocumentPromise = client.createDocument(testContent, testContentType, {
        consentId: testConsentId,
        batchId: testBatchId,
      });
      await expect(createDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(createDocumentPromise).resolves.toHaveProperty('contentType');
      await expect(createDocumentPromise).resolves.toHaveProperty('documentId');
    });

    test.each<ContentType>(['image/jpeg', 'application/pdf', 'image/png', 'image/tiff'])('allows content type: %s', async (contentType) => {
      const testContent = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, contentType);
      await expect(createDocumentPromise).resolves.toHaveProperty('contentType');
      await expect(createDocumentPromise).resolves.toHaveProperty('documentId');
    });

    test('invalid Content-Type', async () => {
      const testContent = uuidv4();
      const testContentType = ('erroneousContentType' as unknown) as ContentType;
      const testConsentId = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, testContentType, { consentId: testConsentId });
      await expect(createDocumentPromise).rejects.toBeDefined();
    });

    test('invalid consentId pattern', async () => {
      const testContent = uuidv4();
      const testContentType = 'image/jpeg';
      const testConsentId = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, testContentType, { consentId: testConsentId });
      await expect(createDocumentPromise).rejects.toBeDefined();
    });

    test('invalid batchId pattern', async () => {
      const testContent = uuidv4();
      const testContentType = 'image/jpeg';
      const testConsentId = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, testContentType, { consentId: testConsentId });
      await expect(createDocumentPromise).rejects.toBeDefined();
    });
  });

  describe('getDocument', () => {
    test('valid request', async () => {
      const documentId = uuidv4();
      const getDocumentPromise = client.getDocument(documentId);
      await expect(getDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(getDocumentPromise).resolves.toHaveProperty('documentId');
      await expect(getDocumentPromise).resolves.toHaveProperty('contentType');
    });
  });

  describe('updateDocument', () => {
    test('valid request', async () => {
      const documentId = uuidv4();
      const groundTruth = [{ label: 'test', value: 'test' }];
      const updateDocumentPromise = client.updateDocument(documentId, { groundTruth });
      await expect(updateDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('documentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('contentType');
    });
  });

  describe('deleteDocuments', () => {
    test('valid request', async () => {
      const consentId = uuidv4();
      const updateDocumentPromise = client.deleteDocuments({ consentId });
      await expect(updateDocumentPromise).resolves.toHaveProperty('documents');
    });
  });

  describe('listDocuments', () => {
    test('valid request', async () => {
      const testBatchId = uuidv4();
      const listDocumentsPromise = client.listDocuments({ batchId: testBatchId });
      await expect(listDocumentsPromise).resolves.toBeDefined();
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
      ['docker', { parameters: { assets: { jsRemoteComponent: `las:asset:${uuidv4().replace(/-/g, '')}` } } }],
    ])('parameters: %s', async (transitionType, options) => {
      const createTransitionPromise = client.createTransition(transitionType, options);
      await expect(createTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('getTransition', () => {
    test('valid request', async () => {
      const id = transitionId();
      const getTransitionPromise = client.getTransition(id);
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
      const transitionId = uuidv4();
      const updateTransitionPromise = client.updateTransition(transitionId, { name: 'new name' });
      await expect(updateTransitionPromise).resolves.toHaveProperty('name');
      await expect(updateTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('deleteTransition', () => {
    test('valid request', async () => {
      const id = transitionId();
      const deleteTransitionPromise = client.deleteTransition(id);
      await expect(deleteTransitionPromise).resolves.toHaveProperty('transitionId');
    });
  });

  describe('executeTransition', () => {
    test('valid request', async () => {
      const transitionId = uuidv4();
      const executeTransitionPromise = client.executeTransition(transitionId);
      await expect(executeTransitionPromise).resolves.toHaveProperty('executionId');
      await expect(executeTransitionPromise).resolves.toHaveProperty('status');
      await expect(executeTransitionPromise).resolves.toHaveProperty('transitionId');
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
      const testTransitionId = transitionId();
      const testExecutionId = transitionExecutionId();
      const updateTransitionExecutionPromise = client.updateTransitionExecution(testTransitionId, testExecutionId, input);
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
      const testTransitionId = transitionId();
      const testExecutionId = transitionExecutionId();
      const sendHeartbeatPromise = await client.sendHeartbeat(testTransitionId, testExecutionId);
      await expect(sendHeartbeatPromise).resolves.toBe('')
    })
  })
});

describe('Workflows', () => {
  describe('createWorkflow', () => {
    test.each<[string, WorkflowSpecification, CreateWorkflowOptions | undefined]>([
      [
        'test',
        { definition: {} } as WorkflowSpecification,
        { description: 'test', errorConfig: { email: 'test@test.com' } },
      ],
      ['test', { definition: {} } as WorkflowSpecification, undefined],
      ['test', { definition: {} } as WorkflowSpecification, { errorConfig: { email: 'test@test.com' } }],
      [
        'test',
        { definition: {}, language: 'ASL', version: '1.0.0' } as WorkflowSpecification,
        { description: 'test', errorConfig: { email: 'test@test.com' } },
      ],
      [
        'test',
        { definition: {} } as WorkflowSpecification,
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
      const id = workflowId();
      const getWorkflowPromise = client.getWorkflow(id);
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
      const workflowId = uuidv4();
      const updateWorkflowPromise = client.updateWorkflow(workflowId, { name: 'New name' });
      await expect(updateWorkflowPromise).resolves.toHaveProperty('name');
      await expect(updateWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('deleteWorkflow', () => {
    test('valid request', async () => {
      const workflowId = uuidv4();
      const deleteWorkflowPromise = client.deleteWorkflow(workflowId);
      await expect(deleteWorkflowPromise).resolves.toHaveProperty('name');
      await expect(deleteWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('executeWorkflow', () => {
    test('valid request', async () => {
      const workflowId = uuidv4();
      const executeWorkflowPromise = client.executeWorkflow(workflowId, { some: 'input' });
      await expect(executeWorkflowPromise).resolves.toHaveProperty('executionId');
      await expect(executeWorkflowPromise).resolves.toHaveProperty('status');
      await expect(executeWorkflowPromise).resolves.toHaveProperty('workflowId');
    });
  });

  describe('listWorkflowExecutions', () => {
    test.each([undefined, 'test'])('status: %s', async (status) => {
      const workflowId = uuidv4();
      const listWorkflowExecutionsPromise = client.listWorkflowExecutions(workflowId, { status });
      await expect(listWorkflowExecutionsPromise).resolves.toHaveProperty('executions');
      await expect(listWorkflowExecutionsPromise).resolves.toHaveProperty('workflowId');
    });

    test('accepts pagination params', async () => {
      const workflowId = uuidv4();
      const maxResults = 1;
      const nextToken = uuidv4();
      const listWorkflowsPromise = client.listWorkflowExecutions(workflowId, { maxResults, nextToken });
      await expect(listWorkflowsPromise).resolves.toHaveProperty('nextToken');
    });
  });

  describe('deleteWorkflowExecution', () => {
    test('valid request', async () => {
      const workflowId = uuidv4();
      const executionId = uuidv4();
      const deleteWorkflowExecutionPromise = client.deleteWorkflowExecution(workflowId, executionId);
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
      const userId = uuidv4();

      const getUserPromise = client.getUser(userId);
      await expect(getUserPromise).resolves.toHaveProperty('email');
      await expect(getUserPromise).resolves.toHaveProperty('userId');
    });
  });

  describe('updateUser', () => {
    test('valid request', async () => {
      const userId = uuidv4();
      const updateUserPromise = client.updateUser(userId, { name: 'I want a new name' });
      await expect(updateUserPromise).resolves.toHaveProperty('email');
      await expect(updateUserPromise).resolves.toHaveProperty('name');
    });
  });

  describe('deleteUser', () => {
    test('valid request', async () => {
      const userId = uuidv4();

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
      const testDocumentId = documentId();
      const testModelId = modelId();
      const createPredictionPromise = client.createPrediction(testDocumentId, testModelId);
      await expect(createPredictionPromise).resolves.toHaveProperty('documentId');
      await expect(createPredictionPromise).resolves.toHaveProperty('predictions');
    });

    test('with options', async () => {
      const testDocumentId = documentId();
      const testModelId = modelId();
      const createPredictionPromise = client.createPrediction(testDocumentId, testModelId, {
        autoRotate: true,
        imageQuality: 'HIGH',
        maxPages: 2,
      });
      await expect(createPredictionPromise).resolves.toHaveProperty('documentId');
      await expect(createPredictionPromise).resolves.toHaveProperty('predictions');
    });

    test('invalid model name', async () => {
      const testDocumentId = documentId();
      const testModelId = 'erroneousModelId';
      const createPredictionPromise = client.createPrediction(testDocumentId, testModelId);
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
      const assetId = uuidv4();
      const getAssetPromise = client.getAsset(assetId);
      await expect(getAssetPromise).resolves.toHaveProperty('assetId');
      await expect(getAssetPromise).resolves.toHaveProperty('content');
    });
  });

  describe('updateAsset', () => {
    test('valid request', async () => {
      const assetId = uuidv4();
      const content = uuidv4();
      const updateAssetPromise = client.updateAsset(assetId, { content });
      await expect(updateAssetPromise).resolves.toHaveProperty('assetId');
    });
  });
});

describe('Batches', () => {
  describe('createBatch', () => {
    test('valid request', async () => {
      const description = 'I am going to create a new batch, give me a batch ID!';
      const createBatchPromise = client.createBatch({ description });
      await expect(createBatchPromise).resolves.toHaveProperty('batchId');
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
