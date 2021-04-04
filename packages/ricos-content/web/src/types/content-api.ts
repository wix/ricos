import { RichContent, ImageData, DividerData, ParagraphData, TextData } from 'ricos-schema';

type AddMethod<T> = {
  [P in keyof T]: ({
    data,
    index,
    content,
  }: {
    data?: Partial<T[P]>;
    index?: number;
    content: RichContent;
  }) => RichContent;
};

type AddTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    index,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: Partial<T[P]>;
    index?: number;
    content: RichContent;
  }) => RichContent;
};

type SetMethod<T> = {
  [P in keyof T]: ({
    data,
    key,
    content,
  }: {
    data: Partial<T[P]>;
    key: string;
    content: RichContent;
  }) => RichContent;
};

type SetTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: Partial<T[P]>;
    key: string;
    content: RichContent;
  }) => RichContent;
};

type GetMethod<T> = {
  [P in keyof T]: (content: RichContent) => Record<string, T[P]>;
};

type SetMap = {
  setImage: ImageData;
  setDivider: DividerData;
  updateImage: ImageData;
  updateDivider: DividerData;
};

type SetTextMap = {
  setParagraph: ParagraphData;
  updateParagraph: ParagraphData;
};

type AddMap = {
  addImage: ImageData;
  addDivider: DividerData;
};

type AddTextMap = {
  addParagraph: ParagraphData;
};

type GetMap = {
  getImages: ImageData;
  getDividers: DividerData;
  getParagraphs: ParagraphData;
};

type ContentBuilderType = AddMethod<AddMap> &
  AddTextMethod<AddTextMap> &
  SetMethod<SetMap> &
  SetTextMethod<SetTextMap> & {
    removeNode: (key: string, content: RichContent) => RichContent;
  };

export interface ContentBuilder extends ContentBuilderType {}

export type ContentExtractor = GetMethod<GetMap>;
