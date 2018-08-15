/* eslint-disable */

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
    externalHelpers: true,
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
    include: 'statics/**',
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

  uglify({
    mangle: false,
    sourceMap: {
      filename: "out.js",
      url: "out.js.map"
    }
  }),
];

if (process.env.MODULE_ANALYZE) {
  plugins.push(
    visualizer({
      sourcemaps: true,
    }),
  );
}

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/module.js',
      format: 'es',
      sourcemap: true,
    },
    {
      name: NAME,
      format: 'iife',
      file: `dist/${MODULE_NAME}.js`,
      globals: id => {
        const isExcluded = excludedGlobals.find(p => p === id);

        if (!isExcluded) {
          const globalKey = Object.keys(globals).find(externalName => new RegExp(externalName).test(id));

          if (globalKey) {
            return globals[globalKey];
          }
        }


        return false;
      },
      sourcemap: true,
    },
    {
      file: 'dist/module.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins,
  external: id => !excludedExternals.find(regex => typeof regex === 'string' ? regex === id : regex.test(id)) && !!externals.find(externalName => new RegExp(externalName).test(id)),
};

if (process.env.MODULE_WATCH) {
  config.output = config.output.filter(o => o.format === 'es');
  config.watch = {
    exclude: ['node_modules/**'],
    clearScreen: false,
  };
}

export default config;
