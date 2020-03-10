import { createBasePlugin } from 'wix-rich-content-editor-common';
import createToolbar from './toolbar';
import { EMOJI_TYPE } from './constants';
import { emojiEntityStrategy } from './emojiStrategy';
import { emojiComponent } from './emojiComponent';

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

  const decorators = [{ strategy: emojiEntityStrategy, component: emojiComponent }];
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
    { decorators }
  );
};

export { createEmojiPlugin, EMOJI_TYPE };
