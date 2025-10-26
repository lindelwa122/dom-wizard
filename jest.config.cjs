module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/modules'],
  testMatch: ['**/__tests__/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
