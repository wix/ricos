/* eslint-disable */

import fs from 'fs';
import { cloneDeep } from 'lodash';
import { plugins as createPlugins } from './rollup.plugins';
import { isExternal as external } from './rollup.externals';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

export default (output, shouldExtractCss) => {
  const plugins = createPlugins(shouldExtractCss);
  output = output.map(o => ({ ...o, sourcemap: true }));
  if (process.env.MODULE_WATCH) {
    output = output.filter(o => o.format === 'es' || process.env.BUILD_CJS);
  }
  const watch = {
    exclude: ['node_modules/**'],
    clearScreen: false,
  };

  let addPartToFilename = (fileName, fileNamePart) => {
    const anchor = fileName.indexOf('.');
    fileName = `${fileName.slice(0, anchor)}.${fileNamePart}${fileName.slice(anchor)}`;
    return fileName;
  };

  const editorEntry = {
    input: 'src/index.js',
    output: cloneDeep(output),
    plugins,
    external,
    watch,
  };

  const libEntries = [];
  try {
    let libEntriesPath = 'src/lib/';

    fs.readdirSync(`./${libEntriesPath}`).forEach(file => {
      libEntries.push({
        input: libEntriesPath + file,
        output: cloneDeep(output).map(o => ({
          ...o,
          file: o.file.replace('dist/', 'dist/lib/').replace('module', file.replace('.js', '')),
        })),
        plugins,
        external,
        watch,
      });
    });
  } catch (_) {}

  let viewerEntry;
  try {
    let viewerPath = 'src/viewer.js';
    fs.accessSync(`./${viewerPath}`);
    viewerEntry = {
      input: viewerPath,
      output: cloneDeep(output).map(o => {
        const anchor = o.file.indexOf('.');
        o.file = addPartToFilename(o.file, 'viewer');
        return o;
      }),
      plugins,
      external,
      watch,
    };
  } catch (_) {}

  return [editorEntry, viewerEntry, ...libEntries].filter(x => x);
};
