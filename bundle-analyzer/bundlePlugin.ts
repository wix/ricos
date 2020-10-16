/* eslint-disable no-console */
import chalk from 'chalk';

import webpack from 'webpack';
import { getWebpackConfig } from './webpack.common';

process.on('unhandledRejection', error => {
  throw error;
});

export async function analyze(pkgName: string) {
  console.log('analyzing!');
  const input = `../packages/${pkgName}/web/dist/module.viewer`;
  const output = 'test';
  return new Promise(resolve => {
    webpack(getWebpackConfig(input, output), (err, stats) => {
      // Stats Object
      if (err || stats.hasErrors()) {
        const _err: string = err || stats.compilation.errors[0];
        console.error(chalk.red(_err));
        resolve({ name: input, error: _err });
      } else {
        resolve({
          name: input,
        });
      }
    });
  });
}

analyze('plugin-accordion');
