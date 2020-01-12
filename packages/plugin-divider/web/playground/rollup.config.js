/* eslint-disable */

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

export default {
  input: 'playground/viewer.js',
  output: [
    {
      file: 'playground/dist/index.js',
      format: 'iife',
      sourcemap: true,
    },
    {
      file: 'playground/dist/index.module.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
    }),
    url(),
    svgr(),
    resolve(),
    external({
      includeDependencies: true,
    }),
    babel({
      presets: ['react-app'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
  ],
};
