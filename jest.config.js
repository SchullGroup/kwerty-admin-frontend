module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/*config.js',
    '!coverage/**',
    '!**/config/**',
    '!**/views/Components.vue',
    '!server.js',
  ],
};
