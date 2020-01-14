/* eslint-disable */

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from '@rollup/plugin-url';
import replace from 'rollup-plugin-replace'
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
      globals: {
        lodash: 'lodash' 
      },
    }
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
    
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
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
    commonjs({        
          namedExports: {
      'node_modules/lodash/lodash.js': [
          'unionBy',
          'union',
          'reduce',
          'find',
          'forEach',
          'includes',
          'isEqual',
          'endsWith',
          'isFunction',
          'isArray',
          'isEmpty'
      ],
      'node_modules/react/index.js': [
        'PureComponent',
        'Component'
      ],
      'node_modules/react-dom/server.js': [
        'renderToStaticMarkup'
      ],
  }}
  ),
    terser(),
  ],
};
