import { Overwrite } from 'utility-types';
import {
  RawDraftInlineStyleRange,
  RawDraftContentBlock,
  RawDraftEntity,
  RawDraftContentState,
  RawDraftEntityRange,
} from 'draft-js';
import { RichContent } from 'ricos-schema';

export type RicosInlineStyleRange = Overwrite<RawDraftInlineStyleRange, { style: string }>;

export type RicosEntityRange = Overwrite<RawDraftEntityRange, { key: string | number }>;

export type RicosContentBlock = Overwrite<
  RawDraftContentBlock,
  { inlineStyleRanges: RicosInlineStyleRange[]; entityRanges: RicosEntityRange[] }
>;

export type RicosEntity = Overwrite<RawDraftEntity, { mutability: string }>;

export type RicosEntityMap = { [key: string]: RicosEntity };

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

export type DraftContent = RicosContent;

export interface PlainTextConvertor {
  toPlainText(content?: RichContent): Promise<string>;
}

export interface RicosContentConvertor {
  toRicos(content?: DraftContent): Promise<RichContent>;
}

export interface DraftContentConvertor {
  toDraft(content?: RichContent): Promise<DraftContent>;
}

export type Convertors = PlainTextConvertor & RicosContentConvertor & DraftContentConvertor;

export type ConversionService<Source, Target> = {
  convert: (content: Source) => Promise<Target>;
  configure: (endpoint: string) => void;
};
