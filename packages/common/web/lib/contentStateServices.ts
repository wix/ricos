import { truncateContent } from 'ricos-content/libs/truncateContent';
import { RicosContent } from 'ricos-content';

export const truncateContentState = (
  contentState: RicosContent,
  index: number,
  opts: { wordsCount?: number; maxPlugins?: number } = {}
) => {
  const { content } = truncateContent(contentState, index, opts);
  return content;
};
