import { version } from '../../package.json';
import { DraftContent } from '../types';
type BlockType =
  | 'unstyled'
  | 'blockquote'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six';

export const createContent = (text: string, type: BlockType = 'unstyled'): DraftContent => {
  return {
    blocks: [
      {
        key: 'd79aa',
        text,
        type,
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
    VERSION: version,
  };
};
