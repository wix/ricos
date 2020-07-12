import {
  RawDraftInlineStyleRange,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftContentState,
  RawDraftEntityRange,
} from 'draft-js';

export interface RicosInlineStyleRange extends Override<RawDraftInlineStyleRange, 'style'> {
  style: string;
}

export interface RicosEntityRange extends Override<RawDraftEntityRange, 'key'> {
  key: string | number;
}

export interface RicosContentBlock
  extends Override<Override<RawDraftContentBlock, 'inlineStyleRanges'>, 'entityRanges'> {
  inlineStyleRanges: RicosInlineStyleRange[];
  entityRanges: RicosEntityRange[];
}

export interface RicosEntity extends Override<RawDraftEntity, 'mutability'> {
  mutability: string;
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
