import { v4 as uuidv4 } from 'uuid';
import { getTestClient } from './helpers';

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
      const testContentType = 'erroneousContentType';
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
      const feedback = [{ label: 'test', value: 'test' }];
      const updateDocumentPromise = client.updateDocument(documentId, feedback);
      await expect(updateDocumentPromise).resolves.toHaveProperty('consentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('documentId');
      await expect(updateDocumentPromise).resolves.toHaveProperty('contentType');
    });
  });

  describe('deleteDocument', () => {
    test('valid request', async () => {
      const documentId = uuidv4();
      const updateDocumentPromise = client.deleteDocument(documentId);
      await expect(updateDocumentPromise).resolves.toHaveProperty('documents');
    });
  });

  describe('listDocuments', () => {
    test('valid request', async () => {
      const testBatchId = uuidv4();
      const listDocumentsPromise = client.listDocuments(testBatchId);
      await expect(listDocumentsPromise).resolves.toBeDefined();
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

describe('createBatch', () => {
  test('valid request', async () => {
    const description = 'I am going to create a new batch, give me a batch ID!';
    const createBatchPromise = client.createBatch(description);
    await expect(createBatchPromise).resolves.toHaveProperty('batchId');
  });
});
