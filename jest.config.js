module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true,
  collectCoverageFrom: ['**/src/**/*.ts'],
};
