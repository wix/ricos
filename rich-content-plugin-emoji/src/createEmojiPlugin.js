import React from 'react';
import { createBasePlugin, SimpleInsertPluginButton } from 'wix-rich-content-common';
import { EXTERNAL_EMOJI_TYPE } from './types';
import createEmojiPlugin from '@wix/draft-js-emoji-plugin';
// import 'draft-js-emoji-plugin/lib/plugin.css';
import Smile from './smile.svg';
import * as Styles from './styles.scss';

const createExternalEmojiPlugin = (config = {}) => {
  const { decorator, helpers, theme, isMobile, t, anchorTarget, relValue, tooltipTextKey } = config;
  const buttonStyles = {
    buttonWrapper: theme.footerToolbarButton_wrapper,
    icon: theme.footerToolbarButton_icon,
  };

  const InsertButton = ({ ...props }) => (<SimpleInsertPluginButton name="Emoji" theme={{ buttonStyles }} Icon={Smile} {...props} />);
  const plugin = createEmojiPlugin({ theme: Styles, selectButton: InsertButton, useNativeArt: false });
  const type = EXTERNAL_EMOJI_TYPE;

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

export { createExternalEmojiPlugin };
