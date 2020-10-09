import { RicosContent } from '../types';

export const isContentStateEmpty = (contentState: RicosContent): boolean => {
  const { blocks } = contentState;
  if (blocks.length !== 1) {
    return true;
  }
  const firstBlock = blocks[0];
  const { text, type } = firstBlock;
  return text === '' && type === 'unstyled';
};
