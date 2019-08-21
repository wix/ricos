const presetEnvESM = [
  '@babel/preset-env',
  {
    modules: false,
    loose: true,
  },
];

const presetEnvCommonJS = [
  '@babel/preset-env',
  {
    loose: true,
  },
];

const commonPresets = ['@babel/preset-react'];

const commonPlugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-transform-runtime',
  '@babel/plugin-syntax-dynamic-import',
];

const testPlugins = ['@babel/plugin-transform-modules-commonjs'];

module.exports = {
  babelrcRoots: ['.', 'packages/**/*', 'examples/*'],
  presets: [presetEnvESM, ...commonPresets],
  plugins: [...commonPlugins],
  env: {
    commonjs: {
      presets: [presetEnvCommonJS, ...commonPresets],
      plugins: [...commonPlugins],
    },
    test: {
      presets: [presetEnvCommonJS, ...commonPresets],
      plugins: [...testPlugins],
    },
  },
};
