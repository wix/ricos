import { mergeStyles } from 'wix-rich-content-common';
import { DEFAULT_SETTINGS } from './defaultSettings';
import { EXTERNAL_MENTIONS_TYPE } from './types';
import { createTypeMapperFactory } from './typeMapper';
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
  getMentions: (search: string) => Promise<Mention[]>
  onMentionClick: (mention: Mention) => void;
  repositionSuggestions: boolean, // when you are in iframe and want suggestions to be repositioned if they go out of iframe
  entryHeight: number, // suggestion entry height
  additionalHeight: number, // extra spacing in suggestion popup
}
*/

const createExternalMentionsViewerPlugin = (config = {}) => {
  const { theme, [EXTERNAL_MENTIONS_TYPE]: mentionSettings = {} } = config;
  const styles = mergeStyles({ styles: Styles, theme });
  const settings = Object.assign({}, DEFAULT_SETTINGS, mentionSettings);

  return {
    typeMapper: createTypeMapperFactory({ settings, theme: styles })
  };
};

export { EXTERNAL_MENTIONS_TYPE, createExternalMentionsViewerPlugin };
