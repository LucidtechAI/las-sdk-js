import { TestCredentials, sleep } from './helpers';

test('Testing getAccessToken', async () => {
  const testEndpoint = 'http://localhost:4010';
  const testApiKey = 'testApiKey';
  const testAccessToken = 'testAccessToken';
  const testExpiresInSeconds = 1;
  const testRefreshToken = 'testRefreshToken';
  const credentials = new TestCredentials(testEndpoint, testApiKey, testAccessToken, testExpiresInSeconds, testRefreshToken);
  jest.spyOn(credentials, 'getToken');

  await expect(credentials.getAccessToken()).resolves.toBe(testAccessToken);
  expect(credentials.getToken).toHaveBeenCalled();
  jest.clearAllMocks();

  await expect(credentials.getAccessToken()).resolves.toBe(testAccessToken);
  expect(credentials.getToken).not.toHaveBeenCalled();
  jest.clearAllMocks();

  await sleep(testExpiresInSeconds);
  await expect(credentials.getAccessToken()).resolves.toBe(testAccessToken);
  expect(credentials.getToken).toHaveBeenCalled();
  jest.clearAllMocks();
});
