import { RicosContent } from '../types';

export const isContentStateEmpty = (contentState: RicosContent): boolean => {
  const { blocks } = contentState;
  if (blocks.length === 0) {
    return true;
  }
  if (blocks.length > 1) {
    return false;
  }
  const firstBlock = blocks[0];
  const { text, type, depth } = firstBlock;
  return text === '' && type === 'unstyled' && depth === 0;
};
