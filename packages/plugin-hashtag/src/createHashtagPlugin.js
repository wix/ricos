import { createBasePlugin, decorateComponentWithProps } from 'wix-rich-content-common';
import { HASHTAG_TYPE } from './types';
import { Strategy, Component } from './decorator';

const createHashtagPlugin = (config = {}) => {
  const type = HASHTAG_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const plugin = { decorators: [] };

  const hashtagTheme = {
    hashtag: theme && theme.hashtag,
    hashtag_hover: theme && theme.hashtag_hover, //eslint-disable-line camelcase
  };
  const hashtagProps = Object.assign({}, settings, { theme: hashtagTheme });

  plugin.decorators.push({
    strategy: Strategy,
    component: decorateComponentWithProps(Component, hashtagProps),
  });

  return createBasePlugin(
    {
      theme,
      type,
      settings,
      ...rest,
    },
    plugin
  );
};

export { createHashtagPlugin };
