/* eslint-disable no-console */
import chalk from 'chalk';
import { getPackages } from '@lerna/project';
import webpack from 'webpack';
import { getWebpackPluginConfig } from './webpack.common';
import { argv } from 'yargs';

process.on('unhandledRejection', error => {
  throw error;
});

const warning = chalk.keyword('orange');

type IncludePluginsOptions = { skipPlugins?: boolean; bundleOnly?: string };

const getAllPluginsNames = ({
  skipPlugins = false,
  bundleOnly,
}: IncludePluginsOptions): Promise<string[]> => {
  const viewerPakages = [
    'rcv',
    'rcv-with-plugins',
    'rcv-with-media-plugins',
    'ricos-viewer',
    'ricos-viewer-no-modal',
    'ricos-viewer-with-plugins',
    'rce',
    'rce-with-plugins',
    'ricos-editor',
    'ricos-editor-no-modal',
    'ricos-editor-with-plugins',
    'ricos-common',
  ];

  if (skipPlugins) {
    return Promise.resolve(viewerPakages);
  }
  if (bundleOnly) {
    return Promise.resolve([bundleOnly]);
  }

  return getPackages().then(allPackages => {
    // return ['wix-rich-content-plugin-social-polls'];
    return allPackages
      .filter(pkg => !pkg.private)
      .filter(
        pkg =>
          pkg.name.indexOf('wix-rich-content-plugin') === 0 &&
          pkg.name !== 'wix-rich-content-plugin-commons'
      )
      .map(pkg => pkg.name)
      .concat(viewerPakages);
  });
};

const options: IncludePluginsOptions = {};
const firstArg = argv._[0];
if (firstArg) {
  if (firstArg === 'skipPlugins') {
    console.log('skipping plugins');
    options.skipPlugins = true;
  } else {
    console.log('bundling only', firstArg);
    options.bundleOnly = firstArg;
  }
}

export async function analyze() {
  const sizesObject: Record<string, number> = {};
  console.log(chalk.magenta('Analyzing plugins...'));
  await getAllPluginsNames(options).then(async pkgNames => {
    const bundleResultsPromise = pkgNames.map(pkgName => {
      return new Promise(resolve => {
        webpack(getWebpackPluginConfig(pkgName), (err, stats) => {
          // Stats Object
          if (err || stats.hasErrors()) {
            const _err: string = err || stats.compilation.errors[0];
            console.error(chalk.red(_err));
            resolve({ name: pkgName, error: _err });
          } else {
            resolve({
              name: pkgName,
              size: Math.ceil(
                stats.toJson(true).assets.find(({ name }) => name === `${pkgName}.js`).size / 1024
              ),
            });
          }
        });
      });
    });

    await Promise.all(bundleResultsPromise).then(results => {
      results.forEach((result: { name: string; size?: number; error?: string }) => {
        const { size, name, error } = result;
        const prefix = chalk.cyan(`[${name}]`);
        if (error) {
          console.log(prefix, chalk.red(`Error! ${error}`));
          process.exit(1);
        } else {
          const chlk = size > 500 ? warning : size > 250 ? chalk.yellow : chalk.green;
          console.log(prefix, chlk(`${size}KB`));
          sizesObject[name] = size;
        }
      });
    });
  });
  return sizesObject;
}
