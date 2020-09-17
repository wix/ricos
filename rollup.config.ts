import commonConfig from './rollup.config.common';
import { OutputOptions } from 'rollup';

const output: OutputOptions[] = process.env.DYNAMIC_IMPORT
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
