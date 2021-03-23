import { isString } from 'lodash';
import {
  RichContent,
  ImageData,
  DividerData,
  ParagraphData,
  TextData,
  Node_Type,
  Node,
} from 'ricos-schema';
import { addNode, toTextDataArray, removeNode, setNode, updateNode } from './builder-utils';
import { ContentBuilder, dataByNodeType } from '../types';

type AddMethodParams<TData> = {
  data: TData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
};

type AddTextMethodParams<T> = AddMethodParams<T> & {
  text: string | TextData | (string | TextData)[];
};

class RicosContentBuilder {
  generateKey: () => string;

  constructor(generateKey: () => string) {
    this.generateKey = generateKey;
  }

  createNode(type: Node_Type, data: unknown): Node {
    return { key: this.generateKey(), type, ...dataByNodeType(type, data) };
  }

  createTextNode(type: Node_Type, text: TextData[], data: unknown): Node {
    return {
      ...this.createNode(type, data),
      nodes: text.map(textData => ({
        key: this.generateKey(),
        type: Node_Type.TEXT,
        ...dataByNodeType(Node_Type.TEXT, textData),
      })),
    };
  }

  addNode({
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
    const node = this.createNode(type, data);
    return addNode({ node, index, before, after, content });
  }

  addTextNode({
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
    const node = this.createTextNode(type, textData, data);
    return addNode({ node, index, before, after, content });
  }

  // static setNode({
  //   data,
  //   type,
  //   key,
  //   content,
  // }: {
  //   data: unknown;
  //   type: Node_Type;
  //   key: string;
  //   content: RichContent;
  // }): RichContent {}
  //
  // static setTextNode({
  //   text,
  //   data,
  //   type,
  //   key,
  //   content,
  // }: {
  //   text?: string | TextData | (string | TextData)[];
  //   data?: unknown;
  //   type: Node_Type;
  //   key: string;
  //   content: RichContent;
  // }): RichContent {}
  //
  // addImage({ data, index, before, after, content }: AddMethodParams<ImageData>): RichContent {
  //   return this.addNode({ type: Node_Type.IMAGE, data, content, index, before, after });
  // }
  //
  // addDivider({ data, index, before, after, content }: AddMethodParams<DividerData>): RichContent {
  //   return this.addNode({ type: Node_Type.DIVIDER, data, content, index, before, after });
  // }
  //
  // addParagraph({
  //   data,
  //   index,
  //   before,
  //   after,
  //   content,
  //   text,
  // }: AddTextMethodParams<ParagraphData>): RichContent {
  //   return this.addTextNode({
  //     type: Node_Type.PARAGRAPH,
  //     data,
  //     content,
  //     index,
  //     before,
  //     after,
  //     text,
  //   });
  // }

  removeNode({ key, content }: { key: string; content: RichContent }): RichContent {
    return removeNode(key, content);
  }
}

[
  { name: 'Image', type: 'IMAGE', dataT: ImageData } as const,
  { name: 'Divider', type: 'DIVIDER', dataT: DividerData } as const,
].forEach(({ name, type, dataT }) => {
  RicosContentBuilder.prototype[`add${name}`] = function({
    data,
    index,
    before,
    after,
    content,
  }: AddTextMethodParams<typeof dataT>): RichContent {
    return RicosContentBuilder.addNode({
      type: (type as unknown) as Node_Type,
      data,
      content,
      index,
      before,
      after,
    });
  };
});
