import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { getLinkRangesInBlock } from 'wix-rich-content-editor-common';
import { HASHTAG_TYPE, HashtagPluginEditorConfig } from './types';
import createHashtagDecorator from './HashtagDecorator';
import { List } from 'immutable';
import { CreatePluginFunction } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createHashtagPlugin: CreatePluginFunction<HashtagPluginEditorConfig> = config => {
  const type = HASHTAG_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;

  const hashtagTheme = {
    hashtag: theme && theme.hashtag,
    hashtag_hover: theme && theme.hashtag_hover, //eslint-disable-line camelcase
  };
  const hashtagProps = { ...settings, theme: hashtagTheme };

  const HashtagDecorator = createHashtagDecorator(getLinkRangesInBlock, List);

  const decorators = [new HashtagDecorator(hashtagProps)];

  return createBasePlugin(
    {
      theme,
      type,
      settings,
      decoratorTrigger: '#',
      defaultPluginData: DEFAULTS,
      ...rest,
    },
    { decorators }
  );
};

export { createHashtagPlugin };
