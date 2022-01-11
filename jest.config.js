module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules)'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest-setup.ts'],
};
