const path = require('path');

module.exports = {
  extends: ['../../.eslintrc', 'plugin:import/errors', 'plugin:import/warnings'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, '../../packages'),
      },
    },
  },
};
