const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ config }) => {
  const baseConfig = wixStorybookConfig(config);
  console.log('***', baseConfig.plugins, Object.keys(baseConfig));
  return {
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      new CopyWebpackPlugin([
        {
          from: 'node_modules/wix-rich-content-plugin-html/dist/statics/',
          to: 'static/',
        },
      ]),
    ],
  };
};
