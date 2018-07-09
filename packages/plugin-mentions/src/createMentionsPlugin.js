import { createBasePlugin, mergeStyles } from 'wix-rich-content-common';
import createMentionPlugin from 'draft-js-mention-plugin';
import decorateComponentWithProps from 'decorate-component-with-props';
import { EXTERNAL_MENTIONS_TYPE } from './types';
import MentionComponent from './MentionComponent';
import MentionSuggestionsWrapper from './MentionSuggestionsWrapper';
import Styles from './styles.scss';

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
  getMentions: (search: string) => Promise<Mention[]>
  onMentionClick: (mention: Mention) => void;
}
*/

const defaultSettings = {
  mentionPrefix: '@',
  mentionTrigger: '@',
  getMentionLink: () => '#',
};

const createExternalMentionsPlugin = (config = {}) => {
  const type = EXTERNAL_MENTIONS_TYPE;
  const {
    decorator,
    helpers,
    theme,
    isMobile,
    t,
    anchorTarget,
    relValue,
    mentions = {},
  } = config;
  const styles = mergeStyles({ styles: Styles, theme });
  const settings = Object.assign({}, defaultSettings, mentions);

  const plugin = createMentionPlugin({
    mentionComponent: decorateComponentWithProps(MentionComponent, { settings, styles }),
    theme: styles,
    mentionPrefix: settings.mentionPrefix,
    mentionTrigger: settings.mentionTrigger,
  });

  const inlineModals = [
    decorateComponentWithProps(MentionSuggestionsWrapper, {
      component: plugin.MentionSuggestions,
      settings,
      styles,
    }),
  ];

  return createBasePlugin(
    {
      decorator,
      theme,
      type,
      helpers,
      isMobile,
      anchorTarget,
      inlineModals,
      relValue,
      t,
    },
    plugin,
  );
};

export { createExternalMentionsPlugin };
