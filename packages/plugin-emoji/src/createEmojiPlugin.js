import { createBasePlugin, mergeStyles } from 'wix-rich-content-common';
import createToolbar from './toolbar';
import { EMOJI_TYPE } from './constants';
import EmojiDecorator from './emojiDecorator';
import Styles from '../statics/styles/default-styles.scss';

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

  const styles = mergeStyles({ styles: Styles, theme });
  const toolbar = createToolbar({
    helpers,
    styles,
    settings,
    isMobile,
    getEditorState,
    setEditorState,
    theme,
    t,
  });
  const emojiProps = Object.assign({}, settings, { theme, displayName: 'Emoji' });
  const decorators = [new EmojiDecorator(emojiProps)];
  return createBasePlugin({
    settings,
    theme,
    type,
    toolbar,
    helpers,
    t,
    ...rest,
  });
};

export { createEmojiPlugin, EMOJI_TYPE };
