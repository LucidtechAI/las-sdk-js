import * as core from './index';

test('the package exports the client, the credentials and the types', () => {
  expect(core.Client).toBeDefined();
  expect(core.Credentials).toBeDefined();
  expect(core.Token).toBeDefined();
  expect(core.LlmVersionValues).toEqual(['sonnet-4.6', 'sonnet-5', 'sonnet-5.5', 'qwen3-vl']);
});
