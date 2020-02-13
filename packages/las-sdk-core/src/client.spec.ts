import { default as uuidv4 } from 'uuid/v4';
import { getTestClient } from './helpers.spec';


test('Testing successful createDocument', async () => {
  const client = getTestClient();

  const testContent = uuidv4();
  const testContentType = 'image/jpeg';
  const testConsentId = uuidv4();
  const testBatchId = uuidv4();
  const createDocumentPromise = client.createDocument(testContent, testContentType, testConsentId, testBatchId);
  await expect(createDocumentPromise).resolves.toHaveProperty('consentId');
  await expect(createDocumentPromise).resolves.toHaveProperty('contentType');
  await expect(createDocumentPromise).resolves.toHaveProperty('documentId');
});

test('Testing erroneous createDocument', async () => {
  const client = getTestClient();

  const testContent = uuidv4();
  const testContentType = 'erroneousContentType';
  const testConsentId = uuidv4();
  const createDocumentPromise = client.createDocument(testContent, testContentType, testConsentId);
  await expect(createDocumentPromise).rejects.toBeDefined();
});

test('Testing successful createPrediction', async () => {
  const client = getTestClient();

  const testDocumentId = uuidv4();
  const testModelName = 'invoice';
  const createPredictionPromise = client.createPrediction(testDocumentId, testModelName);
  await expect(createPredictionPromise).resolves.toHaveProperty('documentId');
  await expect(createPredictionPromise).resolves.toHaveProperty('predictions');
});

test('Testing erroneous createPrediction', async () => {
  const client = getTestClient();

  const testDocumentId = uuidv4();
  const testModelName = 'erroneousModelName';
  const createPredictionPromise = client.createPrediction(testDocumentId, testModelName);
  await expect(createPredictionPromise).rejects.toBeDefined();
});

test('Testing successful getDocument', async () => {
  const client = getTestClient();

  const documentId = uuidv4();
  const getDocumentPromise = client.getDocument(documentId);
  await expect(getDocumentPromise).resolves.toHaveProperty('consentId');
  await expect(getDocumentPromise).resolves.toHaveProperty('documentId');
  await expect(getDocumentPromise).resolves.toHaveProperty('contentType');
});

test('Testing listDocuments', async () => {
  const client = getTestClient();
  const testBatchId = uuidv4();
  const listDocumentsPromise = client.listDocuments(testBatchId);
  await expect(listDocumentsPromise).resolves.toBeDefined();
});

test('Testing createBatch', async () => {
  const client = getTestClient();
  const description = "I am going to create a new batch, give me a batch ID!"
  const createBatchPromise = client.createBatch(description);
  await expect(createBatchPromise).resolves.toHaveProperty('batchId');
});
