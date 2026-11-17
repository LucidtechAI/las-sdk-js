import * as browser from './index';

test('the package exports its credentials and storage, and the core package', () => {
  expect(browser.TokenCredentials).toBeDefined();
  expect(browser.SessionStorage).toBeDefined();
  expect(browser.Client).toBeDefined();
  expect(browser.Token).toBeDefined();
  expect(browser.LlmVersionValues).toBeDefined();
});
