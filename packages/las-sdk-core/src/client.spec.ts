import {getTestClient} from './helpers.spec';
import {default as uuidv4} from 'uuid/v4';


test('Testing successful postDocuments', async () => {
    const client = getTestClient();

    const testContent = uuidv4();
    const testContentType = 'image/jpeg';
    const testConsentId = uuidv4();
    const postDocumentsPromise = client.postDocuments(testContent, testContentType, testConsentId);
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
    const testInputData = {[uuidv4()]: uuidv4()};
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
    await expect(postTasksPromise).resolves.toHaveProperty('taskId');
    await expect(postTasksPromise).resolves.toHaveProperty('taskData');
});

test('Testing successful patchTask', async () => {
    const client = getTestClient();

    const testTaskId = uuidv4();
    const testTaskResult = {[uuidv4()]: uuidv4()};
    const postTasksPromise = client.patchTasks(testTaskId, testTaskResult);
    await expect(postTasksPromise).resolves.toHaveProperty('taskId');
    await expect(postTasksPromise).resolves.toHaveProperty('taskData');
});

test('Testing erroneous patchTask', async () => {
    const client = getTestClient();

    const testTaskId = uuidv4();
    const testTaskResult = 'ErroneousTaskResult';
    const postTasksPromise = client.patchTasks(testTaskId, testTaskResult);
    await expect(postTasksPromise).rejects.toBeDefined();
});

test('Testing successful getDocument', async () => {
    const client = getTestClient();

    const documentId = uuidv4();
    const getDocumentPromise = client.getDocument(documentId);
    await expect(getDocumentPromise).resolves.toHaveProperty('content');
    await expect(getDocumentPromise).resolves.toHaveProperty('consentId');
    await expect(getDocumentPromise).resolves.toHaveProperty('documentId');
    await expect(getDocumentPromise).resolves.toHaveProperty('contentType');
});
