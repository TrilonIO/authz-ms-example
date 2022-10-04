const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],
  setupFiles: ['<rootDir>/jest.env.ts'],
  moduleNameMapper: {
    '@authz/(.*)': '<rootDir>/src/$1',
  },
};
