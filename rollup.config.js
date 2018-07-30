import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import { terser as uglify } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';

const NAME = 'WixRichContent' + (process.env.MODULE_NAME ?
  process.env.MODULE_NAME.replace(/^\w/, c => c.toUpperCase()) :
  'Module');

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
    preferBuiltins: false,
  }),
  commonjs(),
  globals(),
  builtins(),
  json({
    include: 'dist/**',
  }),
  postcss({
    minimize: true,
    modules: true,
    extract: 'dist/styles.css',
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
        file: `dist/${process.env.MODULE_NAME}.min.js`,
        globals: BUNDLE_GLOBALS,
      },
      {
        name: NAME,
        format: 'umd',
        file: `dist/bundle.umd.js`,
        globals: BUNDLE_GLOBALS,
      },
    ],
    plugins,
    external: id => !!externals.find(externalName => new RegExp(externalName).test(id)),
  },
];
