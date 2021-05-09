import { Overwrite } from 'utility-types';
import { isArray, isObject } from 'lodash';
import { RichContent } from 'ricos-schema';
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

// Kept for backwards compatibility, use DraftContent instead
export interface RicosContent
  extends Overwrite<
    RawDraftContentState,
    {
      blocks: RicosContentBlock[];
      entityMap: RicosEntityMap;
    }
  > {
  VERSION?: string;
}

export interface DraftContent extends RicosContent {}

export function isDraftContent(content): content is DraftContent {
  return isArray(content.blocks) && isObject(content.entityMap);
}

export function isRichContent(content): content is RichContent {
  return isArray(content.nodes);
}
