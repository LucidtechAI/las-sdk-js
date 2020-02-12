import { default as uuidv4 } from 'uuid/v4';
import { getTestClient } from './helpers.spec';


test('Testing successful postDocuments', async () => {
  const client = getTestClient();

  const testContent = uuidv4();
  const testContentType = 'image/jpeg';
  const testConsentId = uuidv4();
  const testBatchId = uuidv4();
  const postDocumentsPromise = client.postDocuments(testContent, testContentType, testConsentId, testBatchId);
  await expect(postDocumentsPromise).resolves.toHaveProperty('consentId');
  await expect(postDocumentsPromise).resolves.toHaveProperty('contentType');
  await expect(postDocumentsPromise).resolves.toHaveProperty('documentId');
});

test('Testing erroneous postDocuments', async () => {
  const client = getTestClient();

  const testContent = uuidv4();
  const testContentType = 'erroneousContentType';
  const testConsentId = uuidv4();
  const postDocumentsPromise = client.postDocuments(testContent, testContentType, testConsentId);
  await expect(postDocumentsPromise).rejects.toBeDefined();
});

test('Testing successful postPredictions', async () => {
  const client = getTestClient();

  const testDocumentId = uuidv4();
  const testModelName = 'invoice';
  const postPredictionsPromise = client.postPredictions(testDocumentId, testModelName);
  await expect(postPredictionsPromise).resolves.toHaveProperty('documentId');
  await expect(postPredictionsPromise).resolves.toHaveProperty('predictions');
});

test('Testing erroneous postPredictions', async () => {
  const client = getTestClient();

  const testDocumentId = uuidv4();
  const testModelName = 'erroneousModelName';
  const postPredictionsPromise = client.postPredictions(testDocumentId, testModelName);
  await expect(postPredictionsPromise).rejects.toBeDefined();
});

test('Testing successful getDocument', async () => {
  const client = getTestClient();

  const documentId = uuidv4();
  const getDocumentPromise = client.getDocument(documentId);
  await expect(getDocumentPromise).resolves.toHaveProperty('consentId');
  await expect(getDocumentPromise).resolves.toHaveProperty('documentId');
  await expect(getDocumentPromise).resolves.toHaveProperty('contentType');
});

test('Testing getDocuments', async () => {
  const client = getTestClient();
  const testBatchId = uuidv4();
  const getDocumentsPromise = client.getDocuments(testBatchId);
  await expect(getDocumentsPromise).resolves.toBeDefined();
});

test('Testing postBatches', async () => {
  const client = getTestClient();
  const description = "I am going to create a new batch, give me a batch ID!"
  const postBatchesPromise = client.postBatches(description);
  await expect(postBatchesPromise).resolves.toHaveProperty('batchId');
});
