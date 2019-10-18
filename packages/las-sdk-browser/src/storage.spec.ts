import { Token } from '@lucidtech/las-sdk-core';
import { SessionStorage } from './storage';
import { MockStorage } from './helpers.spec';


it('Tests getting and setting token in session storage', () => {
  const mockStorage = new MockStorage();
  Storage.prototype.getItem = jest.fn((key: string) => mockStorage.getItem(key));
  Storage.prototype.setItem = jest.fn(
    (key: string, value: string) => mockStorage.setItem(key, value),
  );

  const token = new Token('testAccessToken', 1, 'testRefreshToken');
  const storage = new SessionStorage();
  storage.setPersistentToken(token);

  const persistentToken = storage.getPersistentToken();
  expect(persistentToken).not.toBe(null);
  expect(persistentToken!.accessToken).toEqual('testAccessToken');
  expect(persistentToken!.expiration).toEqual(1);
  expect(persistentToken!.refreshToken).toEqual('testRefreshToken');
});
