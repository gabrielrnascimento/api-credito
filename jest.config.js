module.exports = {
    roots: ['<rootDir>/src/'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/erro-*.ts',
    ],
    preset: '@shelf/jest-mongodb',
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-node',
    transform: {
      '.+\\.ts': 'ts-jest'
    }
  };
  