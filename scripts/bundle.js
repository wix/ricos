/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const get = require('lodash/get');
const chalk = require('chalk');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sass = require('rollup-plugin-sass');
const uglify = require('rollup-plugin-terser').terser;
const progress = require('rollup-plugin-progress');
const visualizer = require('rollup-plugin-visualizer');

const lernaJsonPath = path.resolve('./lerna.json');
const lernaConfig = require(lernaJsonPath);

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
];

const globals = {
  '@wix/draft-js': 'Draft',
  assert: 'assert',
  'core-js': 'core-js',
  classnames: 'classnames',
  lodash: '_',
  'prop-types': 'PropTypes',
  react: 'React',
  'react-dom': 'ReactDOM',
};

const plugins = [
  progress({
    clearLine: true // default: true
  }),
  resolve({
    preferBuiltins: false,
    customResolveOptions: {
      moduleDirectory: '../node_modules/',
    }
  }),
  commonjs({
    // ignoreGlobal: true,
  }),
  sass({
    includePaths: ['../node_modules/'],
    importer(path) {
      return { file: path[0] !== '~' ? path : path.slice(1) };
    }
  }),
  uglify(),
];

if (process.env.ANALYZE_BUNDLE) {
  plugins.push(
    visualizer({
      sourcemaps: true,
    })
  );
}

const isExternal = id => {
  let external = false;
  for (const module of externals) {
    external = new RegExp(module).test(id);
    if (external) {
      break;
    }
  }
  return external;
};


async function bundle() {
  for (const pacakagesGlob of lernaConfig.packages) {
    const pacakgesPaths = glob.sync(pacakagesGlob);
    for (const pkgPath of pacakgesPaths) {
      const pkgJsonPath = path.resolve(pkgPath, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath));
      if (!pkg.private) {
        await bundleModule({
          name: get(pkg, 'name'),
          module: get(pkg, 'module'),
          pkgPath,
        });
      }
    }
  }
}

async function bundleModule({ name, module, pkgPath }) {
  try {
    if (name === 'wix-rich-content-editor') {
      console.log(chalk.blue(`Bundling ${name}...`));
      const bundle = await rollup.rollup({
        input: path.join(pkgPath, module),
        external: isExternal,
        plugins,
      });

      await bundle.write({
        name,
        globals,
        file: path.join(pkgPath, 'dist', `${name}.js`),
        format: 'umd',
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
  }
}


bundle();
