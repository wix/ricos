import React from 'react';
import { createBasePlugin, mergeStyles, TOOLBARS } from 'wix-rich-content-common';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { EXTERNAL_EMOJI_TYPE } from './types';
import SelectButton from './SelectButton';
import { getEmojiGroups } from './emojiGroups';
import * as Styles from '../statics/emoji.scss';

const createExternalEmojiPlugin = (config = {}) => {
  const type = EXTERNAL_EMOJI_TYPE;
  const { helpers, theme, isMobile, t, [type]: settings = {}, ...rest } = config;
  const styles = mergeStyles({ styles: Styles.default, theme });

  const plugin = createEmojiPlugin({
    theme: styles,
    useNativeArt: false,
    selectButtonContent: <SelectButton t={t} theme={styles} />,
    toneSelectOpenDelay: 250,
    selectGroups: getEmojiGroups(t),
  });

  const InsertToolbarButton = plugin.EmojiSelect;
  let toolbar;
  if (InsertToolbarButton && !isMobile) {
    toolbar = {
      InsertButtons: [
        {
          name: 'Emoji',
          toolbars: [TOOLBARS.FOOTER],
          ButtonElement: InsertToolbarButton,
          wrappingComponent: 'div',
          helpers,
          t,
        },
      ],
    };
  }
  const inlineModals = [plugin.EmojiSuggestions];

  return createBasePlugin(
    {
      type,
      toolbar,
      inlineModals,
      helpers,
      isMobile,
      t,
      settings,
      ...rest,
    },
    plugin
  );
};

export { createExternalEmojiPlugin };
