/* eslint-disable */

import fs from 'fs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser as uglify } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssURL from 'postcss-url';
import pascalCase from 'pascal-case';
import cloneDeep from 'lodash/cloneDeep';
import nodeGlobalsPolyfill from 'rollup-plugin-node-globals';
import { externals, globals, excludedExternals, excludedGlobals } from './rollup.externals';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

const MODULE_NAME = pascalCase(process.env.MODULE_NAME);
const NAME = `WixRichContent${MODULE_NAME}`;

const NAMED_EXPORTS = {
  imageClientAPI: [
    'getScaleToFillImageURL',
    'getScaleToFitImageURL'
  ],
  immutable: [
    'List',
  ]
};

const plugins = [
  resolve({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  }),
  builtins(),
  babel({
    configFile: path.resolve(__dirname, '.babelrc.js'),
    include: [
      'src/**',
      'statics/icons/**',
    ],
    runtimeHelpers: true,
  }),
  commonjs({
    namedExports: {
      '../../node_modules/image-client-api/dist/imageClientSDK.js': [...NAMED_EXPORTS.imageClientAPI],
      'node_modules/image-client-api/dist/imageClientSDK.js': [...NAMED_EXPORTS.imageClientAPI],
      '../../node_modules/immutable/dist/immutable.js': [...NAMED_EXPORTS.immutable],
      'node_modules/immutable/dist/immutable.js': [...NAMED_EXPORTS.immutable],
    },
  }),
  json({
    include: [
      'statics/**',
      'node_modules/**',
      '../../node_modules/**',
    ],
  }),
  postcss({
    minimize: {
      reduceIdents: false
    },
    modules: true,
    extract: 'dist/styles.min.css',
    inject: false,
    plugins: [
      postcssURL({
        url: asset => asset.url.replace('../', '/statics/')
      }),
    ],
  }),
  nodeGlobalsPolyfill(),
];

if (process.env.NODE_ENV !== 'development') {
  plugins.push(
    uglify({
      mangle: false,
      sourceMap: {
        filename: 'out.js',
        url: 'out.js.map'
      }
    }),
  )
}

if (process.env.MODULE_ANALYZE) {
  plugins.push(
    visualizer({
      sourcemaps: true,
    }),
  );
}

const external = id =>
  !id.startsWith('\0') &&
  !id.startsWith('.') &&
  !id.startsWith('/') &&
  !excludedExternals.find(regex => typeof regex === 'string' ? regex === id : regex.test(id)) &&
  !!externals.find(externalName => new RegExp(externalName).test(id));

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
  {
    name: NAME,
    format: 'iife',
    file: `dist/${MODULE_NAME}.js`,
    globals: id => {
      const isExcluded = excludedGlobals.find(p => p === id);
      if (!isExcluded) {
        const globalKey = Object.keys(globals).find(externalName => externalName === id || new RegExp(externalName + '\/').test(id));
        if (globalKey) {
          return globals[globalKey];
        }
      }
      return false;
    },
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

const config = [
  editorEntry,
];

if (viewerEntry) {
  config.push(viewerEntry);
}


export default config;
