const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');


module.exports = ({config}) => {


  // return wixStorybookConfig(config); //what's wrong here?
  // hashtag works  "stories-hashtag-theme__hashtag__1MaGy"
  // console.log('config rules', JSON.stringify(config.module.rules))

  return config;


};
