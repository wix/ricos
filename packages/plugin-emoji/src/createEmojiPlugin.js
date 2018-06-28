import React from 'react';
import { createBasePlugin } from 'wix-rich-content-common';
import { EXTERNAL_EMOJI_TYPE } from './types';
import createEmojiPlugin from 'draft-js-emoji-plugin';
// import 'draft-js-emoji-plugin/lib/plugin.css';
import * as Styles from './styles.scss';
import { InsertPluginIcon } from './icons';

const createExternalEmojiPlugin = (config = {}) => {
  const plugin = createEmojiPlugin({ theme: Styles, useNativeArt: false, selectButtonContent: <InsertPluginIcon/>, toneSelectOpenDelay: 250 });
  const type = EXTERNAL_EMOJI_TYPE;
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue } = config;

  const InsertToolbarButton = plugin.EmojiSelect;
  let toolbar;
  if (InsertToolbarButton && !isMobile) {
    toolbar = {
      InsertButtons: [
        {
          name: 'Emoji',
          tooltipText: 'Hello world!',
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

export { createExternalEmojiPlugin };
