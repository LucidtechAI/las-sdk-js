/**
 * @jest-environment node
 */

import { getTestClient, uuidWithoutDashes } from './helpers';

let client = getTestClient();

const createPlanId = () => `las:plan:${uuidWithoutDashes()}`;

beforeEach(() => {
  client = getTestClient();
});

describe('Plans', () => {
  describe('listPlans', () => {
    test('valid request', async () => {
      const listPlansPromise = client.listPlans();

      await expect(listPlansPromise).resolves.toHaveProperty('plans');
    });

    test('with AbortController', async () => {
      const control = new AbortController();
      control.abort();
      const listPlansPromise = client.listPlans({ requestConfig: { signal: control.signal } });

      await expect(listPlansPromise).rejects.toBeDefined();
    });
  });

  describe('getPlan', () => {
    test('valid request', async () => {
      const planId = createPlanId();
      const listPlansPromise = client.getPlan(planId);

      await expect(listPlansPromise).resolves.toHaveProperty('billingCycle');
      await expect(listPlansPromise).resolves.toHaveProperty('currency');
      await expect(listPlansPromise).resolves.toHaveProperty('latest');
      await expect(listPlansPromise).resolves.toHaveProperty('name');
      await expect(listPlansPromise).resolves.toHaveProperty('organizationId');
      await expect(listPlansPromise).resolves.toHaveProperty('planId');
    });
  });
});
