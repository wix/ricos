import createToolbar from './toolbar';
import { createBasePlugin, mergeStyles } from 'wix-rich-content-common';

import { EMOJI_TYPE } from './constants';

import Styles from '../statics/styles/default-styles.scss';
import EmojiComponent from './components/emoji-component';

const createEmojiPlugin = (config = {}) => {
  const type = EMOJI_TYPE;
  const { helpers, theme, t, isMobile, [type]: settings = {}, ...rest } = config;

  const styles = mergeStyles({ styles: Styles, theme });

  return createBasePlugin({
    component: EmojiComponent,
    settings,
    theme,
    type: EMOJI_TYPE,
    toolbar: createToolbar({
      helpers,
      styles,
      settings,
      isMobile,
      theme,
      t,
    }),
    helpers,
    t,
    ...rest,
  });
};

export { createEmojiPlugin, EMOJI_TYPE };
