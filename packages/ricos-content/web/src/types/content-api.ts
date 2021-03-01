import { ImageData, DividerData, Node_Type } from 'ricos-schema';

type AddMethod<T> = {
  [P in keyof T]: (data: Partial<T[P]>) => void;
};

type Getter<T> = {
  [P in keyof T]: () => T[P][];
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
