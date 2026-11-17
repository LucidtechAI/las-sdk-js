import * as node from './index';

test('the package exports its credentials and the core package', () => {
  expect(node.ClientCredentials).toBeDefined();
  expect(node.Client).toBeDefined();
  expect(node.Token).toBeDefined();
});
