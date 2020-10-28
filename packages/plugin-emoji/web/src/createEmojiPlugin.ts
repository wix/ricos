import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import createToolbar from './toolbar/createToolbar';
import { EMOJI_TYPE, DEFAULT_CONFIG } from './constants';
import { createEmojiDecorator } from './createEmojiDecorator';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createEmojiPlugin: CreatePluginFunction = config => {
  const type = EMOJI_TYPE;
  const {
    helpers,
    theme,
    t,
    isMobile,
    [type]: settings = {},
    getEditorState,
    setEditorState,
    ...rest
  } = config;

  const toolbar = createToolbar({
    helpers,
    settings,
    isMobile,
    getEditorState,
    setEditorState,
    theme,
    t,
  });

  return createBasePlugin(
    {
      settings,
      theme,
      type,
      toolbar,
      helpers,
      t,
      defaultPluginData: DEFAULT_CONFIG,
      isMobile,
      setEditorState,
      getEditorState,
      ...rest,
    },
    { decorators: createEmojiDecorator() }
  );
};

export { createEmojiPlugin, EMOJI_TYPE };
