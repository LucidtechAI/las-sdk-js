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

test('Testing successful postProcesses', async () => {
  const client = getTestClient();

  const testStateMachineArn = uuidv4();
  const testInputData = { [uuidv4()]: uuidv4() };
  const postProcessesPromise = client.postProcesses(testStateMachineArn, testInputData);
  await expect(postProcessesPromise).resolves.toHaveProperty('executionArn');
});

test('Testing erroneous postProcesses', async () => {
  const client = getTestClient();

  const testStateMachineArn = uuidv4();
  const testInputData = 'ErroneousInputData';
  const postProcessesPromise = client.postProcesses(testStateMachineArn, testInputData);
  await expect(postProcessesPromise).rejects.toBeDefined();
});

test('Testing successful postTasks', async () => {
  const client = getTestClient();

  const testActivityArn = uuidv4();
  const postTasksPromise = client.postTasks(testActivityArn);
  await expect(postTasksPromise).resolves.toBeDefined();
});

test('Testing successful patchTask', async () => {
  const client = getTestClient();

  const testTaskId = uuidv4();
  const testTaskResult = { [uuidv4()]: uuidv4() };
  const postTasksPromise = client.patchTasks(testTaskId, testTaskResult);
  await expect(postTasksPromise).resolves.toBeDefined();
});

test('Testing erroneous patchTask', async () => {
  const client = getTestClient();

  const testTaskId = uuidv4();
  const testTaskResult = 'ErroneousTaskResult';
  const postTasksPromise = client.patchTasks(testTaskId, testTaskResult);
  await expect(postTasksPromise).rejects.toBeDefined();
});

test('Testing patchTask with a non-empty taskError', async () => {
  const client = getTestClient();
  const testTaskId = uuidv4();
  const testTaskError = {
    code: 'error code',
    message: 'error message',
  }
  const patchTaskPromise = client.patchTasks(testTaskId, {}, { testTaskError });
  await expect(patchTaskPromise).resolves.toBeDefined();
})

test('Testing successful getDocument', async () => {
  const client = getTestClient();

  const documentId = uuidv4();
  const getDocumentPromise = client.getDocument(documentId);
  await expect(getDocumentPromise).resolves.toHaveProperty('consentId');
  await expect(getDocumentPromise).resolves.toHaveProperty('documentId');
  await expect(getDocumentPromise).resolves.toHaveProperty('contentType');
});

test('Testing getProcesses', async () => {
  const client = getTestClient();
  const getProcessesPromise = client.getProcesses({ status: 'APPROVED' });
  await expect(getProcessesPromise).resolves.toHaveProperty('executionArn');
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
