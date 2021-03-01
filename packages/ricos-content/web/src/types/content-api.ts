import { ImageData, DividerData, Node } from 'ricos-schema';

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
