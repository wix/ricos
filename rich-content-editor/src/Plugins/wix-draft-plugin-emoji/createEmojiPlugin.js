import createBasePlugin from '../base/basePlugin';
import { EXTERNAL_EMOJI_TYPE } from './types';
import createEmojiPlugin from 'draft-js-emoji-plugin';
// import 'draft-js-emoji-plugin/lib/plugin.css';
import * as Styles from './styles.scss';
const createExternalEmojiPlugin = (config = {}) => {
  const plugin = createEmojiPlugin({ theme: Styles, useNativeArt: false });
  const type = EXTERNAL_EMOJI_TYPE;
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue, tooltipTextKey } = config;

  const InsertToolbarButton = plugin.EmojiSelect;
  let toolbar;
  if (InsertToolbarButton) {
    toolbar = {
      InsertButtons: [
        {
          name: 'Emoji',
          tooltipText: t(tooltipTextKey),
          ButtonElement: InsertToolbarButton,
          helpers,
          t
        }
      ]
    };
  }
  const inlineModals = [
    plugin.EmojiSuggestions
  ];

  return createBasePlugin({
    decorator,
    theme,
    type,
    toolbar,
    inlineModals,
    helpers,
    isMobile,
    anchorTarget,
    relValue,
    t
  }, plugin);
};

export { createExternalEmojiPlugin, EXTERNAL_EMOJI_TYPE };
