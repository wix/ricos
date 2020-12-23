import { Overwrite } from 'utility-types';
import {
  RawDraftInlineStyleRange,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftContentState,
  RawDraftEntityRange,
} from 'draft-js';

export type RicosInlineStyleRange = Overwrite<RawDraftInlineStyleRange, { style: string }>;

export type RicosEntityRange = Overwrite<RawDraftEntityRange, { key: string | number }>;

export type RicosContentBlock = Overwrite<
  RawDraftContentBlock,
  { inlineStyleRanges: RicosInlineStyleRange[]; entityRanges: RicosEntityRange[] }
>;

export type RicosEntity = Overwrite<RawDraftEntity, { mutability: string }>;

export type RicosEntityMap = { [key: string]: RicosEntity };

export type RicosContent = Overwrite<
  RawDraftContentState,
  {
    blocks: RicosContentBlock[];
    entityMap: RicosEntityMap;
    VERSION?: string;
  }
>;
