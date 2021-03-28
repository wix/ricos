import {
  RichContent,
  ImageData,
  DividerData,
  ParagraphData,
  TextData,
  Node_Type,
  Node,
} from 'ricos-schema';
import {
  addNode as add,
  toTextDataArray,
  removeNode,
  setNode as set,
  updateNode as update,
} from './builder-utils';
import { ContentBuilder as BaseContentBuilder } from '../types';

const dataByNodeType = (type: Node_Type, data: unknown) =>
  ({
    [Node_Type.IMAGE]: { imageData: data as ImageData },
    [Node_Type.DIVIDER]: { dividerData: data as DividerData },
    [Node_Type.PARAGRAPH]: { paragraphData: data as ParagraphData },
    [Node_Type.TEXT]: { textData: data as TextData },
  }[type]);

type AddMethodParams<TData> = {
  data: TData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
};

type AddTextMethodParams<T> = AddMethodParams<T> & {
  text?: string | TextData | (string | TextData)[];
};

type SetMethodParams<TData> = {
  data: TData;
  key: string;
  content: RichContent;
};

type SetTextMethodParams<T> = SetMethodParams<T> & {
  text?: string | TextData | (string | TextData)[];
};

export interface ContentBuilder extends BaseContentBuilder {
  new (): BaseContentBuilder;
}

export const setupContentBuilder = (
  generateKey: () => string
): BaseContentBuilder & { RicosContentBuilder: ContentBuilder } => {
  function createNode(type: Node_Type, data: unknown): Node {
    return { key: generateKey(), type, ...dataByNodeType(type, data), nodes: [] };
  }

  function createTextNode(type: Node_Type, text: TextData[], data: unknown): Node {
    return {
      ...createNode(type, data),
      nodes: text.map(textData => ({
        nodes: [],
        key: generateKey(),
        type: Node_Type.TEXT,
        ...dataByNodeType(Node_Type.TEXT, textData),
      })),
    };
  }

  function addNode({
    data,
    type,
    index,
    before,
    after,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return add({ node, index, before, after, content });
  }

  function addTextNode({
    text,
    data,
    type,
    index,
    before,
    after,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data: unknown;
    type: Node_Type;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return add({ node, index, before, after, content });
  }

  function setNode({
    data,
    type,
    key,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return set({ node, key, content });
  }

  function setTextNode({
    text,
    data,
    type,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return set({ node, key, content });
  }

  function updateNode({
    data,
    type,
    key,
    content,
  }: {
    data: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const node = createNode(type, data);
    return update({ node, key, content });
  }

  function updateTextNode({
    text,
    data,
    type,
    key,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: unknown;
    type: Node_Type;
    key: string;
    content: RichContent;
  }): RichContent {
    const textData = toTextDataArray(text);
    const node = createTextNode(type, textData, data);
    return update({ node, key, content });
  }

  class RicosContentBuilder {
    removeNode!: (key: string, content: RichContent) => RichContent;
  }

  const builderApis = {};

  [{ name: 'Paragraph', type: Node_Type.PARAGRAPH, dataT: ParagraphData } as const].forEach(
    ({ name, type, dataT }) => {
      builderApis[`add${name}`] = RicosContentBuilder.prototype[`add${name}`] = function({
        data,
        text,
        index,
        before,
        after,
        content,
      }: AddTextMethodParams<typeof dataT>): RichContent {
        return addTextNode({
          text,
          type: (type as unknown) as Node_Type,
          data,
          content,
          index,
          before,
          after,
        });
      };

      builderApis[`update${name}`] = RicosContentBuilder.prototype[`update${name}`] = function({
        data,
        text,
        key,
        content,
      }: SetTextMethodParams<typeof dataT>) {
        return updateTextNode({
          text,
          data,
          type: (type as unknown) as Node_Type,
          key,
          content,
        });
      };

      builderApis[`set${name}`] = RicosContentBuilder.prototype[`set${name}`] = function({
        data,
        key,
        content,
      }: SetTextMethodParams<typeof dataT>) {
        return setTextNode({
          data,
          type: (type as unknown) as Node_Type,
          key,
          content,
        });
      };
    }
  );

  [
    { name: 'Image', type: Node_Type.IMAGE, dataT: ImageData } as const,
    { name: 'Divider', type: Node_Type.DIVIDER, dataT: DividerData } as const,
  ].forEach(({ name, type, dataT }) => {
    builderApis[`add${name}`] = RicosContentBuilder.prototype[`add${name}`] = function({
      data,
      index,
      before,
      after,
      content,
    }: AddMethodParams<typeof dataT>): RichContent {
      return addNode({
        type,
        data,
        content,
        index,
        before,
        after,
      });
    };

    builderApis[`update${name}`] = RicosContentBuilder.prototype[`update${name}`] = function({
      data,
      key,
      content,
    }: SetMethodParams<typeof dataT>) {
      return updateNode({ data, type, key, content });
    };

    builderApis[`set${name}`] = RicosContentBuilder.prototype[`set${name}`] = function({
      data,
      key,
      content,
    }: SetMethodParams<typeof dataT>) {
      return setNode({ data, type, key, content });
    };
  });

  RicosContentBuilder.prototype.removeNode = removeNode;

  return {
    RicosContentBuilder: (RicosContentBuilder as unknown) as ContentBuilder,
    ...(builderApis as BaseContentBuilder),
    removeNode,
  };
};
