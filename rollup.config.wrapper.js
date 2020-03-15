/* eslint-disable */

import commonConfig from './rollup.config.common';

let output = [
  {
    dir: 'dist/es',
    format: 'es',
  },
  {
    dir: 'dist/cjs',
    format: 'cjs',
  },
];

export default commonConfig(output, true);
