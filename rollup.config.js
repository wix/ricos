/* eslint-disable */

import commonConfig from './rollup.config.common';

let output = [
  {
    file: 'dist/module.js',
    format: 'es',
  },
  {
    file: 'dist/module.cjs.js',
    format: 'cjs',
  },
];

export default commonConfig(output, true);
