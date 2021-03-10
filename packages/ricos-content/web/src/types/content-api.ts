import {
  RichContent,
  ImageData,
  DividerData,
  Node_Type,
  ParagraphData,
  TextData,
  Decoration,
} from 'ricos-schema';

type AddPluginMethod<T> = {
  [P in keyof T]: (data: Partial<T[P]>, content?: RichContent) => RichContent;
};

type AddTextMethod<T> = {
  [P in keyof T]: (
    text: string | TextData,
    data: Partial<T[P]>,
    content?: RichContent
  ) => RichContent;
};

type ToggleDecorationMethod = {
  toggleDecoration: (
    key: string,
    decoratedText: string,
    decorations: Decoration[],
    content?: RichContent
  ) => RichContent;
};

type Getter<T> = {
  [P in keyof T]: (content: RichContent) => T[P][];
};

type AddPluginDataMap = {
  addImage: ImageData;
  addDivider: DividerData;
};

type AddTextDataMap = {
  addParagraph: ParagraphData;
};

type GetPluginDataMap = {
  getImages: ImageData;
  getDividers: DividerData;
  getParagraphs: ParagraphData;
};

export type ContentBuilder = AddPluginMethod<AddPluginDataMap> &
  AddTextMethod<AddTextDataMap> &
  ToggleDecorationMethod;
export type ContentExtractor = Getter<GetPluginDataMap>;

export const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
    [Node_Type.PARAGRAPH]: { paragraphData: data as ParagraphData },
  }[type]);

export const nodeDataMapByType = (type: Node_Type) =>
  ({
    [Node_Type.IMAGE]: ({ imageData }) => imageData as ImageData,
    [Node_Type.DIVIDER]: ({ dividerData }) => dividerData as DividerData,
    [Node_Type.PARAGRAPH]: ({ paragraphData }) => paragraphData as ParagraphData,
  }[type]);
