import { v4 as uuidv4 } from 'uuid';
import { getTestClient } from './helpers';
import { ContentType, PostTransitionParams, WorkflowSpecification } from './types';

let client = getTestClient();

beforeEach(() => {
  client = getTestClient();
});

describe('Documents', () => {
  describe('createDocument', () => {
    test('valid request body', async () => {
      const testContent = uuidv4();
      const testContentType = 'image/jpeg';
      const testConsentId = `las:consent:${uuidv4().replace(/-/g, '')}`;
      const testBatchId = `las:batch:${uuidv4().replace(/-/g, '')}`;
      const createDocumentPromise = client.createDocument(testContent, testContentType, testConsentId, testBatchId);
      await expect(createDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(createDocumentPromise).resolves.toHaveProperty('contentType');
      await expect(createDocumentPromise).resolves.toHaveProperty('documentId');
    });

    test('invalid Content-Type', async () => {
      const testContent = uuidv4();
      const testContentType = ('erroneousContentType' as unknown) as ContentType;
      const testConsentId = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, testContentType, testConsentId);
      await expect(createDocumentPromise).rejects.toBeDefined();
    });

    test('invalid consentId pattern', async () => {
      const testContent = uuidv4();
      const testContentType = 'image/jpeg';
      const testConsentId = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, testContentType, testConsentId);
      await expect(createDocumentPromise).rejects.toBeDefined();
    });

    test('invalid batchId pattern', async () => {
      const testContent = uuidv4();
      const testContentType = 'image/jpeg';
      const testConsentId = uuidv4();
      const createDocumentPromise = client.createDocument(testContent, testContentType, testConsentId);
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
      const updateDocumentPromise = client.updateDocument(documentId, groundTruth);
      await expect(updateDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('documentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('contentType');
    });
  });

  describe('deleteDocuments', () => {
    test('valid request', async () => {
      const consentId = uuidv4();
      const updateDocumentPromise = client.deleteDocuments(consentId);
      await expect(updateDocumentPromise).resolves.toHaveProperty('documents');
    });
  });

  describe('listDocuments', () => {
    test('valid request', async () => {
      const testBatchId = uuidv4();
      const listDocumentsPromise = client.listDocuments(testBatchId);
      await expect(listDocumentsPromise).resolves.toBeDefined();
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listDocumentsPromise = client.listDocuments(undefined, undefined, maxResults, nextToken);
      await expect(listDocumentsPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('Transitions', () => {
  describe('createTransition', () => {
    test.each<['manual' | 'docker', PostTransitionParams | undefined, object, object]>([
      ['manual', undefined, {}, {}],
      ['docker', undefined, {}, {}],
      ['docker', { imageUrl: 'test' }, {}, {}],
      ['docker', { imageUrl: 'test', cpu: 256, memory: 1024 }, {}, {}],
      ['manual', { assets: { jsRemoteComponent: `las:asset:${uuidv4().replace(/-/g, '')}` } }, {}, {}],
    ])('transitionType: %s, params: %o', async (transitionType, params, inputSchema, outputSchema) => {
      const createTransitionPromise = client.createTransition(transitionType, inputSchema, outputSchema, params);
      await expect(createTransitionPromise).resolves.toHaveProperty('transitionId');
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
      const listTransitionsPromise = client.listTransitions(undefined, maxResults, nextToken);
      await expect(listTransitionsPromise).resolves.toHaveProperty('nextToken');
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
    test.each<['succeeded' | 'failed', object | undefined, { message: string } | undefined]>([
      ['failed', undefined, { message: 'test' }],
      ['succeeded', {}, undefined],
      ['succeeded', {}, undefined],
      ['failed', undefined, { message: 'test' }],
    ])('status: %s, output: %o, error: %o', async (status, output, error) => {
      const transitionId = uuidv4();
      const executionId = uuidv4();
      const updateTransitionExecutionPromise = client.updateTransitionExecution(
        transitionId,
        executionId,
        status,
        output,
        error,
      );
      await expect(updateTransitionExecutionPromise).resolves.toHaveProperty('executionId');
      await expect(updateTransitionExecutionPromise).resolves.toHaveProperty('status');
      await expect(updateTransitionExecutionPromise).resolves.toHaveProperty('transitionId');
    });
  });
});

describe('Workflows', () => {
  describe('createWorkflow', () => {
    test.each<[WorkflowSpecification, string, string | undefined, { email: string } | undefined]>([
      [{ definition: {} }, 'test', 'test', { email: 'test@test.com' }],
      [{ definition: {} }, 'test', undefined, undefined],
      [{ definition: {} }, 'test', undefined, { email: 'test@test.com' }],
      [{ definition: {}, language: 'ASL', version: '1.0.0' }, 'test', 'test', { email: 'test@test.com' }],
      [{ definition: {} }, 'test', 'test', { email: 'test@test.com' }],
    ])(
      'specification: %o, name: %s, description: %s, errorConfig: %o',
      async (specification, name, description, errorConfig) => {
        const createWorkflowPromise = client.createWorkflow(specification, name, description, errorConfig);
        await expect(createWorkflowPromise).resolves.toHaveProperty('name');
        await expect(createWorkflowPromise).resolves.toHaveProperty('workflowId');
      },
    );
  });

  describe('listWorkflows', () => {
    test('valid request', async () => {
      const listWorkflowsPromise = client.listWorkflows();
      await expect(listWorkflowsPromise).resolves.toHaveProperty('workflows');
    });

    test('accepts pagination params', async () => {
      const maxResults = 1;
      const nextToken = uuidv4();
      const listWorkflowsPromise = client.listWorkflows(maxResults, nextToken);
      await expect(listWorkflowsPromise).resolves.toHaveProperty('nextToken');
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
    test.each([undefined, 'test'])('status: %s', async () => {
      const workflowId = uuidv4();
      const listWorkflowExecutionsPromise = client.listWorkflowExecutions(workflowId);
      await expect(listWorkflowExecutionsPromise).resolves.toHaveProperty('executions');
      await expect(listWorkflowExecutionsPromise).resolves.toHaveProperty('workflowId');
    });

    test('accepts pagination params', async () => {
      const workflowId = uuidv4();
      const maxResults = 1;
      const nextToken = uuidv4();
      const listWorkflowsPromise = client.listWorkflowExecutions(workflowId, undefined, maxResults, nextToken);
      await expect(listWorkflowsPromise).resolves.toHaveProperty('nextToken');
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
      const listUsersPromise = client.listUsers(maxResults, nextToken);
      await expect(listUsersPromise).resolves.toHaveProperty('nextToken');
    });
  });
});

describe('Predictions', () => {
  describe('createPredictions', () => {
    test('valid request', async () => {
      const testDocumentId = `las:document:${uuidv4().replace(/-/g, '')}`;
      const testModelId = `las:model:${uuidv4().replace(/-/g, '')}`;
      const createPredictionPromise = client.createPrediction(testDocumentId, testModelId);
      await expect(createPredictionPromise).resolves.toHaveProperty('documentId');
      await expect(createPredictionPromise).resolves.toHaveProperty('predictions');
    });

    test('invalid model name', async () => {
      const testDocumentId = `las:document:${uuidv4().replace(/-/g, '')}`;
      const testModelId = 'erroneousModelId';
      const createPredictionPromise = client.createPrediction(testDocumentId, testModelId);
      await expect(createPredictionPromise).rejects.toBeDefined();
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
      const listAssetsPromise = client.listAssets(maxResults, nextToken);
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
      const updateAssetPromise = client.updateAsset(assetId, content);
      await expect(updateAssetPromise).resolves.toHaveProperty('assetId');
    });
  });
});

describe('createBatch', () => {
  test('valid request', async () => {
    const description = 'I am going to create a new batch, give me a batch ID!';
    const createBatchPromise = client.createBatch(description);
    await expect(createBatchPromise).resolves.toHaveProperty('batchId');
  });
});
