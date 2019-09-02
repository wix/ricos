const babel = require('babel-core');

const wallabify = require('wallabify');
const wallabyPostprocessor = wallabify(
  {
    // browserify options, such as
    // insertGlobals: false
  }
  // you may also pass an initializer function to chain other
  // browserify options, such as transformers
  // , b => b.exclude('mkdirp').transform(require('babelify'))
);

module.exports = function(wallaby) {
  return {
    files: [{ pattern: 'src/**/*.*' }],
    tests: [{ pattern: 'test/**/*.spec.{js,jsx}' }],
    compilers: {
      '**/*.{js,jsx}': wallaby.compilers.babel({
        presets: ['es2015', 'react', 'stage-2'],
        plugins: ['transform-class-properties', 'transform-runtime'],
        babel,
        // babel options
        // like `stage: n` for Babel 5.x or `presets: [...]` for Babel 6
        // (no need to duplicate .babelrc, if you have it, it'll be automatically loaded)
      }),
    },
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
    postprocessor: wallabyPostprocessor,

    setup() {
      // required to trigger tests loading
      //   window.__moduleBundler.loadTests();
    },
  };
};
