import { emojiComponent } from './emojiComponent';
import { DraftDecorator, ContentBlock, ContentState } from 'draft-js';

const createEmojiDecorator = (): DraftDecorator[] => {
  return [{ strategy: emojiEditorStrategy, component: emojiComponent }];
};

const emojiEditorStrategy = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  const EMOJI_TYPE = 'EMOJI_TYPE';
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === EMOJI_TYPE;
  }, callback);
};

export { createEmojiDecorator };
