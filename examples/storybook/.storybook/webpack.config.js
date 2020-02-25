const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

module.exports = ({ config }) => {
  const baseConfig = wixStorybookConfig(config);
  return {
    ...baseConfig,
    module: {
      ...baseConfig.module,
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['babel-plugin-preval'],
            },
          },
        },
        ...baseConfig.module.rules,
      ],
    },
  };
};
