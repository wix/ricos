import {
  RawDraftInlineStyleRange,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftContentState,
} from 'draft-js';

type RicosInlineStyleType = string;

interface RicosInlineStyleRange extends Override<RawDraftInlineStyleRange, 'style'> {
  style: RicosInlineStyleType;
}

interface RicosContentBlock extends Override<RawDraftContentBlock, 'inlineStyleRanges'> {
  inlineStyleRanges: RicosInlineStyleRange[];
}

type RicosEntityMutability = string;

interface RicosEntity extends Override<RawDraftEntity, 'mutability'> {
  mutability: RicosEntityMutability;
}

export interface RicosContent
  extends Override<Override<RawDraftContentState, 'blocks'>, 'entityMap'> {
  blocks: RicosContentBlock[];
  entityMap: { [key: string]: RicosEntity };
  VERSION?: string;
}

type Override<T, K extends keyof T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: P extends K ? any : T[P];
};
