import {
  RichContent,
  ImageData,
  DividerData,
  Node_Type,
  ParagraphData,
  TextData,
} from 'ricos-schema';

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
    data: T;
    key: string;
    content: RichContent;
  }) => RichContent;
};

type SetTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    container,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: T;
    container?: T;
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

export const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
    [Node_Type.PARAGRAPH]: { paragraphData: data as ParagraphData },
    [Node_Type.TEXT]: { textData: data as TextData },
  }[type]);

export const nodeDataMapByType = (type: Node_Type) =>
  ({
    [Node_Type.IMAGE]: ({ imageData }) => imageData as ImageData,
    [Node_Type.DIVIDER]: ({ dividerData }) => dividerData as DividerData,
    [Node_Type.PARAGRAPH]: ({ paragraphData }) => paragraphData as ParagraphData,
  }[type]);
