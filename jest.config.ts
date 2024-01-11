export default {
  // testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testMatch: ['**/src/**/*.spec.ts?(x)'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
}
