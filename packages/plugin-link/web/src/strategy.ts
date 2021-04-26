import { ContentBlock, ContentState } from 'draft-js';
import { LINK_TYPE, CUSTOM_LINK_TYPE } from './types';
export const linkEntityStrategy = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey !== null) {
      const entityType = contentState.getEntity(entityKey).getType();
      return entityType === LINK_TYPE || entityType === CUSTOM_LINK_TYPE;
    }
    return false;
  }, callback);
};
