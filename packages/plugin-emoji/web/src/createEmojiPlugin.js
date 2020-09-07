import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import createToolbar from './toolbar';
import { EMOJI_TYPE } from './constants';
import { createEmojiDecorator } from './createEmojiDecorator';

const createEmojiPlugin = (config = {}) => {
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
      ...rest,
    },
    { decorators: createEmojiDecorator() }
  );
};

export { createEmojiPlugin, EMOJI_TYPE };
