module.exports = {
  roots: ['<rootDir>/test'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/main/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
