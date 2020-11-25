import addMention from 'draft-js-mention-plugin/lib/modifiers/addMention';
import { RicosContent } from 'wix-rich-content-common';

export const addMentionToEditorState = (...args) => addMention(...args);

// Naming is wrong, this should have been getMentionsFromContent
export const getMentionsFromEditorState = (content: RicosContent) => {
  if (!content || !content.entityMap) {
    return [];
  }

  return Object.values(content.entityMap)
    .filter(entity => entity.type === 'mention')
    .map(entity => entity.data.mention);
};
