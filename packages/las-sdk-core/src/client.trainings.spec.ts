/**
 * @jest-environment node
 */

import { AbortController } from 'node-abort-controller';
import { getTestClient, uuidWithoutDashes } from './helpers';

let client = getTestClient();

const createDataBundleId = () => `las:model-data-bundle:${uuidWithoutDashes()}`;
const createModelId = () => `las:model:${uuidWithoutDashes()}`;
const createTrainingId = () => `las:training:${uuidWithoutDashes()}`;

beforeEach(() => {
  client = getTestClient();
});

describe('Trainings', () => {
  describe('listTrainings', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const listTrainingsPromise = client.listTrainings(modelId);

      await expect(listTrainingsPromise).resolves.toHaveProperty('trainings');
      await expect(listTrainingsPromise).resolves.toHaveProperty('nextToken');
    });

    test('with AbortController', async () => {
      const modelId = createModelId();

      const control = new AbortController();
      control.abort();
      const listTrainingsPromise = client.listTrainings(modelId, { requestConfig: { signal: control.signal } });

      await expect(listTrainingsPromise).rejects.toBeDefined();
    });
  });

  describe('createTraining', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const createTrainingPromise = client.createTraining(modelId, { dataBundleIds: [createDataBundleId()] });

      await expect(createTrainingPromise).resolves.toHaveProperty('createdBy');
      await expect(createTrainingPromise).resolves.toHaveProperty('createdTime');
      await expect(createTrainingPromise).resolves.toHaveProperty('dataBundleIds');
      await expect(createTrainingPromise).resolves.toHaveProperty('description');
      await expect(createTrainingPromise).resolves.toHaveProperty('instanceType');
      await expect(createTrainingPromise).resolves.toHaveProperty('metadata');
      await expect(createTrainingPromise).resolves.toHaveProperty('modelId');
      await expect(createTrainingPromise).resolves.toHaveProperty('name');
      await expect(createTrainingPromise).resolves.toHaveProperty('status');
      await expect(createTrainingPromise).resolves.toHaveProperty('trainingId');
      await expect(createTrainingPromise).resolves.toHaveProperty('updatedBy');
      await expect(createTrainingPromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('updateTraining', () => {
    test('valid request', async () => {
      const modelId = createModelId();
      const trainingId = createTrainingId();
      const updateTrainingPromise = client.updateTraining(modelId, trainingId, { status: 'cancelled' });

      await expect(updateTrainingPromise).resolves.toHaveProperty('createdBy');
      await expect(updateTrainingPromise).resolves.toHaveProperty('createdTime');
      await expect(updateTrainingPromise).resolves.toHaveProperty('dataBundleIds');
      await expect(updateTrainingPromise).resolves.toHaveProperty('description');
      await expect(updateTrainingPromise).resolves.toHaveProperty('instanceType');
      await expect(updateTrainingPromise).resolves.toHaveProperty('metadata');
      await expect(updateTrainingPromise).resolves.toHaveProperty('modelId');
      await expect(updateTrainingPromise).resolves.toHaveProperty('name');
      await expect(updateTrainingPromise).resolves.toHaveProperty('status');
      await expect(updateTrainingPromise).resolves.toHaveProperty('trainingId');
      await expect(updateTrainingPromise).resolves.toHaveProperty('updatedBy');
      await expect(updateTrainingPromise).resolves.toHaveProperty('updatedTime');
    });
  });
});
