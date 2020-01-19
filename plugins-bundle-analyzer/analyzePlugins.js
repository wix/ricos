/* eslint-disable no-console */

const chalk = require('chalk');
const { getPackages } = require('@lerna/project');
const webpack = require('webpack');

process.on('unhandledRejection', error => {
  throw error;
});

const rules = [
  {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      },
    },
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          insertAt: 'top',
        },
      },
      'css-loader',
    ],
  },
  {
    test: /\.scss$/,
    exclude: /styles\.global\.scss/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]_[local]',
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
];

function analyzePlugin() {
  console.log(chalk.magenta('Analyzing plugins'));
  // console.log('analyzing plugins');

  getPackages().then(allPackages => {
    const promiseArr = allPackages
      .filter(pkg => !pkg.private)
      .filter(pkg => pkg.name.indexOf('wix-rich-content-plugin') === 0)
      .map(pkg => {
        return new Promise(resolve => {
          webpack(
            {
              entry: `./src/${pkg.name}.js`,
              mode: 'production',

              module: {
                rules,
              },
            },
            (err, stats) => {
              // Stats Object
              if (err || stats.hasErrors()) {
                const _err = err || stats.compilation.errors[0];
                console.error(chalk.red(_err));
                resolve({ name: pkg.name, error: true });
              } else {
                console.log(chalk.green(pkg.name, `analyzed`));
                console.log(stats.toString({ colors: true }));
                resolve({
                  name: pkg.name,
                  size: Math.ceil(stats.toJson(true).assets[0].size / 1024),
                });
              }
            }
          );
          // console.log(chalk.yellow(`Pkg`, JSON.stringify(getPackageDetails(pkg))));
        });
      });

    Promise.all(promiseArr).then(res => {
      console.log({ res });
    });
  });
}

function run() {
  analyzePlugin();
}

run();

/*
 
     
  */
