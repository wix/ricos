import { truncateContent } from 'ricos-content/libs/truncateContent';
import { DraftContent } from 'ricos-content';

export const truncateContentState = (
  contentState: DraftContent,
  index: number,
  opts: { wordsCount?: number; maxPlugins?: number } = {}
) => {
  const { content } = truncateContent(contentState, { ...opts, blocksCount: index });
  return content;
};
