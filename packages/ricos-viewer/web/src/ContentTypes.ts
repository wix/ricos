type RicosInlineStyleType = string;

interface RicosInlineStyleRange
  extends Override<import('draft-js').RawDraftInlineStyleRange, 'style'> {
  style: RicosInlineStyleType;
}

interface RicosContentBlock
  extends Override<import('draft-js').RawDraftContentBlock, 'inlineStyleRanges'> {
  inlineStyleRanges: RicosInlineStyleRange[];
}

type RicosEntityMutability = string;

interface RicosEntity extends Override<import('draft-js').RawDraftEntity, 'mutability'> {
  mutability: RicosEntityMutability;
}

interface RicosContent
  extends Override<Override<import('draft-js').RawDraftContentState, 'blocks'>, 'entityMap'> {
  blocks: RicosContentBlock[];
  entityMap: { [key: string]: RicosEntity };
  VERSION?: string;
}

type Override<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};
