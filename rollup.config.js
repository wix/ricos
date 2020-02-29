/* eslint-disable */

import fs from 'fs';
import { cloneDeep } from 'lodash';
import plugins from './rollup.plugins';
import { isExternal as external } from './rollup.externals';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

let output = [
  {
    file: 'dist/module.js',
    format: 'es',
    sourcemap: true,
  },
  {
    file: 'dist/module.cjs.js',
    format: 'cjs',
    sourcemap: true,
  },
];

if (process.env.MODULE_WATCH) {
  output = output.filter(o => o.format === 'es');
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

let libEntries;
try {
  let libEntriesPath = 'src/lib/';
  fs.readdirSync(`./${libEntriesPath}`).forEach(file => {
    libEntries = {
      input: libEntriesPath + file,
      output: cloneDeep(output).map(o => ({
        ...o,
        file: o.file.replace('dist/', 'dist/lib/').replace('module', file.replace('.js', '')),
      })),
      plugins,
      external,
      watch,
    };
  });
} catch (_) { }

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
} catch (_) { }

let config = [editorEntry];

if (viewerEntry) {
  config.push(viewerEntry);
}
if (libEntries) {
  config.push(libEntries);
}

export default config;
