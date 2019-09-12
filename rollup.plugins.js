import path from 'path';
const svgr = require('@svgr/rollup').default;

const IS_DEV_ENV = process.env.NODE_ENV === 'development';

const resolve = () => {
  const resolve = require('rollup-plugin-node-resolve');
  return resolve({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  });
};

const builtins = () => {
  const builtins = require('rollup-plugin-node-builtins');
  return builtins();
};

const copy = () => {
  const copy = require('rollup-plugin-copy');
  const targets = [{ src: 'statics', dest: 'dist' }];
  if (process.env.MODULE_NAME === 'plugin-gallery') {
    targets.push({
      src: '../../../node_modules/pro-gallery/dist/statics/media',
      dest: 'dist',
    });
  }

  return copy({
    targets,
    copyOnce: true,
  });
};

const babel = () => {
  const babel = require('rollup-plugin-babel');
  return babel({
    configFile: path.resolve(__dirname, 'babel.config.js'),
    include: ['src/**'],
    runtimeHelpers: true,
  });
};

const commonjs = () => {
  const commonjs = require('rollup-plugin-commonjs');
  const named = {
    imageClientAPI: ['getScaleToFillImageURL', 'getScaleToFitImageURL'],
    immutable: ['List'],
  };
  return commonjs({
    namedExports: {
      '../../../node_modules/image-client-api/dist/imageClientSDK.js': [...named.imageClientAPI],
      'node_modules/image-client-api/dist/imageClientSDK.js': [...named.imageClientAPI],
      '../../../node_modules/immutable/dist/immutable.js': [...named.immutable],
      'node_modules/immutable/dist/immutable.js': [...named.immutable],
    },
  });
};

const json = () => {
  const json = require('rollup-plugin-json');
  return json({
    include: [
      'statics/**',
      'node_modules/**',
      '../../../node_modules/**',
      '../../../packages/**/package.json',
    ],
  });
};

const postcss = () => {
  const postcss = require('rollup-plugin-postcss');
  const postcssExclude = require('postcss-exclude-files').default;
  const postcssURL = require('postcss-url');
  const postcssRTL = require('postcss-rtl');
  return postcss({
    minimize: {
      reduceIdents: false,
      safe: true,
    },
    modules: {
      generateScopedName: IS_DEV_ENV ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
    },
    extract: 'dist/styles.min.css',
    plugins: [
      postcssExclude({
        filter: '**/*.rtlignore.scss',
        plugins: [postcssRTL()],
      }),
      postcssURL({
        url: asset => asset.url.replace('../', '/statics/'),
      }),
    ],
  });
};

const nodeGlobalsPolyfill = () => {
  const nodeGlobalsPolyfill = require('rollup-plugin-node-globals');
  return nodeGlobalsPolyfill();
};

const replace = () => {
  const replacePlugin = require('rollup-plugin-replace');
  return replacePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });
};

const uglify = () => {
  const uglifyPlugin = require('rollup-plugin-terser').terser;
  return uglifyPlugin({
    mangle: false,
    sourcemap: {
      filename: 'out.js',
      url: 'out.js.map',
    },
  });
};

const visualizer = () => {
  const visualizer = require('rollup-plugin-visualizer');
  return visualizer({
    sourcemaps: true,
  });
};

let plugins = [
  svgr(),
  resolve(),
  builtins(),
  copy(),
  babel(),
  commonjs(),
  json(),
  postcss(),
  nodeGlobalsPolyfill(),
];

if (!IS_DEV_ENV) {
  plugins = [...plugins, replace(), uglify()];
}

if (process.env.MODULE_ANALYZE) {
  plugins = [...plugins, visualizer()];
}

export default plugins;
