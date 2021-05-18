module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/main/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
