import { createBasePlugin } from 'wix-rich-content-common';
import { HASHTAG_TYPE } from './types';
import HashtagDecorator from './HashtagDecorator';

const createHashtagPlugin = (config = {}) => {
  const type = HASHTAG_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;

  const hashtagTheme = {
    hashtag: theme && theme.hashtag,
    hashtag_hover: theme && theme.hashtag_hover, //eslint-disable-line camelcase
  };
  const hashtagProps = Object.assign({}, settings, { theme: hashtagTheme });

  const decorators = [new HashtagDecorator(hashtagProps)];

  return createBasePlugin(
    {
      theme,
      type,
      settings,
      ...rest,
    },
    { decorators }
  );
};

export { createHashtagPlugin };
