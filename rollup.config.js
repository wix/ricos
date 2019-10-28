/* eslint-disable */

import fs from 'fs';
import path from 'path';
import pascalCase from 'pascal-case';
import { cloneDeep } from 'lodash';
import plugins from './rollup.plugins';
import { isExternal as external } from './rollup.externals';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

const MODULE_NAME = pascalCase(process.env.MODULE_NAME);
const NAME = `WixRichContent${MODULE_NAME}`;
const IS_DEV_ENV = process.env.NODE_ENV === 'development';

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

const editorEntry = {
  input: 'src/index.js',
  output: cloneDeep(output),
  plugins,
  external,
  watch,
};

let libEntries;
try {
  fs.readdirSync('./src/lib/').forEach(file => {
    libEntries = {
      input: 'src/lib/' + file,
      output: output.map(o =>
        Object.assign(o, {
          file: o.file.replace('dist/', 'dist/lib/').replace('module', file.replace('.js', '')),
        })
      ),
      plugins,
      external,
      watch,
    };
  });
} catch (_) {}

let viewerEntry;
try {
  fs.accessSync('./src/viewer.js');
  viewerEntry = {
    input: 'src/viewer.js',
    output: cloneDeep(output).map(o => {
      const anchor = o.file.indexOf('.');
      o.file = `${o.file.slice(0, anchor)}.viewer${o.file.slice(anchor)}`;
      return o;
    }),
    plugins,
    external,
    watch,
  };
} catch (_) {}

const config = [editorEntry];

if (viewerEntry) {
  config.push(viewerEntry);
}
if (libEntries) {
  config.push(libEntries);
}

export default config;
