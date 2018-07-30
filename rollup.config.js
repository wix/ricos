/* eslint-disable */

import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import { terser as uglify } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import pascalCase from 'pascal-case';

if (!process.env.MODULE_NAME) {
  console.error(`Environment variable "MODULE_NAME" is missing!`);

  process.exit(1);
}

const NAME = `WixRichContent${pascalCase(process.env.MODULE_NAME)}`;

console.log(`Building module: ${NAME}`);

const externals = [
  '@babel/runtime',
  '@wix/draft-js',
  'assert',
  'core-js',
  'classnames',
  'draft-js',
  'lodash',
  'prop-types',
  'react',
  'react-dom',
  'wix-rich-content-common',
];

const plugins = [
  progress(),
  resolve({
    preferBuiltins: true,
  }),
  commonjs({
    namedExports: {
      'node_modules/image-client-api/dist/imageClientSDK.js': ['getScaleToFillImageURL'],
      '../../node_modules/image-client-api/dist/imageClientSDK.js': ['getScaleToFillImageURL'],
    },
  }),
  builtins(),
  json({
    include: 'dist/**',
  }),
  postcss({
    minimize: true,
    modules: true,
    extract: 'dist/styles.min.css',
    inject: false,
  }),
  uglify(),
];

if (process.env.ANALYZE_BUNDLE) {
  plugins.push(
    visualizer({
      sourcemaps: true,
    }),
  );
}

const BUNDLE_GLOBALS = {
  '@wix/draft-js': 'Draft',
  assert: 'assert',
  'core-js': 'core-js',
  classnames: 'classNames',
  lodash: '_',
  'prop-types': 'PropTypes',
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default [
  {
    input: 'dist/es/index.js',
    output: [
      {
        name: NAME,
        format: 'iife',
        file: `dist/index.min.js`,
        globals: BUNDLE_GLOBALS,
      },
      {
        file: 'dist/index.module.js',
        format: 'es'
      }
    ],
    plugins,
    external: id => !!externals.find(externalName => new RegExp(externalName).test(id)),
  },
];
