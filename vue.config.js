/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
  devServer: {
    before(app) {
      apiMocker(app, path.resolve('@/../mock/api-mock.js'), {
        proxy: {
          '/api/(.*)': 'http://localhost:8080/',
        },
        changeHost: true,
      });
    },
  },
  transpileDependencies: ['vuetify'],
};
