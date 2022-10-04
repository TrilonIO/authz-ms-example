module.exports = {
  displayName: 'authorization',
  moduleFileExtensions: ['ts', 'js', 'html'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*spec.ts'],
  // preset: '../../jest.preset.ts',
  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.spec.json',
  //   },
  // },
  // coverageDirectory: '../../coverage/apps/authorization',
};
