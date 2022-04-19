/**
 * @jest-environment node
 */

import { getTestClient, uuidWithoutDashes } from './helpers';

let client = getTestClient();

const createPaymentMethodId = () => `las:payment-method:${uuidWithoutDashes()}`;

beforeEach(() => {
  client = getTestClient();
});

describe('Payment methods', () => {
  describe('listPaymentMethods', () => {
    test('valid request', async () => {
      const listPaymentMethodsPromise = client.listPaymentMethods();

      await expect(listPaymentMethodsPromise).resolves.toHaveProperty('paymentMethods');
      await expect(listPaymentMethodsPromise).resolves.toHaveProperty('nextToken');
    });
  });

  describe('createPaymentMethod', () => {
    test('valid request', async () => {
      const createPaymentMethodPromise = client.createPaymentMethod();

      await expect(createPaymentMethodPromise).resolves.toHaveProperty('createdBy');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('createdTime');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('description');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('details');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('name');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('paymentMethodId');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('updatedBy');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('getPaymentMethod', () => {
    test('valid request', async () => {
      const paymentMethodId = createPaymentMethodId();
      const getPaymentMethodPromise = client.getPaymentMethod(paymentMethodId);

      await expect(getPaymentMethodPromise).resolves.toHaveProperty('createdBy');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('createdTime');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('description');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('details');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('name');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('paymentMethodId');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('updatedBy');
      await expect(getPaymentMethodPromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('updatePaymentMethod', () => {
    test('valid request', async () => {
      const paymentMethodId = createPaymentMethodId();
      const createPaymentMethodPromise = client.updatePaymentMethod(paymentMethodId, {
        name: 'test',
        description: 'test',
        stripeSetupIntentSecret: 'supersecret',
      });

      await expect(createPaymentMethodPromise).resolves.toHaveProperty('createdBy');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('createdTime');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('description');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('details');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('name');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('paymentMethodId');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('updatedBy');
      await expect(createPaymentMethodPromise).resolves.toHaveProperty('updatedTime');
    });
  });

  describe('deletePaymentMethod', () => {
    test('valid request', async () => {
      const paymentMethodId = createPaymentMethodId();
      const deletePaymentMethodPromise = client.deletePaymentMethod(paymentMethodId);

      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('createdBy');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('createdTime');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('description');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('details');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('name');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('paymentMethodId');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('updatedBy');
      await expect(deletePaymentMethodPromise).resolves.toHaveProperty('updatedTime');
    });
  });
});
