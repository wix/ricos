import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import createMentionPlugin from 'draft-js-mention-plugin';
import { DEFAULT_SETTINGS } from './defaultSettings';
import { EXTERNAL_MENTIONS_TYPE, MENTION_TYPE } from './types';
import { positionSuggestions } from './positionSuggestions';
import MentionComponent from './MentionComponent';
import MentionSuggestionsWrapper from './MentionSuggestionsWrapper';
import Styles from '../statics/mentions.scss';

/*
Interface Mention {
  name: string;
  slug: string;
  avatar?: string;
}

Interface Settings {
  mentionPrefix?: string;
  mentionTrigger?: string;
  getMentionLink?: (mention: Mention) => string;
  visibleItemsBeforeOverflow?: number, // how many items should be visible before overflowing
  getMentions: (search: string) => Promise<Mention[]>
  onMentionClick: (mention: Mention) => void;
  repositionSuggestions: boolean, // when you are in iframe and want suggestions to be repositioned if they go out of iframe
  entryHeight: number, // suggestion entry height
  additionalHeight: number, // extra spacing in suggestion popup
}
*/

const createExternalMentionsPlugin = (config = {}) => {
  const [type, extType] = [MENTION_TYPE, EXTERNAL_MENTIONS_TYPE];
  const { theme, [type]: mSettings = {}, [extType]: mExtSettings = {}, ...rest } = config;
  const styles = mergeStyles({ styles: Styles, theme });
  const settings = { ...DEFAULT_SETTINGS, ...mSettings, ...mExtSettings };

  const plugin = createMentionPlugin({
    mentionComponent: decorateComponentWithProps(MentionComponent, { settings }),
    theme: styles,
    mentionPrefix: settings.mentionPrefix,
    mentionTrigger: settings.mentionTrigger,
    positionSuggestions: positionSuggestions({
      entryHeight: settings.entryHeight,
      additionalHeight: settings.additionalHeight,
      reposition: settings.repositionSuggestions,
      visibleItemsBeforeOverflow: settings.visibleItemsBeforeOverflow,
    }),
  });

  const inlineModals = [
    decorateComponentWithProps(MentionSuggestionsWrapper, {
      component: plugin.MentionSuggestions,
      settings,
    }),
  ];

  return createBasePlugin(
    {
      theme,
      type,
      inlineModals,
      settings,
      decoratorTrigger: '@',
      ...rest,
    },
    plugin
  );
};

export { createExternalMentionsPlugin };
