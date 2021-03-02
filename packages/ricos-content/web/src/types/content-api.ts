import { RichContent, ImageData, DividerData, Node_Type } from 'ricos-schema';

type AddMethod<T> = {
  [P in keyof T]: (data: Partial<T[P]>, content?: RichContent) => RichContent;
};

type Getter<T> = {
  [P in keyof T]: (content: RichContent) => T[P][];
};

type AddPluginDataMap = {
  addImage: ImageData;
  addDivider: DividerData;
};

type GetPluginDataMap = {
  getImages: ImageData;
  getDividers: DividerData;
};

export type ContentBuilder = AddMethod<AddPluginDataMap>;
export type ContentExtractor = Getter<GetPluginDataMap>;

export const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
  }[type]);

export const nodeDataMapByType = (type: Node_Type) =>
  ({
    [Node_Type.IMAGE]: ({ imageData }) => imageData as ImageData,
    [Node_Type.DIVIDER]: ({ dividerData }) => dividerData as DividerData,
  }[type]);
