module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true,
  collectCoverageFrom: ['packages/**/*.ts'],
  coveragePathIgnorePatterns: [
    "jest.config.js",
    "/node_modules/",
    "/lib/",
  ],
  moduleNameMapper: {
    '^@lucidtech/(.*)$': '<rootDir>/packages/$1/'
  },
  "projects": [
    {
      "preset": "ts-jest",
      "displayName": "core",
      "testMatch": ["<rootDir>/packages/las-sdk-core/**/*.spec.ts"]
    },
    {
      "preset": "ts-jest",
      "displayName": "node",
      "testEnvironment": "node",
      "testMatch": ["<rootDir>/packages/las-sdk-node/**/*.spec.ts"]
    },
    {
      "preset": "ts-jest",
      "displayName": "browser",
      "testEnvironment": "jsdom",
      "testMatch": ["<rootDir>/packages/las-sdk-browser/**/*.spec.ts"]
    }
  ]

};

