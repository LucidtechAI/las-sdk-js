// Options of each project: with projects, jest ignores them at the top level
const project = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // The packages' sources, not their builds, as in tsconfig.json's paths
  moduleNameMapper: {
    '^@lucidtech/(.*)$': '<rootDir>/packages/$1/src',
  },
};

module.exports = {
  verbose: true,
  collectCoverageFrom: ['packages/**/*.ts', '!packages/**/lib/**/*.{js,ts}', '!packages/**/*.spec.*'],
  coveragePathIgnorePatterns: ['jest.config.js', '<rootDir>/**/node_modules/', '<rootDir>/**/lib/'],
  // A new method without a test in client.requests.spec.ts fails that suite already; this catches the rest
  coverageThreshold: {
    global: { statements: 95, branches: 85, functions: 95, lines: 95 },
  },
  projects: [
    {
      ...project,
      displayName: 'core',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/las-sdk-core/**/*.spec.ts'],
    },
    {
      ...project,
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/las-sdk-node/**/*.spec.ts'],
    },
    {
      ...project,
      displayName: 'browser',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/packages/las-sdk-browser/**/*.spec.ts'],
    },
  ],
};
