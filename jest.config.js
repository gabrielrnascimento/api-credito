module.exports = {
    roots: ['<rootDir>/src/'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/erro-*.ts',
      '!<rootDir>/src/**/server.ts',
      '!<rootDir>/src/main/adapters/*.ts',
      '!<rootDir>/src/main/config/*.ts',
      '!<rootDir>/src/presentation/utils/*.ts',
    ],
    preset: '@shelf/jest-mongodb',
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-node',
    transform: {
      '.+\\.ts': 'ts-jest'
    }
  };
  