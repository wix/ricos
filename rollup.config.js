/* eslint-disable */

import commonConfig from './rollup.config.common';

const output = process.env.DYNAMIC_IMPORT
  ? [
      {
        dir: 'dist/es',
        format: 'es',
      },
      {
        dir: 'dist/cjs/',
        format: 'cjs',
      },
    ]
  : [
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
